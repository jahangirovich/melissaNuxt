<template>
  <div>
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
</template>

<script>
export default {
    data() {
        return {
            products: [
                {
                    full_name: "asdas",
                    price: 123,
                    oldPrice: 323,
                    discount: false,
                    productId: 432,
                    isFavorite: true,
                    image: null
                }
            ]
        }
    },
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
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