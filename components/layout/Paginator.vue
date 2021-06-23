<template>
  <div class="paginator">
    <div class="prev-page"></div>
    <!-- pages here -->
    <div class="next-page"></div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>

</style>