<template>
  <div class="products_container">
       <product-card-vertical
            v-for="(product, index) in cartItems"
            :key="index"
            :name="product.full_name"
            :price="+product.price"
            :oldPrice="product.oldPrice || null"
            :discount="product.discount || null"
            :productId="product.id"
            :isFavorite="product.isFavorite || null"
            :image="product.image ? `https://melissa.a-lux.dev/storage/${JSON.parse(product.image)[0]}` : null"
        />
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
    data() {
        return {
            cartItems: []
        }
    },
    computed:{
        ...mapState('cart', ['favoriteProducts']),
    },
    async beforeMount() {
        const products = Object.keys(this.favoriteProducts);
        if (!products.length) return;
        let requestString = '/cart/multiple?';
        products.forEach(product => {
            requestString += 'id[]=' + this.favoriteProducts[product] + '&';
        });
        this.$axios.$get(requestString).then(data => {
            this.cartItems = data.products;
        }).catch(err => {
        });
    },
}
</script>

<style lang="scss" scoped>
.products_container{
    padding-left: 20px;
    display: flex;
    flex-wrap: wrap;
}
.category-card {
  display: block;
  position: relative;
  height: 240px;
  width: 33%;
  margin-right: 20px;
  border-radius: 12px;
  transition: box-shadow .5s;
  img {
    width: 100%;
    height: 240px;
  }
}
h2.category-name {
  position: absolute;
  top: 24px;
  left: 24px;
  color: #3F414E;
  font-weight: 600;
  font-size: 26px;
  width: 60%;
}

@media screen and (max-width: 992px) {
  .category-card {
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>