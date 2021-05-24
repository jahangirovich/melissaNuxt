<template>
  <div class="product-page">
    <div class="container">
      <layout-breadcrumbs class="product-breadcrumbs"/>
      <div class="page-main">
        <div class="product-main-info">
          <slick
            class="slick-container-nav"
            ref="slick"
            :options="navSlickOptions"
          >
            <img class="slide" src="https://images.unsplash.com/photo-1535043205849-513fe27db33e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHllbGxvd3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            <img class="slide" src="https://images.unsplash.com/photo-1595392029711-8a206145f976?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVkJTIwYmFja2dyb3VuZHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            <img class="slide" src="https://images.unsplash.com/photo-1601923926156-014f6a9767d2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQwfHxncmVlbiUyMGJhY2tncm91bmR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            <img class="slide" src="https://images.unsplash.com/photo-1595391595051-1ec0194535dc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ymx1ZSUyMGJhY2tncm91bmR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            <img class="slide" src="https://images.unsplash.com/photo-1527275393322-8ddae8bd5de9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="">
          </slick>
          <slick
            class="slick-container-main"
            ref="slick"
            :options="mainSlickOptions"
          >
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1535043205849-513fe27db33e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHllbGxvd3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1595392029711-8a206145f976?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVkJTIwYmFja2dyb3VuZHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1601923926156-014f6a9767d2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQwfHxncmVlbiUyMGJhY2tncm91bmR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1595391595051-1ec0194535dc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ymx1ZSUyMGJhY2tncm91bmR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="">
            </div>
            <div class="slide">
              <img src="https://images.unsplash.com/photo-1527275393322-8ddae8bd5de9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="">
            </div>
          </slick>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';

export default {
  components: {
    Slick
  },
  data() {
    return {
      navSlickOptions: {
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 4,
        arrows: false,
        waitForAnimate: false,
        asNavFor: '.slick-container-main',
      },
      mainSlickOptions: {
        asNavFor: '.slick-container-nav',
        slidesToShow: 1,
        arrows: false,
        waitForAnimate: false,
      }
    }
  }
}
</script>

<style lang="scss">
.product-breadcrumbs {
  margin-bottom: 36px;
}

.product-main-info {
  display: flex;
}

.slick-container-nav {
  width: 75px;
  margin-right: 30px;
}

.slick-container-main {
  width: 50%;
}

.slick-slide {
  div {
    width: 100%;
  }
}

.slick-container-main .slide {
  height: 400px;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>