<template>
  <div class="topbar">
    <div class="container mobile-only">
      <div class="searchbar">
        <div class="search search-mobile">
          <input type="text" placeholder="Поиск лекарств">
        </div>
      </div>
      <div class="phone-numbers mobile-only">
        <a href="tel:+77272938543">+7 (727) 293 85 43</a>
        <a href="tel:+77272910888">+7 (727) 291 08 88</a>
      </div>
    </div>
    <div class="container">
      <nuxt-link to="/catalog" class="catalog" @click="catalogsActive(false, true)" @mouseenter.native="catalogsActive(true)" @mouseleave.native="catalogsActive(false)">
        <img src="@/assets/icons/catalog-icon.svg" alt="">
        <span>Каталог товаров</span>
        <layout-top-catalogs
          class="catalog-list"
          :isActive="isCatalogsActive"
          :setActiveStatus="catalogsActive"
        />
      </nuxt-link>
      <div class="search desktop-only">
        <input type="text" placeholder="Поиск лекарств">
      </div>
      <div class="phones desktop-only">
        <img src="@/assets/icons/phone.svg" alt="">
        <div class="numbers">
          <a href="tel:+77272938543">+7 (727) 293 85 43</a>
          <a href="tel:+77272910888">+7 (727) 291 08 88</a>
        </div>
      </div>
      <nuxt-link to="/cart" class="cart">
        <img src="@/assets/icons/cart.svg" alt="">
        <div v-if="productCount" class="cart-counter">{{ productCount }}</div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      cartCount: 3,
      isCatalogsActive: false,
      catalogsTimeout: null,
    }
  },
  computed: {
    ...mapState('cart', ['products']),
    productCount() {
      let count = 0;
      this.products.forEach(product => { count += product.count })
      return count;
    }
  },
  methods: {
    catalogsActive(isActive, isInstant = false) {
      if (isActive) {
        clearTimeout(this.catalogsTimeout);
        this.isCatalogsActive = true;
      } else {
        if (!isInstant) {
          this.catalogsTimeout = setTimeout(() => {
            this.isCatalogsActive = false;
          }, 500);
        } else {
          this.isCatalogsActive = false;
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.topbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar {
  background: #fff;
  margin-bottom: 30px;
  padding: 20px 0;
}

.catalog {
  display: flex;
  position: relative;
  flex: auto 0 0;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #3F414E;
  img {
    margin-right: 12px;
  }
}

.search {
  position: relative;
  input {
    border: 1px solid #DEE0E4;
    border-radius: 100px;
    color: #3F414E;
    font-size: 14px;
    outline: none;
    padding: 12px 28px;
    width: 650px;
    &::placeholder {
      color: #A1A4B2;
    }
  }
  &::after {
    position: absolute;
    content: '';
    width: 18px;
    height: 18px;
    background-image: url('@/assets/icons/search.svg');
    top: 12px;
    right: 28px;
    cursor: pointer;
  }
}

.phones {
  display: flex;
  align-items: center;
  flex: auto 0 0;
  img {
    width: 27px;
    height: 27px;
    margin-right: 6px;
  }
  .numbers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    a {
      font-size: 18px;
      color: #05054B;
      text-decoration: none;
      margin-bottom: 3px;
    }
  }
}
.cart {
  display: flex;
  flex: auto 0 0;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  border: 2px solid #05054B;
  cursor: pointer;
  &-counter {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #3BDE15;
    font-weight: 500;
    color: #fff;
  }
}

// Adaptive

@media screen and (max-width: 992px){
  .searchbar {
    width: 100%;
    margin-bottom: 12px;
    input {
      box-sizing: border-box;
      width: 100%;
    }
  }

  .container.mobile-only {
    margin-bottom: 12px;
    flex-direction: column;
    .phone-numbers {
      display: flex;
      width: 100%;
      justify-content: space-between;
      a {
        font-size: 14px;
        color: #05054B;
        text-decoration: none;
        margin-bottom: 3px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .search:not(.search-mobile) input {
    width: 450px;
  }
}

</style>