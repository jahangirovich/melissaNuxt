<template>
  <div class="catalog-page">
    <div class="container">
      <layout-breadcrumbs :crumbs="breadcrumbs" class="product-breadcrumbs" />
      <div class="page-main">
        <h1 class="title" v-if="category">{{ category.title }}</h1>
        <h1 class="title" v-else>Каталог</h1>
        <div class="page-content">
          <aside class="catalog-aside">
            <div class="categories-block">
              <div class="category" v-for="(cat, index) in categories" :key="index" :class="{active: $route.query.category == cat.id}">
                <span>{{cat.title}}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M2 4L6 8L10 4" stroke="#3BDE15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="price-block">
              <h1 class="block-title">Цена</h1>
              <client-only>
                <vue-range
                  ref="price-slider"
                  v-model="price.range"
                  :min="price.min"
                  :max="price.max"
                  :range="price.range"
                  :tooltip="false"
                  :enable-cross="false"
                  :bg-style="{ 'background-color' : '#E3E4E8' }"
                  :process-style="{ 'background-color': '#3BDE15' }"
                  :dot-style="{'background-color': '#3BDE15', 'box-shadow': 'none'}"
                />
              </client-only>
              <div class="inputs">
                <label for="price_min">
                  <span>от</span>
                  <input type="number" name="price_min" id="price_min"
                    :min="price.min" :max="price.max" :placeholder="price.min" v-model="price.range[0]">
                </label>
                <label for="price_max">
                  <span>до</span>
                  <input type="number" name="price_max" id="price_max" v-model="price.range[1]"
                    :min="price.min" :max="price.max" :placeholder="price.max">
                </label>
              </div>
            </div>
            <div class="filters-block">
              <h1 class="block-title">Фильтры</h1>
              <div class="filters">
                <label for="in_stock">
                  <input type="checkbox" name="in_stock" id="in_stock">
                  <span class="checkbox-el"></span>
                  <span>В наличии</span>
                </label>
                <label for="discount">
                  <input type="checkbox" name="discount" id="discount">
                  <span class="checkbox-el"></span>
                  <span>Акционный товар</span>
                </label>
              </div>
            </div>
          </aside>
          <main class="catalog-main">
            <div class="products-container">
              <product-card-vertical
                v-for="(product, index) in products"
                :key="index"
                :name="product.name"
                :price="product.price"
                :oldPrice="product.oldPrice"
                :discount="product.discount"
                :productId="product.productId"
                :isFavorite="product.isFavorite"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-range-component/dist/vue-range-slider.css';
export default {
  data() {
    return {
      category: {
        id: 1,
        title: 'Лекарственные средства',
      },
      categories: [
        {
          id: 1,
          title: 'Лекарственные средства'
        },
        {
          id: 2,
          title: 'Витамины и БАДы'
        },
        {
          id: 3,
          title: 'Изделия мед. назначения'
        },
        {
          id: 4,
          title: 'Мать и дитя'
        },
        {
          id: 5,
          title: 'Красота и гигиена'
        }
      ],
      price: {
        range: [0, 500],
        min: 0,
        max: 500,
      },
      products: [
        {
          name: "Фервекс №8 пак Комплекс",
          price: 1220,
          oldPrice: 1220,
          productId: 1,
          isFavorite: true,
          discount: "-20%"
        },
        {
          name: "Фервекс №8 пак Комплекс",
          price: 1220,
          productId: 2,
          discount: "-20%"
        },
        {
          name: "Фервекс №8 пак Комплекс",
          price: 1220,
          oldPrice: 1220,
          productId: 3,
          isFavorite: true
        },
        {
          name: "Фервекс №8 пак Комплекс",
          price: 1220,
          oldPrice: 1220,
          productId: 5,
          isFavorite: true,
          discount: "-500₸"
        },
        {
          name: "Фервекс №8 пак Комплекс",
          price: 1220,
          oldPrice: 1220,
          productId: 12
        }
      ],
      page: this.$route.query.page ? +this.$route.query.page : 1,
    }
  },
  computed: {
    breadcrumbs() {
      let crumbs = [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Каталог',
          url: '/catalog'
        },
      ]
      if (this.category?.id) {
        crumbs.push({title: this.category.title, url: '/catalog?category=' + this.category.id})
      }
      return crumbs;
    }
  },
}
</script>

<style lang="scss" scoped>
.product-breadcrumbs {
  margin-bottom: 36px;
}

h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}

.page-content {
  display: flex;
}

aside {
  width: 230px;
  min-width: 230px;
  margin-right: 16px;
  h1.block-title {
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 16px;
  }
}

.categories-block {
  padding: 24px 12px;
  border: 1px solid #DEE0E4;
  border-radius: 6px;
  margin-bottom: 24px;
  .category {
    display: flex;
    margin-bottom: 18px;
    font-size: 14px;
    justify-content: space-between;
    align-items: center;
    &.active {
      color: #3BDE15;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.price-block {
  padding: 18px 12px;
  border: 1px solid #DEE0E4;
  border-radius: 6px;
  margin-bottom: 24px;
  .inputs {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    label {
      display: flex;
      align-items: center;
      width: 45%;
      font-size: 13px;
      span {
        margin-right: 6px;
      }
      input {
        width: 100%;
        outline: none;
        padding: 8px 6px;
        border: 0.5px solid #E3E4E8;
        border-radius: 6px;
        font-size: 12px;
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

.filters-block {
  padding: 18px 12px;
  border: 1px solid #DEE0E4;
  border-radius: 6px;
  margin-bottom: 24px;
  label {
    display: flex;
    align-items: center;
    margin-left: 6px;
    margin-bottom: 12px;
    font-size: 14px;
    cursor: pointer;
    input[type=checkbox] {
      display: none;
      & ~ span.checkbox-el {
        position: relative;
        width: 16px;
        height: 16px;
        border: 1px solid #3BDE15;
        margin-right: 6px;
        border-radius: 3px;
      }
      &:checked ~ span.checkbox-el::after {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 2px;
        top: 4px;
        left: 4px;
        background: #3BDE15;
      }
    }
  }
}
.catalog-main {
  .products-container {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>