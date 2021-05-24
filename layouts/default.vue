<template>
  <div>
    <layout-header />
    <layout-top-bar />
    <Nuxt class="layout-content"/>
    <layout-footer />
  </div>
</template>

<style lang="scss" scoped>
.layout-content {
  min-height: 75vh;
}
</style>
