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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.73193 1.72485H3.03248C3.66041 1.72485 3.97438 1.72485 4.22866 1.83932C4.4528 1.94021 4.64372 2.10263 4.77922 2.30771C4.93295 2.54038 4.98325 2.85029 5.08386 3.47011L5.42319 5.56065M5.42319 5.56065L6.21767 10.4552C6.43892 11.8183 6.54955 12.4998 6.89565 12.9899C7.20033 13.4213 7.62927 13.7496 8.1253 13.9311C8.68878 14.1372 9.37555 14.0659 10.7491 13.9235L19.548 13.0112C20.3213 12.931 20.7079 12.8909 21.0245 12.7709C21.8076 12.4738 22.3995 11.8174 22.6142 11.0078C22.701 10.6805 22.701 10.2918 22.701 9.51442V9.51442C22.701 8.68482 22.701 8.27002 22.6056 7.92776C22.3692 7.07992 21.7196 6.40942 20.8797 6.14632C20.5407 6.04011 20.1261 6.02696 19.2969 6.00066L5.42319 5.56065Z" stroke="#05054B" stroke-width="1.55867" stroke-linecap="round" stroke-linejoin="round"/>
          <ellipse cx="9.40318" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
          <ellipse cx="19.121" cy="19.8079" rx="2.04576" ry="2.19189" stroke="#05054B" stroke-width="1.55867"/>
        </svg>
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
      transition: background-color .3s, color .3s;
      svg {
        height: 18px;
        width: 18px;
        margin-right: 6px;
        ellipse, path {
          transition: stroke .3s;
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
  }
}
</style>