<template>
  <div class="top-catalogs desktop-only" :class="{ 'is-active': isActive }">
    <div class="categories">
      <div class="catalogs-title">Каталог товаров</div>
      <nuxt-link @click.native="setActiveStatus(false, true)" :to="`/catalog?category=${category.integration_id}`" class="category" v-for="category in categories" :key="category.id">{{ category.name }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    setActiveStatus: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      categories: null,
    }
  },
  beforeMount() {
    this.$axios.$get('/catalogs-subCatalogs').then(res => {
      this.categories = res.catalogs;
    }).catch(err => {
      console.error(err);
    })
  }
}
</script>

<style lang="scss" scoped>
.top-catalogs {
  display: none;
  position: absolute;
  top: 100%;
  background: #fff;
  border: 1px solid #DEE0E4;
  padding: 12px;
  border-radius: 6px;
  cursor: default;
  &.is-active {
    display: flex;
  }
  z-index: 999;
}

.categories {
  width: 300px;
  background: #fff;
  border-radius: 6px;
  .category {
    display: block;
    color: #3F414E;
    text-decoration: none;
    padding: 4px 0;
    cursor: pointer;
  }
  .catalogs-title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 18px;
  }
}
</style>