<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="cart-main" v-if="products.length">
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
            <div class="count centered">
              <div class="quantity">
                <div class="minus-btn" @click="removeOne(cartItem.id)">-</div>
                <input type="number" name="quantity" id="quantity" min="1" max="999" :value="productsCounts[cartItem.id]" @change="setItemCount($event, cartItem.id)">
                <div class="plus-btn" @click="addOne(cartItem.id)">+</div>
              </div>
            </div>
            <div class="price centered">{{ cartItem.price }}</div>
            <div class="total centered">{{ cartItem.price * productsCounts[cartItem.id] }}</div>
            <div class="remove"><img src="~/assets/icons/delete.svg" alt="Удалить из корзины" @click="cartRemove(cartItem.id)"></div>
          </div>
        </div>
      </div>
      <div class="cart-main empty" v-else>
        <div class="text-empty">Корзина пуста</div>
        <nuxt-link to="/catalog">Перейти в каталог</nuxt-link>
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
    productsCounts() {
      let counts = {};
      this.products.forEach(product => {
        counts[product.id] = product.count;
      });
      return counts;
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
  },
  methods: {
    ...mapMutations({
      setProduct: 'cart/setProduct'
    }),
    cartRemove(id) {
      const target = this.cartItems.find(item => item.id == id);
      this.cartItems.splice(this.cartItems.indexOf(target), 1);
      this.setProduct({productId: id, count: 0});
    },
    addOne(id) {
      let count = this.productsCounts[id];
      count++;
      if (count > 999) { count = 999 };
      this.setProduct({productId: id, count: count});
    },
    removeOne(id) {
      let count = this.productsCounts[id];
      count--;
      if (count <= 0) {
        this.cartRemove(id);
        return;
      };
      this.setProduct({productId: id, count: count});
    },
    setItemCount(event, id) {
      let count = +event.target.value;
      if(count > 999) {
        count = 999;
      } else if(count <= 0) {
        this.cartRemove(id);
        return;
      }
      this.setProduct({productId: id, count});
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-main {
  margin-top: 24px;
  &.empty {
    text-align: center;
    .text-empty {
      font-size: 30px;
      margin-top: 24px;
      margin-bottom: 24px;
    }
  }
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
    &.count {
      .quantity {
        display: flex;
        border: 2px solid #DEE0E4;
        border-radius: 6px;
        width: 110px;
        justify-content: space-between;
        .minus-btn {
          border-right: 2px solid #DEE0E4;
        }
        .plus-btn {
          border-left: 2px solid #DEE0E4;
        }
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