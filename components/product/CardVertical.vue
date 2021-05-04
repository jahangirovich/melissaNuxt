<template>
  <div class="card-vertical">
    <nuxt-link :to="`/product/${productId}`">
      <img :src="image" alt="" class="card-photo" />
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
    <div class="cart-add-btn">
      <img src="@/assets/icons/cart.svg" class="icon" />
      <span>В корзину</span>
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
    img {
      height: 18px;
      width: 18px;
      margin-right: 6px;
    }
    span {
      font-weight: 600;
      font-size: 13px;
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
