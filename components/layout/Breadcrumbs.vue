<template>
  <div class="breadcrumbs">
    <nuxt-link
      class="crumb"
      v-for="(crumb, index) in crumbs.slice(0, crumbs.length-1)"
      :key="index"
      :to="crumb.url"
    >
      {{ crumb.title.length >= 27 ? crumb.title.slice(0, 27) + '...' : crumb.title }}
      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10.5L8 6.5L4 2.5" stroke="#3BDE15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </nuxt-link>
    <span class="crumb-active">
      {{ crumbs[crumbs.length-1].title.length >= 27 ? crumbs[crumbs.length-1].title.slice(0, 27) + '...' : crumbs[crumbs.length-1].title }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      crumbs: [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Каталог',
          url: '/catalog/'
        },
        {
          title: 'Лекарственные средства',
          url: '/catalog/?category=1'
        },
        {
          title: 'Фервекс №8 пак Комплекс',
          url: '/product/1'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  .crumb {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #3BDE15;
    svg {
      margin-right: 3px;
      margin-left: 3px;
    }
  }
}
</style>