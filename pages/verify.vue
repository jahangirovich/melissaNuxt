<template>
  <div>
    <input type="text" v-model="verifyCode">
    <button @click="verify">Отправить</button>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      verifyCode: ''
    }
  },
  beforeMount() {
    this.$axios.$get(`/verification-send/${this.$route.query.user_id}/${this.$route.query.phone}`)
      .then((res) => {
        console.info(res);
      }).catch((err) => {
        console.error(err);
      })
  },
  methods: {
    verify() {
      this.$axios.$post('/verify/phone', {
        code: this.verifyCode,
        user_id: this.$route.query.user_id,
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>