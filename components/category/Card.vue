<template>
  <nuxt-link class="category-card" :to="`/category/${categoryId}`">
    <img :src="require(`@/assets/img/${image}`)" :alt="name">
    <!-- При прикручивании бэкенда require заменить на ссылку -->
    <h2 class="category-name">
      {{ name }}
    </h2>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.category-card {
  display: block;
  position: relative;
  height: 240px;
  width: 33%;
  margin-right: 20px;
  border-radius: 12px;
  transition: box-shadow .5s;
  img {
    width: 100%;
    height: 240px;
  }
  &:hover {
    box-shadow: 0px 0 7px 2px rgba(48,48,48,0.2);
    -webkit-box-shadow: 0px 0 7px 2px rgba(48,48,48,0.2);
  }
}
h2.category-name {
  position: absolute;
  top: 24px;
  left: 24px;
  color: #3F414E;
  font-weight: 600;
  font-size: 26px;
  width: 60%;
}
</style>