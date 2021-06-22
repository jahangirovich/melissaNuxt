<template>
  <div class="product-page">
    <div class="container">
      <layout-breadcrumbs :crumbs="breadcrumbs" class="product-breadcrumbs"/>
      <div class="page-main">
        <section class="product-main-info">
          <slick
            class="slick-container-nav"
            ref="slick"
            :options="navSlickOptions"
            v-if="JSON.parse(productData.images) && JSON.parse(productData.images).length"
          >
            <img class="slide" v-for="(image, index) in JSON.parse(productData.images)" :key="index" :src="`https://melissa.a-lux.dev/storage/${image}`" alt="">
          </slick>
          <slick
            class="slick-container-nav"
            ref="slick"
            :options="navSlickOptions"
            v-else
          >
            <img class="slide" src="~assets/img/product-placeholder.png" alt="">
          </slick>
          <slick
            class="slick-container-main"
            ref="slick"
            :options="mainSlickOptions"
            v-if="JSON.parse(productData.images) && JSON.parse(productData.images).length"
          >
            <div class="slide" v-for="(image, index) in JSON.parse(productData.images)" :key="index">
              <img :src="`https://melissa.a-lux.dev/storage/${image}`" alt="">
            </div>
          </slick>
          <slick
            class="slick-container-main"
            ref="slick"
            :options="mainSlickOptions"
            v-else
          >
            <div class="slide">
              <img src="~assets/img/product-placeholder.png" alt="">
            </div>
          </slick>
          <div class="info-block">
            <h1 class="title">{{productData.full_name}}</h1>
            <h2 class="price">{{ Intl.NumberFormat("ru-RU").format(+productData.price) + " ₸" }}</h2>
            <div class="stock" :class="{'instock': productData.inStock, 'notinstock': !productData.inStock}">
              <img src="~/assets/icons/in-stock.svg" alt="" v-if="productData.inStock">
              <img src="~/assets/icons/not-in-stock.svg" alt="" v-else>
              <span>{{productData.inStock ? 'В наличии' : 'Нет в наличии'}}</span>
            </div>
            <div class="general-info" v-if="productData.generalInfo && productData.generalInfo.length">
              <ProductInfoLine
                v-for="(data, index) in productData.generalInfo"
                :key="index"
                :title="data.title"
                :value="data.value"
              />
            </div>
            <div class="cart-actions-block">
              <div class="quantity">
                <div class="minus-btn" @click="removeOne">-</div>
                <input type="number" name="quantity" id="quantity" min="1" max="999" v-model="quantity" @blur="validate">
                <div class="plus-btn" @click="addOne">+</div>
              </div>
              <div class="cart-actions">
                <svg width="24" height="24" @click="removeAll" v-if="quantity" class="cart-deleteall" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33533 13.3333C3.33533 14.0687 3.93333 14.6667 4.66867 14.6667H11.3353C12.0707 14.6667 12.6687 14.0687 12.6687 13.3333V5.33333H14.002V4H11.3353V2.66667C11.3353 1.93133 10.7373 1.33333 10.002 1.33333H6.002C5.26667 1.33333 4.66867 1.93133 4.66867 2.66667V4H2.002V5.33333H3.33533V13.3333ZM6.002 2.66667H10.002V4H6.002V2.66667ZM5.33533 5.33333H11.3353L11.336 13.3333H4.66867V5.33333H5.33533Z" fill="#F94949"/>
                  <path d="M6.002 6.66667H7.33533V12H6.002V6.66667ZM8.66867 6.66667H10.002V12H8.66867V6.66667Z" fill="#F94949"/>
                </svg>
                <div class="cart-add-btn" :class="{inactive: quantity}" @click="cartClick">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.73193 1.72485H3.03248C3.66041 1.72485 3.97438 1.72485 4.22866 1.83932C4.4528 1.94021 4.64372 2.10263 4.77922 2.30771C4.93295 2.54038 4.98325 2.85029 5.08386 3.47011L5.42319 5.56065M5.42319 5.56065L6.21767 10.4552C6.43892 11.8183 6.54955 12.4998 6.89565 12.9899C7.20033 13.4213 7.62927 13.7496 8.1253 13.9311C8.68878 14.1372 9.37555 14.0659 10.7491 13.9235L19.548 13.0112C20.3213 12.931 20.7079 12.8909 21.0245 12.7709C21.8076 12.4738 22.3995 11.8174 22.6142 11.0078C22.701 10.6805 22.701 10.2918 22.701 9.51442V9.51442C22.701 8.68482 22.701 8.27002 22.6056 7.92776C22.3692 7.07992 21.7196 6.40942 20.8797 6.14632C20.5407 6.04011 20.1261 6.02696 19.2969 6.00066L5.42319 5.56065Z" stroke="#05054B" stroke-width="1.55867" stroke-linecap="round" stroke-linejoin="round"/>
                    <ellipse cx="9.40318" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
                    <ellipse cx="19.121" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
                  </svg>
                  <span v-if="quantity">Уже в корзине</span>
                  <span v-else>В корзину</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="product-pharmacological" v-if="productData.pharmParameters && productData.pharmParameters.length > 0">
          <h1 class="title">Фармакологические свойства</h1>
          <ProductPharmaParamLine
            v-for="(pharmParam, index) in productData.pharmParameters"
            :key="index"
            :title="pharmParam.title"
            :value="pharmParam.value"
          />
        </section>
        <section class="product-pharmacological-descr" v-if="productData.pharmDescr">
          <h1 class="title">Фармакологические свойства</h1>
          <p>{{ productData.pharmDescr }}</p>
        </section>
        <section class="analog-list" v-if="analogProducts && analogProducts.length > 0">
          <h1 class="title">Аналоги</h1>
          <div class="products-container">
            <product-card-vertical
              v-for="(product, index) in analogProducts"
              :key="index"
              :name="productData.name"
              :price="productData.price"
              :oldPrice="productData.oldPrice"
              :discount="productData.discount"
              :productId="productData.productId"
              :isFavorite="productData.isFavorite"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import {mapMutations, mapState} from 'vuex';

