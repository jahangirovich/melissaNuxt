<template>
  <div class="page-inner">
    <div class="container">
      <section class="sale">
        <div class="banner-main">
          <img :src="bannerMain" alt="" />
        </div>
        <div class="banners-small">
          <img
            v-for="(banner, index) in bannersSecondary"
            :key="index"
            :src="banner"
            alt=""
          />
        </div>
      </section>
      <section class="popular-products">
        <h1 class="title">Популярные товары</h1>
        <div class="products-popular">
          <div class="products-grid">
            <product-card-horizontal
              v-for="(product, index) in (popularProducts.length ? popularProducts.slice(0, 4) : [])"
              :key="index"
              :name="product.full_name"
              :price="+product.price"
              :productId="+product.id"
              :image="product.images ? `https://melissa.a-lux.dev/storage/${JSON.parse(product.images)[0]}` : null"
            />
          </div>
          <div class="product-big">
            <product-big-card
              v-for="(product, index) in (popularProducts.length ? popularProducts.slice(4, 5) : [])"
              :key="index"
              :name="product.full_name"
              :price="+product.price"
              :productId="+product.id"
              :image="product.images ? `https://melissa.a-lux.dev/storage/${JSON.parse(product.images)[0]}` : null"
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
      <section class="discount-products">
        <h1 class="title">Акционные товары</h1>
        <div class="products-container">
          <product-card-vertical
            v-for="(product, index) in discountProducts"
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
        <nuxt-link class="all-products-btn" to="/catalog">
          Все специальные товары
        </nuxt-link>
      </section>
      <section class="about">
        <h1 class="title">
          Melissa — крупнейшая интернет-аптека в г.Алматы
        </h1>
        <p>
          Melissa — современный удобный интернет-магазин медикаментов, в
          котором можно купить онлайн сертифицированные лекарственные средства,
          витамины, товары для детей и мам, БАДы, косметику и другие товары для
          здоровья, красоты и гигиены по низким ценам. На нашем сайте вы найдете
          свыше 3000 наименований от мировых производителей. Общий ассортимент
          интернет аптеки включает более 20 000 фармацевтических,
          косметологических и медицинских изделий. Мы предлагаем низкие цены и
          выгодные условия, а также гарантируем качество представленных на сайте
          товаров.<br /><br />В интернет-аптеке работает круглосуточная
          консультация и служба доставки. Мы предлагаем удобную курьерскую
          доставку лекарств в г.Алматы и медикаментов до двери вашего дома или
          офиса в любое время суток.<br /><br />Операторы-фармацевты всегда
          готовы помочь Вам при выборе лекарственных препаратов, подберут аналог
          лекарства, сообщат о наличии препаратов в аптеках и уточнят цену. Если
          Вы хотите самостоятельно купить лекарственный препарат, операторы
          подскажут Вам ближайшую аптеку, где есть в наличии необходимый Вам
          препарат.<br />
        </p>
        <nuxt-link to="/about" class="more">
          Читать дальше
        </nuxt-link>
      </section>
      <section class="companies">
        <div class="logo-container">
          <img v-for="i in 7" :key="i" :src="require(`@/assets/img/logos/logo${i}.png`)" alt="">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerMain: require("@/assets/img/banner-main.png"),
      bannersSecondary: [
        require("@/assets/img/banner-secondary1.png"),
        require("@/assets/img/banner-secondary2.png")
      ],
      categories: [
        {
          categoryId: 1,
          image: "category3.png",
          name: "Лекарственные препараты"
        },
        {
          categoryId: 2,
          image: "category2.png",
          name: "Красота и уход"
        },
        {
          categoryId: 3,
          image: "category1.png",
          name: "Для мам и детей"
        }
      ],
      discountProducts: [],
      popularProducts: [],
    };
  },
  beforeMount() {
    this.$axios.$get('welcome').then(res => {
      this.popularProducts = res.items.data;
      this.discountProducts = res.items.data;
    }).catch(err => {
      console.error(err);
    });
  },
};
</script>

<style lang="scss" scoped>
.sale {
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
  img {
    width: 100%;
    border-radius: 12px;
  }
  & > div {
    border-radius: 12px;
  }
  .banner {
    &-main {
      width: 65%;
      box-shadow: 0px 4px 15px rgba(66, 76, 98, 0.15);
      img {
        height: 100%;
      }
    }
    &s-small {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
.discount-products {
  margin-bottom: 70px;
  h1.title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .products-container {
    display: flex;
    flex-wrap: wrap;
  }
  a.all-products-btn {
    display: flex;
    box-sizing: border-box;
    text-decoration: none;
    color: #fff;
    background: #05054b;
    border-radius: 100px;
    padding: 15px 80px;
    max-width: 30%;
    justify-content: center;
    margin: 0 auto;
  }
}
.about {
  margin-bottom: 50px;
  h1.title {
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 30px;
  }
  p {
    margin-bottom: 21px;
  }
  a.more {
    color: #3BDE15;
  }
}

.companies {
  margin-bottom: 50px;
  .logo-container {
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      max-height: 120px;
    }
  }
}
</style>
