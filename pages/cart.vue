<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="cart-main">
        <div class="table">
          <div class="table-header">
            <div class="image"></div>
            <div class="title">Товар</div>
            <div class="count centered">Количество</div>
            <div class="price centered">Стоимость</div>
            <div class="total centered">Итог</div>
            <div class="remove"></div>
          </div>
          <div class="table-data-line">
            <div class="image">бля</div>
            <div class="title">бля</div>
            <div class="count centered">бля</div>
            <div class="price centered">бля</div>
            <div class="total centered">бля</div>
            <div class="remove">бля</div>
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
          title: 'Корзина',
          url: '/cart'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-main {
  margin-top: 24px;
}
.table-header {
  display: grid;
  grid-template-columns: 1fr 6fr 2fr 2fr 2fr 1fr;
  border-bottom: 1px solid #DEE0DE;
  div {
    padding: 12px 0;
    color: #A1A4B2;
    font-size: 14px;
  }
  .centered {
    text-align: center;
  }
}
.table-data-line {
  display: grid;
  grid-template-columns: 1fr 6fr 2fr 2fr 2fr 1fr;
}
</style>