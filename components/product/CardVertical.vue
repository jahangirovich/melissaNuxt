<template>
  <div class="card-vertical">
    <nuxt-link :to="`/product/${productId}`" tabindex="-1">
      <img v-if="image" :src="image" :alt="name" class="card-photo" />
      <img v-else src="~/assets/img/product-placeholder.png" :alt="name" class="card-photo" />
    </nuxt-link>
    <nuxt-link :to="`/product/${productId}`" class="product-name">
      {{ name }}
    </nuxt-link>
    <div class="product-price">
      <div v-if="oldPrice" class="price-old">
        {{ Intl.NumberFormat("ru-RU").format(oldPrice) + " ₸" }}
      </div>
      <div class="price-actual">
        {{ Intl.NumberFormat("ru-RU").format(price) + " ₸" }}
      </div>
    </div>
    <div class="cart-add-btn" :class="{inactive: quantity}" @click="quantity = 1">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.73193 1.72485H3.03248C3.66041 1.72485 3.97438 1.72485 4.22866 1.83932C4.4528 1.94021 4.64372 2.10263 4.77922 2.30771C4.93295 2.54038 4.98325 2.85029 5.08386 3.47011L5.42319 5.56065M5.42319 5.56065L6.21767 10.4552C6.43892 11.8183 6.54955 12.4998 6.89565 12.9899C7.20033 13.4213 7.62927 13.7496 8.1253 13.9311C8.68878 14.1372 9.37555 14.0659 10.7491 13.9235L19.548 13.0112C20.3213 12.931 20.7079 12.8909 21.0245 12.7709C21.8076 12.4738 22.3995 11.8174 22.6142 11.0078C22.701 10.6805 22.701 10.2918 22.701 9.51442V9.51442C22.701 8.68482 22.701 8.27002 22.6056 7.92776C22.3692 7.07992 21.7196 6.40942 20.8797 6.14632C20.5407 6.04011 20.1261 6.02696 19.2969 6.00066L5.42319 5.56065Z" stroke="#05054B" stroke-width="1.55867" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="9.40318" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
        <ellipse cx="19.121" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
      </svg>
      <span v-if="quantity">Уже в корзине</span>
      <span v-else>В корзину</span>
    </div>
    <div v-if="discount" class="discount">
      {{ discount }}
    </div>
    <div class="favorite" @click="favorite = !favorite">
      <transition name="favorite">
        <img key="favorite" v-if="favorite" src="@/assets/icons/favorite-fill.svg" alt="" />
        <img key="favorite-filled" v-else src="@/assets/icons/favorite.svg" alt="" />
      </transition>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
  data() {
    return {
      favorite: this.isFavorite
    };
  },
  props: {
    image: {
      type: String,
      default: require("@/assets/img/product-placeholder.png")
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    oldPrice: {
      type: Number,
      default: 0
    },
    productId: {
      type: Number,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    discount: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    ...mapState('cart', ['products']),
    quantity: {
      get() {
        let storeProduct = this.products.filter(product => product.id == this.productId);
        return storeProduct.length ? storeProduct[0].count : 0;
      },
      set() {
        this.setProduct({productId: +this.productId, count: 1});
      }
    },
  },
  methods: {
    ...mapMutations({
      setProduct: 'cart/setProduct'
    })
  }
};
</script>

<style lang="scss" scoped>
.card-vertical {
  display: flex;
  box-sizing: border-box;
  padding: 36px 12px 20px;
  border-radius: 6px;
  border: 1px solid #dee0e4;
  width: 230px;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-right: 12px;
  margin-bottom: 24px;
  .card-photo {
    width: 150px;
    height: 150px;
    margin-bottom: 12px;
  }
  .product-name {
    display: block;
    width: 90%;
    height: 2rem;
    text-align: center;
    text-decoration: none;
    color: #3f414e;
    margin-bottom: 12px;
  }
  .product-price {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    .price-old {
      font-weight: 500;
      font-size: 14px;
      color: #a1a4b2;
      margin-right: 12px;
      text-decoration: line-through;
    }
    .price-actual {
      font-weight: 700;
      font-size: 18px;
      color: #ef4423;
    }
  }
  .cart-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 9px 26px;
    border: 1px solid #05054b;
    border-radius: 100px;
    cursor: pointer;
    transition: background-color .3s, color .3s;
    svg {
      height: 18px;
      width: 18px;
      margin-right: 6px;
      ellipse, path {
        transition: stroke .3s;
      }
    }
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
    span {
      font-weight: 600;
      font-size: 13px;
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
  .discount {
    font-weight: 700;
    font-size: 10px;
    padding: 4px 8px;
    background: #ef4423;
    color: #fff;
    border-radius: 50px;
    position: absolute;
    top: 12px;
    left: 12px;
  }
  .favorite {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    img {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.favorite-enter-active,
.favorite-leave-active {
  transition: all 0.5s;
}
.favorite-enter,
.favorite-leave-active {
  transform: scale(0.8);
  opacity: 0;
}
</style>
