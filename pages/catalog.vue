<template>
  <div class="catalog-page">
    <div class="container">
      <layout-breadcrumbs :crumbs="breadcrumbs" class="product-breadcrumbs" />
      <div class="page-main">
        <h1 class="title" v-if="category">{{ category.name }}</h1>
        <h1 class="title" v-else>Каталог</h1>
        <div class="page-content">
          <aside class="catalog-aside desktop-only">
            <div class="categories-block">
              <div class="category" v-for="(cat, index) in categories" :key="index" :class="{active: $route.query.category == cat.integration_id}">
                <span @click="changeCategory(cat.integration_id)">{{cat.name}}</span>
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
                  :tooltip="false"
                  :max="price.max"
                  :range="price.range"
                  @slide-end="slideEnd"
                  @drag-end="dragEnd"
                  @drag-start="dragStart"
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
                    :min="price.min" :max="price.max" :placeholder="price.min" v-model="price.range[0]"
                    @change="inputValueChanged">
                </label>
                <label for="price_max">
                  <span>до</span>
                  <input type="number" name="price_max" id="price_max" v-model="price.range[1]"
                    :min="price.min" :max="price.max" :placeholder="price.max"
                    @change="inputValueChanged">
                </label>
              </div>
            </div>
            <div class="filters-block">
              <h1 class="block-title">Фильтры</h1>
              <div class="filters">
                <label for="in_stock">
                  <input type="checkbox" name="in_stock" id="in_stock" v-model="filtersCheckbox.stock">
                  <span class="checkbox-el"></span>
                  <span>В наличии</span>
                </label>
                <label for="discount">
                  <input type="checkbox" name="discount" id="discount" v-model="filtersCheckbox.discount">
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
                :name="product.full_name"
                :price="+product.price"
                :oldPrice="product.oldPrice || null"
                :discount="product.discount || null"
                :productId="product.id"
                :isFavorite="product.isFavorite || null"
                :image="product.images ? `https://melissa.a-lux.dev/storage/${JSON.parse(product.images)[0]}` : null"
              />
            </div>
            <catalog-paginator
              :currentPage="paginator.currentPage"
              :lastPage="paginator.lastPage"
              :updateProducts="updateProducts"
              :categoryId="paginator.categoryId ? paginator.categoryId : 0"
              :price="price.range"
            />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-range-component/dist/vue-range-slider.css';
import VueRangeSlider from 'vue-range-component'

