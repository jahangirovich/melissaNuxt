<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="delivery-main">
        <h1 class="title">Доставка и оплата</h1>
        <div class="delivery-text" v-html="deliveryData.body"></div>
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
          title: 'Доставка и оплата',
          url: '/delivery'
        }
      ],
    }
  },
  async asyncData({ $axios }) {
    let deliveryData = await $axios.$get('/delivery');
    deliveryData = deliveryData.delivery[0];
    return {deliveryData}
  }
}
</script>

<style lang="scss" scoped>
.delivery-main {
  margin-top: 24px;
  margin-bottom: 48px;
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}
</style>