<template>
    <div class="container">
        <LayoutBreadcrumbs
            :crumbs="breadcrumbs"
        />
        <div class="content">
            <h2>Оформление заказа</h2>
            <div class="content_block">
                <div class="forms">
                    <form action="/post">
                        <div class="city_time">
                            <h4>Город и время доставки</h4>
                            <div class="inner_inputs">
                                <div class="inner_inputs_child">
                                    <label for="city">Город доставки:</label>
                                    <input type="text" placeholder="Алматы, Казахстан">
                                </div>
                                <div class="inner_inputs_child">
                                    <label for="">Выбрать дату:</label>
                                    <select name="city" id="city">
                                        <option value="">Завтра 13.07.21</option>
                                        <option value="">Almaty</option>
                                    </select>
                                </div>
                                <div class="inner_inputs_child">
                                    <label for="">Выбрать время:</label>
                                    <select name="city" id="city">
                                        <option value="">В течении рабочего дня</option>
                                        <option value="">Almaty</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="condition">
                            <h4>Город и время доставки</h4>
                            <div class="inner_inputs">
                                <p class="inner_inputs_child">
                                    <input type="radio" value="Курьером " name="kurier">
                                    <label for="">Курьером</label>
                                </p>
                                <p class="inner_inputs_child">
                                    <input type="radio" value="Самовывоз" name="kurier">
                                    <label for="radio2">Самовывоз</label>
                                </p>
                            </div>
                        </div>
                        <div class="your_data">
                            <h4>Ваши данные</h4>
                            <div class="inner_inputs">
                                <p class="inner_inputs_child">
                                    <label for="">Имя</label>
                                    <input type="text" :value="userData.user.name">
                                </p>
                                <p class="inner_inputs_child">
                                    <label for="">Телефон</label>
                                    <input type="text" :value="userData.user.phone_number">
                                </p>
                                <p class="inner_inputs_child">
                                    <label for="">Email</label>
                                    <input type="text" :value="userData.user.email">
                                </p>
                                <p class="inner_inputs_child">
                                    <label for="">Комментарий к заказу:</label>
                                    <textarea></textarea>
                                </p>
                                <p class="checkbox_container">
                                    <input type="checkbox" id="checkboxer" v-model="ownTake">
                                    <label for="checkboxer">Я получатель</label>
                                </p>
                            </div>
                        </div>
                        <div class="your_data" v-if="!ownTake">
                            <h4>Данные получателя</h4>
                            <div class="inner_inputs">
                                <p class="inner_inputs_child">
                                    <label for="">Имя</label>
                                    <input type="text">
                                </p>
                                <p class="inner_inputs_child">
                                    <label for="">Телефон</label>
                                    <input type="text">
                                </p>
                                <p class="inner_inputs_child">
                                    <label for="">Email</label>
                                    <input type="text">
                                </p>
                                <p class="inner_inputs_child">
                                    <label for="">Комментарий к заказу:</label>
                                    <textarea></textarea>
                                </p>
                            </div>
                        </div>
                        <div class="inner_inputs another">
                            <div v-for="(card,i) in cards" :key="i" @click="changeCard(i)">
                                <div :class="chooseCards == i ? 'active_card' : ''" >
                                    <img :src="card.img" alt="">
                                </div>
                                <span>{{ card.title }}</span>
                            </div>
                        </div>
                        <button>Оформить заказ</button>
                    </form>
                </div>
                <div class="right_side">
                    <div>
                        <h4>Ваш заказ</h4>
                        <div class="products">
                            <div class="products_container" v-for="(obj, i) in cartItems" :key="i">
                                <img v-if="obj.images" :src="obj.images" alt="" width="87px" style="object-fit: cover">
                                <img v-else src='@/assets/img/product-placeholder.png' alt="" width="87px" style="object-fit: cover">

                                <div class="products_info">
                                    <span>{{ obj.full_name }}</span>
                                    <div>
                                        <span>{{ productsCounts[obj.id] }} шт. </span>
                                        <span>{{ obj.price }} ₸</span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div class="prices">
                        
                            <div class="delivery">
                                <span>Доставка</span>
                                <span>300 ₸ </span>
                            </div>
                        </div>
                        <div class="prices_total products_container">
                            <span>Общая сумма</span>
                            <span>{{ overallPrice + 300 }} ₸</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Главная',
                    url: '/',
                },
                {
                    title: 'Оформление заказа',
                    url: '/order'
                }
            ],
            cartItems: [],
            chooseCards: 0,
            cards: [
                {
                    img: require('../assets/img/visa.svg'),
                    title: 'Карты Visa,Mastercard'
                },
                {
                    img: require('../assets/img/money.svg'),
                    title: 'Наличными'
                }
            ],
            ownTake: false,
            userData: {}
        }
    },
    computed: {
        ...mapState('cart', ['products']),
        productsCounts() {
            let counts = {};
            this.products.forEach(product => {
                counts[product.id] = product.count;
            });
            console.log(this.products);
            return counts;
        },
        overallPrice() {
            let price = 0;
            this.cartItems.forEach(cartItem => {
                price += this.productsCounts[cartItem.id] * +cartItem.price;
            });
            return price;
        }
    },
    methods: {
        changeCard(index){
            this.chooseCards = index
        }
    },
    async beforeMount() {
        if (!this.products.length) return;
        let requestString = '/cart/multiple?';
        this.products.forEach(product => {
            requestString += 'id[]=' + product.id + '&';
        });
        this.$axios.$get(requestString).then(data => {
            this.cartItems = data.products;
        }).catch(err => {
            console.error(err);
        });
        this.$axios.$get('/order-create').then(res => {
            console.log(res);
        })
    },
    async asyncData({ $axios, $cookies }) {
        $axios.setHeader('Authorization', `Bearer ${$cookies.get('auth-token')}`);
        const userData = await $axios.$get('/profile');
        console.log(userData);
        return { userData }
    }
}
</script>

