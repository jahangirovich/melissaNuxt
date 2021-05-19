<template>
  <div class="verify-form">
    <h1 class="form-title">Подтверждение номера</h1>
    <label for="verify-code">
      <span>6-и значный код из СМС</span>
      <input type="number" id="verify-code" v-model="verifyCode">
    </label>
    <div class="send-code-btn" @click="verify">Отправить код</div>
    <span class="resend-time" v-if="timeToResend">Вы сможете повторно запросить код через {{timeToResend}} с.</span>
    <a class="resend-time" href="#" v-else @click.prevent="resendCode">Отправить код еще раз</a>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      verifyCode: '',
      timeToResend: 70,
    }
  },
  beforeMount() {
    let resendTime = setInterval(() => {
      this.timeToResend -= 1;
      if (this.timeToResend === 0) clearInterval(resendTime);
    }, 1000);
  },
  methods: {
    verify() {
      this.$axios.$post('/verify/phone', {
        code: this.verifyCode,
        user_id: this.$route.query.user_id,
      }).then(res => {
        this.$cookies.set('auth-token', res.token);
        this.$router.push(`/cabinet`);
      }).catch(err => {
        console.error(err)
      });
    },
    resendCode() {
      this.$axios.$post('/verification-resend', {
        phone_number: this.$route.query.phone,
      }).then(res => {
        let resendTime = setInterval(() => {
          this.timeToResend -= 1;
          if (this.timeToResend === 0) clearInterval(resendTime);
        }, 1000);
      }).catch(err => {
        console.error(err)
      })
    }
  },
  middleware({ redirect, route }){
    if(typeof route.query.user_id === 'undefined') {
      redirect('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.verify-form {
  box-sizing: border-box;
  width: 500px;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 140px;
  display: flex;
  flex-direction: column;
  padding: 36px;
  background: #fff;
  border-radius: 12px;
  h1.form-title {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
  }
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    span {
      font-size: 14px;
      margin-bottom: 6px;
    }
    input {
      border: 1px solid #E3E4E8;
      font-size: 14px;
      padding: 12px 18px;
      outline: none;
      border-radius: 6px;
      &[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
  .send-code-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 84px;
    background: #05054B;
    color: #fff;
    border-radius: 40px;
    cursor: pointer;
    margin-bottom: 12px;
  }
  .resend-time {
    margin-top: 12px;
    font-size: 14px;
    text-align: center;
  }
}
</style>