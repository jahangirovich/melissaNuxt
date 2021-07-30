<template>
    <div class="page-inner">
        <div class="container">
            <LayoutBreadcrumbs
                :crumbs="breadcrumbs"
            />
            <h2>Поиск</h2>
            <div v-if="products.length != 0">
                <div class="product_containers">
                    <product-card-vertical
                        v-for="(product, index) in products"
                        :key="index"
                        :name="product.full_name"
                        :price="+product.price"
                        :oldPrice="product.oldPrice || null"
                        :discount="product.discount || null"
                        :productId="product.id"
                        :isFavorite="product.isFavorite || null"
                        :image="product.images ? `https://melissa.a-lux.dev/storage/${JSON.parse(product.images)[0]}` : null"
                    />
                </div>
                
            </div>
            <div v-else>
                Не найдено
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'partners',
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Главная',
                    url: '/',
                },
                {
                    title: 'Поиск',
                    url: '/search'
                }
            ],
            products: []
        }
    },
    watch: {
        '$route.query.target': {
            handler: function(e){
                this.$axios.get(`/itemdar/${this.$route.query.target}`).then(res => {
                    this.products = res.data.items.data;
                    console.log("askdkas");
                }).catch(res => {
                    if(res.response.status == 404) this.products = [];
                })
            },deep:true
        }
    },
    beforeMount(){
        this.$axios.get(`/itemdar/${this.$route.query.target}`)
        .then(res => {
            this.products = res.data.items.data;
            console.log("askdkas");
        }).catch(res => {
            if(res.response.status == 404) this.products = [];
        })
    }
}
</script>

<style scoped lang="scss">

    h2{
        font-size: 28px;
        color: #3F414E;
        font-weight: 700;
        margin: 30px 0;
    }
    .icons{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 100px;
    }
    .product_containers{
        display: flex;
        flex-wrap: wrap;
    }
    .icons div{
        padding: 20px;
        width: 28%;
        margin-left: 15px;
        border: 1px solid lightgray;
        margin-top: 15px;
    }
    .icons div img{
        height: 60px;
        width: 174px;
    }
</style>