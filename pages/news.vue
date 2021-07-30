<template>
  <div class="container">
    <LayoutBreadcrumbs
                :crumbs="breadcrumbs"
            />
    <div class="news">
      <h1 class="title">Контакты</h1>
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
      <section class="news">
        <div v-for="(obj, i) in news" :key="i">
          <h2>{{ obj.title }}</h2>
          <p v-html="obj.body">
          </p>
          <a href="">Читать дальше</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
          {
              title: 'Главная',
              url: '/',
          },
          {
              title: 'Контакты',
              url: '/questions'
          }
      ],
      bannerMain: require("@/assets/img/banner-main.png"),
      bannersSecondary: [
        require("@/assets/img/banner-secondary1.png"),
        require("@/assets/img/banner-secondary2.png")
      ],
      news: []
    }
  },
  created(){
    this.$axios.get('/news').then(res => {
      this.news = res.data.news.data;
    })
  }
}
</script>

<style scoped lang="scss">
.news{
  margin-top: 24px;
  margin-bottom: 48px;
  &>div{
    h2{
      margin: 33px 0;
      font-style: normal;
      font-weight: bold;
      font-size: 28px;
      line-height: 33px;
    }
    &>a{
      margin-top: 30px;
      display: inline-block;
      color: #3BDE15
    }
  }
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}
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
</style>