<style scoped lang="scss">
    .content_block{
        display: flex;
        margin-top: 60px;
        justify-content: space-between;

    }
    .active_card{
        background-color: #05054B;
    }
    .another{
        display: flex;
    }
    .prices{
         padding: 13px 0;
        border-bottom: 1px solid #D4D4E1;   
    }
    .prices_total ,.prices>div{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .prices_total>span:last-child ,.prices>div>span:last-child{
        font-weight: 600;
    }
    .prices>div{
        margin-top: 10px;
    }

    .right_side{
        width: 28%;
        &>div{
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
            padding: 24px;
            width: 100%;
            overflow: hidden;
            border-radius: 10px;
            height: auto;
        }
    }
    .right_side .products{
        margin-top: 14px;
    }
    .products_container{
        display: flex;
        padding: 13px 0;
        border-bottom: 1px solid #D4D4E1;
        img{
            height: 90px;
        }
    }
    .products_container .products_info{
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
    }
    .products_info>div{
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }
    .products_info>div>span:last-child{
        font-weight: 600;
    }
    .right_side h4{
        color: #646570;
        font-size: 22px;
        font-weight: 500;
    }

    .another>div{
        text-align: center;
        margin-right: 20px;
        color: #606C66;
    }
    .another>div>div>img{
        width: auto;
        height: 54px;
    }
    .another>div>span{
        margin-top: 15px;
        display: inline-block;
    }
    .another>div>div{
        border: 1px solid #01004E;
        border-radius: 15px;
        padding: 12px;
    }
    .another .current{
        color: #37130F
    }
    .content>h2{
        text-align: center;
        font-size: 40px;
        font-weight: 600;
    }
    .forms>form>button{
        border-radius: 20px;
        background: #05054B;
        padding: 14px 0;
        width: 30%;
        margin: 30px 0;
        border: none;
        color: white;
        font-weight: 600;
    }
    .forms{
        width: 60%;
    }
    .checkbox_container{
        margin-top: 32px;
    }
    .forms>form>div{
        margin-top: 20px;
        padding-bottom: 30px;
        border-bottom: 1px solid lightgray;
    }
    .forms>form>div>h4{
        font-size: 22px;
        font-weight: normal;
    }
    .forms>form>div>div{
        margin-top: 30px;
    }
    .city_time .inner_inputs_child,.your_data .inner_inputs_child{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
    }
    .city_time .inner_inputs_child input, .your_data .inner_inputs_child input, .city_time select{
        width: 60%;
         border-radius: 100px;
         box-sizing: content-box;
        border: 1px solid #D5D5D5;
        outline: none;
        font-size: 16px;
        padding: 7px 36px;
    }
    .your_data .inner_inputs_child textarea{
        width: 60%;
        border-radius: 10px;
        resize: none;
        font-size: 16px;
        height: 100px;
        border: 1px solid #D5D5D5;
        outline: none;
        padding: 7px 36px;
    }
    .condition p label{
        margin-left: 20px;
    }
    .condition p{
        margin-top: 10px;
    }
    @media screen and(max-width: 990px) and(max-width: 768px) {
        .content_block{
            flex-direction: column-reverse;
        }
        .content h2{
            margin-top: 20px;
        }
        .right_side{
            width: 100%;
            box-sizing: border-box;
            &>div{
                box-sizing: border-box;
            }
        }
        .forms{
            width: 100%;
        }
    }
</style>