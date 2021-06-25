<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="about-main">
        <h1 class="about-title">О компании</h1>
        <img :src="`https://melissa.a-lux.dev/storage/${aboutData.image}`" alt="">
        <div class="about-text" v-html="aboutData.body"></div>
      </div>
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
          title: 'О компании',
          url: '/about'
        }
      ],
    }
  },
  async asyncData({ $axios }) {
    let aboutData = await $axios.$get('/aboutUs');
    aboutData = aboutData.aboutUs[0];
    return { aboutData };
  }
}
</script>

<style lang="scss">
.about-main {
  margin-top: 24px;
  img {
    width: 100%;
  }
}
h1.about-title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}

.about-text {
  margin-top: 36px;
  margin-bottom: 96px;
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  h1 {
    font-size: 2.25rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1rem;
  }
}
</style>