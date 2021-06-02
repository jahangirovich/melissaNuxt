<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
        class="breadcrumbs"
      />
      <h1 class="title">Личный кабинет</h1>
      <div class="cabinet-main">
        <aside></aside>
        <main></main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware({ $cookies, redirect }) {
    if(!$cookies.get('auth-token')) {
      redirect('/login')
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: 'Личный кабинет',
          url: '/cabinet'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-bottom: 36px;
}

h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}

.cabinet-main {
  display: flex;
}
</style>