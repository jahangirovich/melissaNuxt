<template>
  <div class="topbar">
    <div class="container">
      <div class="catalog">
        <img src="@/assets/icons/catalog-icon.svg" alt="">
        <span>Каталог товаров</span>
      </div>
      <div class="search">
        <input type="text" placeholder="Поиск лекарств">
      </div>
      <div class="phones">
        <img src="@/assets/icons/phone.svg" alt="">
        <div class="numbers">
          <a href="tel:+77272938543">+7 (727) 293 85 43</a>
          <a href="tel:+77272910888">+7 (727) 291 08 88</a>
        </div>
      </div>
      <nuxt-link to="/cart" class="cart">
        <img src="@/assets/icons/cart.svg" alt="">
        <div class="cart-counter">{{cartCount}}</div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartCount: 3,
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar .container {
  display: flex;
  justify-content: space-between;
}

.topbar {
  background: #fff;
  margin-bottom: 30px;
  padding: 20px 0;
}

.catalog {
  display: flex;
  align-items: center;
  cursor: pointer;
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
</style>