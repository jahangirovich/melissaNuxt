<template>
  <div class="product-page">
    <div class="container">
      <layout-breadcrumbs class="product-breadcrumbs"/>
      <div class="page-main">
        <div class="product-main-info">
          <slick
            class="slick-container-nav"
            ref="slick"
            :options="navSlickOptions"
          >
            <img class="slide" v-for="(image, index) in product.images" :key="index" :src="image" alt="">
          </slick>
          <slick
            class="slick-container-main"
            ref="slick"
            :options="mainSlickOptions"
          >
            <div class="slide" v-for="(image, index) in product.images" :key="index">
              <img :src="image" alt="">
            </div>
          </slick>
          <div class="info-block">
            <h1 class="title">{{product.title}}</h1>
            <h2 class="price">{{ Intl.NumberFormat("ru-RU").format(product.price) + " ₸" }}</h2>
            <div class="stock" :class="{'instock': product.stock, 'notinstock': !product.stock}">
              <img src="~/assets/icons/in-stock.svg" alt="" v-if="product.stock">
              <img src="~/assets/icons/not-in-stock.svg" alt="" v-else>
              <span>{{product.stock ? 'В наличии' : 'Нет в наличии'}}</span>
            </div>
            <div class="general-info">
              <ProductInfoLine
                v-for="(data, index) in product.generalInfo"
                :key="index"
                :title="data.title"
                :value="data.value"
              />
            </div>
            <div class="cart-actions-block">
              <div class="quantity">
                <div class="minus-btn" @click="removeOne">-</div>
                <input type="number" name="quantity" id="quantity" min="1" max="999" v-model="quantity" @input="validate" @blur="validate">
                <div class="plus-btn" @click="addOne">+</div>
              </div>
              <div class="cart-add-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.73193 1.72485H3.03248C3.66041 1.72485 3.97438 1.72485 4.22866 1.83932C4.4528 1.94021 4.64372 2.10263 4.77922 2.30771C4.93295 2.54038 4.98325 2.85029 5.08386 3.47011L5.42319 5.56065M5.42319 5.56065L6.21767 10.4552C6.43892 11.8183 6.54955 12.4998 6.89565 12.9899C7.20033 13.4213 7.62927 13.7496 8.1253 13.9311C8.68878 14.1372 9.37555 14.0659 10.7491 13.9235L19.548 13.0112C20.3213 12.931 20.7079 12.8909 21.0245 12.7709C21.8076 12.4738 22.3995 11.8174 22.6142 11.0078C22.701 10.6805 22.701 10.2918 22.701 9.51442V9.51442C22.701 8.68482 22.701 8.27002 22.6056 7.92776C22.3692 7.07992 21.7196 6.40942 20.8797 6.14632C20.5407 6.04011 20.1261 6.02696 19.2969 6.00066L5.42319 5.56065Z" stroke="#05054B" stroke-width="1.55867" stroke-linecap="round" stroke-linejoin="round"/>
                  <ellipse cx="9.40318" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
                  <ellipse cx="19.121" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
                </svg>
                <span>В корзину</span>
              </div>
            </div>
          </div>
        </div>
        <div class="product-pharmacological">
          <h1 class="title">Фармакологические свойства</h1>
          <ProductPharmaParamLine
            :title="'123'"
            :value="'123214'"
          />
          <ProductPharmaParamLine
            :title="'123'"
            :value="'123214'"
          />
          <ProductPharmaParamLine
            :title="'123'"
            :value="'123214'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';

export default {
  components: {
    Slick
  },
  data() {
    return {
      quantity: 0,
      navSlickOptions: {
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 4,
        arrows: false,
        waitForAnimate: false,
        asNavFor: '.slick-container-main',
      },
      mainSlickOptions: {
        asNavFor: '.slick-container-nav',
        slidesToShow: 1,
        arrows: false,
        waitForAnimate: false,
      },
      product: {
        title: 'Фервекс №8 пак Комплекс',
        price: 1220,
        stock: 1,
        images: [
          'https://images.unsplash.com/photo-1535043205849-513fe27db33e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHllbGxvd3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1595392029711-8a206145f976?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVkJTIwYmFja2dyb3VuZHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1601923926156-014f6a9767d2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQwfHxncmVlbiUyMGJhY2tncm91bmR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1595391595051-1ec0194535dc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ymx1ZSUyMGJhY2tncm91bmR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1527275393322-8ddae8bd5de9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        ],
        generalInfo: [
          {
            title: 'Производитель',
            value: 'UPSA'
          },
          {
            title: 'Страна',
            value: 'Франция',
          },
          {
            title: 'Артикул',
            value: '2548976'
          }
        ]
      }
    }
  },
  methods: {
    addOne() {
      this.quantity++;
      this.validate();
    },
    removeOne() {
      this.quantity--;
      this.validate();
    },
    validate() {
      this.quantity = +this.quantity;
      if(this.quantity > 999) {
        this.quantity = 999;
      }else if(this.quantity < 0) {
        this.quantity = 0;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-breadcrumbs {
  margin-bottom: 36px;
}

.product-main-info {
  display: flex;
}

.info-block {
  width: 40%;
  margin-left: 30px;
  h1.title {
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 20px;
  }

  h2.price {
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 20px;
  }

  .stock {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      display: block;
      margin-left: 6px;
      font-weight: 500;
    }
    img {
      display: block;
      width: 16px;
      height: 16px;
    }
    &.notinstock {
      color: #ff4444;
    }
    &.instock {
      color: #3BDE15;
    }
  }

  .general-info {
    padding: 24px;
    background: #F5F5F9;
    box-sizing: content-box;
    dt {
      font-weight: 500;
    }
    dd {
      width: 180px;
    }
  }
}

.cart-actions-block {
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: space-between;
  .quantity {
    display: flex;
    border: 2px solid #DEE0E4;
    border-radius: 6px;
    width: 110px;
    justify-content: space-between;
    .minus-btn, .plus-btn {
      text-align: center;
      width: 30px;
      font-weight: 600;
      font-size: 18px;
      color: #A1A4B2;
      padding: 9px 0;
      cursor: pointer;
      user-select: none;
      transition: background-color .3s;
      &:hover {
        background: #ececec;
      }
    }
    input {
      width: 50px;
      outline: none;
      -moz-appearance: textfield;
      text-align: center;
      border: none;
      border-radius: 0;
      border-left: 2px solid #DEE0E4;
      border-right: 2px solid #DEE0E4;
      font-weight: 600;
      font-size: 18px;
      color: #3F414E;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .cart-add-btn {
    display: flex;
    width: 220px;
    border-radius: 50px;
    height: 54px;
    border: 2px solid #05054B;
    align-items: center;
    justify-content: center;
    color: #05054B;
    font-weight: 600;
    cursor: pointer;
    transition: background-color .3s, color .3s;
    svg {
      width: 18px;
      height: 18px;
      margin-right: 9px;
      ellipse, path {
        transition: stroke .3s;
      }
    }
    &:hover {
      background: #05054B;
      color: #fff;
      svg {
        ellipse, path {
          stroke: #fff;
        }
      }
    }
  }
}

.product-pharmacological {
  margin-top: 60px;
  width: 50%;
  h1.title {
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 28px;
  }
}
</style>


<style lang="scss">
.slick-container-nav {
  width: 75px;
  margin-right: 30px;
}

.slick-container-main {
  width: 40%;
  border: 2px solid #DEE0E4;
  .slick-list {
    height: 100%;
    .slick-track {
      height: 100%; 
    }
  }
}

.slick-slide {
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
  }
}

.slick-container-main .slide {
  height: 320px;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>