export default {
  components: {
    Slick
  },
  data() {
    return {
      navSlickOptions: {
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 4,
        arrows: false,
        waitForAnimate: false,
        asNavFor: '.slick-container-main',
        focusOnSelect: true,
      },
      mainSlickOptions: {
        asNavFor: '.slick-container-nav',
        slidesToShow: 1,
        arrows: false,
        waitForAnimate: false,
      },
    }
  },
  async asyncData({ $axios, params }) {
    const productData = await $axios.$get(`https://melissa.a-lux.dev/api/items/${params.id}`);
    return { productData };
  },
  computed: {
    ...mapState('cart', ['products']),
    quantity: {
      get() {
        let storeProduct = this.products.filter(product => product.id == this.productId);
        return storeProduct.length ? storeProduct[0].count : 0;
      },
      set(newQuantity) {
        this.setProduct({productId: +this.productId, count: newQuantity});
      }
    },
    breadcrumbs() {
      return [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Каталог',
          url: '/catalog'
        },
        {
          title: this.productData?.category?.title,
          url: '/catalog?category=' + this.productData?.category?.id
        },
        {
          title: this.productData.full_name,
          url: '/product' + this.productData.id
        }
      ]
    },
    productId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapMutations({
      setProduct: 'cart/setProduct'
    }),
    cartClick() {
      this.quantity || this.addOne();
    },
    addOne() {
      this.quantity++;
      this.validate();
    },
    removeOne() {
      this.quantity--;
      this.validate();
    },
    removeAll() {
      this.quantity = 0;
      this.validate();
    },
    validate() {
      this.quantity = +this.quantity;
      if(this.quantity > 999) {
        this.quantity = 999;
      }else if(this.quantity < 0) {
        this.quantity = 0;
      }
      this.setProduct({productId: +this.productId, count: this.quantity});
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
  &.flex-end {
    justify-content: flex-end;
  }
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
    &.inactive {
      color: #9e9e9e;
      background: #e2e2e2;
      border-color: #9e9e9e;
      cursor: default;
      svg {
        display: none;
      }
      &:hover {
        color: #9e9e9e;
        background: #e2e2e2;
      }
    }
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
  margin-bottom: 60px;
  width: 65%;
  h1.title {
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 28px;
  }
}

.product-pharmacological-descr {
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  h1.title {
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 28px;
  }
}

.analog-list {
  h1.title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .products-container {
    display: flex;
    flex-wrap: wrap;
  }
}

.cart-actions {
  display: flex;
  align-items: center;
  .cart-deleteall {
    margin-right: 12px;
    cursor: pointer;
  }
}
</style>


<style lang="scss">
.slick-container-nav {
  width: 75px;
  margin-right: 30px;

  .slick-list {
    min-height: 300px;
  }
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