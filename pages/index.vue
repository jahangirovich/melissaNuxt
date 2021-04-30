<template>
  <div class="page-inner">
    <div class="container">
      <section class="sale">
        <div class="banner-main">
          <img :src="bannerMain" alt="">
        </div>
        <div class="banners-small">
          <img
            v-for="(banner, index) in bannersSecondary"
            :key="index"
            :src="banner"
            alt=""
          >
        </div>
      </section>
      <section class="popular-products">
        <h1 class="title">Популярные товары</h1>
        <div class="products-popular">
          <div class="products-grid">
            <product-card-horizontal
              v-for="(product, index) in products.slice(0, 4)"
              :key="index"
              :name="product.name"
              :price="product.price"
              :productId="product.productId"
            />
          </div>
          <div class="product-big">
            <product-big-card
              v-for="(product, index) in products.slice(4, 5)"
              :key="index"
              :name="product.name"
              :price="product.price"
              :productId="product.productId"
            />
          </div>
        </div>
      </section>
      <section class="popular-categories">
        <h1 class="title">Популярные категории</h1>
        <div class="categories-container">
          <category-card
            v-for="(category, index) in categories"
            :key="index"
            :image="category.image"
            :name="category.name"
            :categoryId="category.categoryId"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerMain: require('@/assets/img/banner-main.png'),
      bannersSecondary: [
        require('@/assets/img/banner-secondary1.png'),
        require('@/assets/img/banner-secondary2.png')
      ],
      products: [
        {
          productId: 1,
          name: 'Фервекс для взрослых (с витамином С) саше №8',
          price: 1220
        },
        {
          productId: 2,
          name: 'Фервекс для взрослых (с витамином С) саше №8',
          price: 1220
        },
        {
          productId: 3,
          name: 'Фервекс для взрослых (с витамином С) саше №8',
          price: 1220
        },
        {
          productId: 4,
          name: 'Фервекс для взрослых (с витамином С) саше №8',
          price: 1220
        },
        {
          productId: 5,
          name: 'Фервекс для взрослых (с витамином С) саше №8',
          price: 1220
        }
      ],
      categories: [
        {
          categoryId: 1,
          image: 'category3.png',
          name: 'Лекарственные препараты'
        },
        {
          categoryId: 2,
          image: 'category2.png',
          name: 'Красота и уход',
        },
        {
          categoryId: 3,
          image: 'category1.png',
          name: 'Для мам и детей'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sale {
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
  img {
    width: 100%;
  }
  .banner {
    &-main {
      width: 65%;
      box-shadow: 0px 4px 15px rgba(66, 76, 98, 0.15);
    }
    &s-small {
      width: 30%;
    }
  }
}
.popular-products {
  margin-bottom: 84px;
  h1.title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .products-popular {
    display: flex;
  }
  .products-grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 65%;
  }
  .product-big {
    width: 35%;
  }
}
.popular-categories {
  margin-bottom: 70px;
  h1.title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .categories-container {
    display: flex;
  }
}
</style>
