<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="howto-main">
        <h1 class="title">Как сделать заказ</h1>
        <div class="howto-stages">
          <div class="stage1 stage">
            <img src="~/assets/icons/howto-auth.svg" alt="">
            <div class="stage-title">Авторизоваться</div>
          </div>
          <div class="stage2 stage">
            <img src="~/assets/icons/howto-list.svg" alt="">
            <div class="stage-title">Выбрать необходимые товары</div>
          </div>
          <div class="stage3 stage">
            <img src="~/assets/icons/howto-order.svg" alt="">
            <div class="stage-title">Оформить заказ</div>
          </div>
        </div>
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
          title: 'Как сделать заказ',
          url: '/howto'
        }
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.howto-main {
  margin-top: 24px;
  margin-bottom: 48px;
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 120px;
}
.howto-stages {
  display: flex;
  .stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    img {
      margin-bottom: 24px;
      height: 72px;
      width: 72px;
    }
    .stage-title {
      font-weight: 500;
    }
  }
}
</style>