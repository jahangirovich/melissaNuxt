<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
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
          title: 'Корзина',
          url: '/cart'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>