export default {
  data() {
    return {
      categories: [],
      price: {
        range: [0, 50000],
        min: 0,
        max: 50000,
      },
      products: [],
      paginator: {
        lastPage: 1,
        currentPage: 1,
      },
      filtersCheckbox: {
        discount: false,
        stock: false
      },
      dragging: false
    }
  },
  components: {
    VueRangeSlider
  },
  watch:{
    filtersCheckbox : {
      handler: function (e) {
        const obj = {
          catalogId: this.category ? this.category.integration_id : 0,
          page: this.$route.query.page || 1,
          params: {
            min: this.minPrice,
            max: this.maxPrice
          }
        };
        let clonnedObj = null;
        if(e['stock']){
          clonnedObj = {...obj, params: {
            ...obj.params,
            stock: e['stock']
          }}
          this.updateProducts(
            clonnedObj
          )
        }
        else{
          clonnedObj = {...obj}
          this.updateProducts(
            clonnedObj
          )
        }
        if(e['discount']){
          clonnedObj = {...obj, params: {
            ...clonnedObj.params,
            discount: e['discount']
          }}
          this.updateProducts(
            clonnedObj
          )
        }
      },
      deep: true
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
      if (this.category?.integration_id) {
        crumbs.push({title: this.category.name, url: '/catalog?category=' + this.category.integration_id})
      }
      return crumbs;
    },
    category() {
      return this.categories?.find(cat => cat.integration_id == this.$route.query.category) || false;
    },
    minPrice(){
      this.price.range[0] = this.$route.query.min ? parseInt(this.$route.query.min) : 0;
      return this.price.range[0];
    },
    maxPrice() {
      this.price.range[1] = this.$route.query.max ? parseInt(this.$route.query.max) : 50000;
      return this.price.range[1];
    },
    page() {
      return this.$route.query.page ? +this.$route.query.page : 1;
    }
  },
  async beforeMount() {
    await this.$axios.$get('catalogs-subCatalogs').then(res => {
      this.categories = res.catalogs;
    });
    this.price.range = [this.minPrice, this.maxPrice]
    this.filtersCheckbox = {
      stock : this.$route.query.available,
      discount: this.$route.query.discount
    }
    if(this.category) {
      this.updateProducts(
        {
          catalogId: this.category.integration_id, 
          page: this.$route.query.page || 1, 
          params: 
            {
              min: this.minPrice,
              max: this.maxPrice
            }
        }
      );
    } else {
      this.updateProducts(
        {
          catalogId : 0, 
          page: this.$route.query.page || 1
        }
      );
    }
  },
  methods: {
    dragEnd(e){
      
      if(this.$route.query.category == 0) return;
      const target = e.$attrs.range;
      this.dragging = false;

      this.updateProducts(
        {
          catalogId : this.category ? this.category.integration_id : 0, 
          page: this.$route.query.page || 1,
          params: {
            min: parseInt(target[0]),
            max: parseInt(target[1])
          }
        }
      )
    },
    dragStart(e){
      if(this.$route.query.category == 0) return;
      this.dragging = true;
    },
    slideEnd(e){
      if(this.dragging || this.$route.query.category == 0) return;
      this.updateProducts(
        {
          catalogId : this.category ? this.category.integration_id : 0, 
          page : this.$route.query.page || 1,
          params: {
            min: parseInt(e[0]),
            max: parseInt(e[1])
          }
        }
      )
    },
    updateProducts({catalogId, page = 1, params=undefined}) {
      let strUrl = '';
      let queryObj = {
        page,
        category: catalogId,
        min: parseInt(params ? params['min'] : 0),
        max: parseInt(params ? params['max'] : 0)
      }

      if(params['stock']) queryObj = {...queryObj, available: params['stock']};
      if(params['discount']) queryObj = {...queryObj, discount: params['discount']};

      this.paginator.categoryId = catalogId;

      this.$router.push({
        query: queryObj
      });
      if(!catalogId && params == undefined) {
        strUrl = `welcome?page=${page}`;
      }
      else{
        strUrl = `filter/${catalogId}/price?max=${params.max}&min=${params.min}&page=${page}${params['stock'] ? `&available=${params['stock']}` : ""}${params['discount'] ? `&discount=${params['discount']}`: ""}`
      } 
      this.$axios.$get(strUrl).then(res => {
          this.products = res.items.data;
          this.paginator.currentPage = res.items.current_page;
          this.paginator.lastPage = res.items.last_page;
        }).catch(err => {
          throw err;
        });
    },
    changeCategory(categoryId) {
      if (this.category.integration_id == categoryId) return;
      this.$router.push({query: {category: categoryId}});
      this.updateProducts(
        {
          catalogId : categoryId,
          page: this.$route.query.page || 1,
          params:  {
            min: parseInt(this.price.range[0]),
            max: parseInt(this.price.range[1])
          }
        }
      );
    },
    inputValueChanged(e){
      let curObj = {
        catalogId : this.category ? this.category.integration_id : 0, 
        page : this.$route.query.page || 1,
        params: {
          min: parseInt(this.price.range[0]),
          max: parseInt(this.price.range[1])
        }
      }
      if(this.$route.query.available) curObj = {...curObj, params: {
        ...curObj.params,
        available: this.$route.query.available
      }}
      if(this.$route.query.discount) curObj = {...curObj, params :{
        ...curObj.params,
        discount: this.$route.query.discount
      }}
      this.updateProducts(
        curObj
      )
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
    span {
      cursor: pointer;
    }
    svg {
      cursor: pointer;
      transform: none;
      transition: transform .3s;
      flex: 12px 0 0;
    }
    &.active {
      color: #3BDE15;
      // svg {
      //   transform: rotate(180deg);
      // }
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

@media screen and (max-width: 992px) {
  .catalog-main {
    .products-container {
      justify-content: space-between;
    }
  }
}
</style>