<template>
  <div class="product-card">
    <nuxt-link :to="`/product/${productId}`" tabindex="-1">
      <img class="product-image" :src="image" :alt="name">
    </nuxt-link>
    <div class="product-data">
      <nuxt-link :to="`/product/${productId}`">
        <h2 class="name">{{ name }}</h2>
      </nuxt-link>
      <span class="price">{{ Intl.NumberFormat('ru-RU').format(price) + ' ₸'}}</span>
      <div class="cart-add-btn">
        <img src="@/assets/icons/cart.svg" class="icon">
        <span>В корзину</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: require('@/assets/img/product-placeholder.png'),
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      requred: true,
    },
    productId: {
      type: Number,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  box-sizing: border-box;
  padding: 20px 12px 20px 18px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #DEE0E4;
  width: 47%;
  display: flex;
  margin-bottom: 14px;
  margin-right: 20px;
  img.product-image {
    width: 100px;
    height: 100px;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    margin-right: 24px;
  }
  .product-data {
    a {
      text-decoration: none;
      color: #3F414E;
    }
    .name {
      font-size: 14px;
      margin-bottom: 9px;
    }
    .price {
      display: block;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .cart-add-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      padding: 9px 26px;
      border: 1px solid #05054B;
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
  }
}
</style>