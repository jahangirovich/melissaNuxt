<template>
  
</template>

<script>
export default {
  middleware({ $cookies, redirect }) {
    if(!$cookies.get('auth-token')) {
      redirect('/login')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>