<template>
  <div class="layout-default">
    <layout-header />
    <layout-top-bar />
    <Nuxt class="layout-content"/>
    <layout-footer />
  </div>
</template>

<style lang="scss">
.layout-content {
  min-height: 75vh;
}
.layout-default {
  background: #fff;
}
</style>
