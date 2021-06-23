<template>
  <header class="header">
    <div class="container">
      <div class="header-main">
        <nuxt-link to="/" class="logo-container">
          <img src="@/assets/img/logo.svg" alt="" class="logo">
        </nuxt-link>
        <nav class="navbar">
          <ol>
            <li>
              <img src="@/assets/icons/pin.svg" class="pin-icon">
              <span>Алматы</span>
            </li>
            <li><nuxt-link to="/about">О нас</nuxt-link></li>
            <li><nuxt-link to="/pharmacies">Аптеки</nuxt-link></li>
            <li><nuxt-link to="/contacts">Контакты</nuxt-link></li>
          </ol>
        </nav>
      </div>
      <div class="actions-btn">
        <nuxt-link to="/cabinet" class="cabinet">
          <img src="@/assets/icons/user.svg" alt="" class="user-icon">
          <span>Личный кабинет</span>
        </nuxt-link>
        <div class="lang-picker">
          <div class="picker-main">
            <span>Ru</span>
            <img src="@/assets/icons/chevron-down.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  color: #3F414E;
  text-decoration: none;
}

header.header {
  height: 95px;
  border-bottom: 1px solid #DEE0E4;
  background: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.header-main {
  display: flex;
  align-items: center;
  .logo-container {
    margin-right: 60px;
  }
  nav {
    width: 400px;
    ol {
      display: flex;
      justify-content: space-between;
    }
  }
  nav ol li {
    display: flex;
    align-items: center;
  }
  img.pin-icon {
    margin-right: 6px;
  }
}

.actions-btn {
  display: flex;
  align-items: center;
  .cabinet {
    display: flex;
    align-items: center;
    margin-right: 18px;
    img {
      margin-right: 6px;
    }
    span {
      color: #3BDE15;
    }
  }
  .lang-picker {
    .picker-main {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    img {
      margin-left: 6px;
    }
  }
}

@media screen and (max-width: 992px){
  .navbar {
    display: none;
  }
}
</style>