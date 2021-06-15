<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="cart-main">
        <div class="table">
          <div class="table-header">
            <div class="image"></div>
            <div class="title">Товар</div>
            <div class="count centered">Количество</div>
            <div class="price centered">Стоимость</div>
            <div class="total centered">Итог</div>
            <div class="remove"></div>
          </div>
          <div class="table-data-line" v-for="(cartItem, index) in cartItems" :key="index">
            <img class="image" :src="`https://melissa.a-lux.dev/storage/${JSON.parse(cartItem.images)[0]}`">
            <div class="title">{{ cartItem.full_name }}</div>
            <div class="count centered">{{ products.filter(product => product.id == cartItem.id)[0] ? products.filter(product => product.id == cartItem.id)[0].count : null }}</div>
            <div class="price centered">{{ cartItem.price }}</div>
            <div class="total centered">{{ cartItem.price * (products.filter(product => product.id == cartItem.id)[0] ? products.filter(product => product.id == cartItem.id)[0].count : 0) }}</div>
            <div class="remove"><img src="~/assets/icons/delete.svg" alt="Удалить из корзины" @click="cartRemove(cartItem.id)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: 'Корзина',
          url: '/cart'
        }
      ],
      cartItems: [],
    }
  },
  computed: {
    ...mapState('cart', ['products']),
  },
  async beforeMount() {
    let requestString = '/cart/multiple?';
    this.products.forEach(product => {
      requestString += 'id[]=' + product.id + '&';
    });
    this.$axios.$get(requestString).then(data => {
      this.cartItems = data.products;
    }).catch(err => {
      console.error(err);
    });
  },
  methods: {
    ...mapMutations({
      setProduct: 'cart/setProduct'
    }),
    cartRemove(id) {
      this.setProduct({productId: id, count: 0});
      const target = this.cartItems.filter(item => item.id = id)[0];
      this.cartItems.splice(this.cartItems.indexOf(target), 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-main {
  margin-top: 24px;
}
.table-header {
  display: grid;
  grid-template-columns: 1fr 6fr 2fr 2fr 2fr 1fr;
  border-bottom: 1px solid #DEE0DE;
  padding: 12px 0;
  div {
    color: #A1A4B2;
    font-size: 14px;
  }
  .centered {
    text-align: center;
  }
}
.table-data-line {
  display: grid;
  grid-template-columns: 1fr 6fr 2fr 2fr 2fr 1fr;
  border-bottom: 1px solid #DEE0DE;
  padding: 12px 0;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    &.title {
      justify-content: flex-start;
      font-size: 16px;
    }
    &.remove img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  img.image {
    width: 73px;
    height: 77px;
    object-fit: contain;
  }
  .centered {
    text-align: center;
  }
  &:last-child {
    margin-bottom: 60px;
  }
}
</style>