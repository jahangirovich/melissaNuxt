<template>
  <div class="forgot-form">
    <h1 class="form-title">Восстановление пароля</h1>
    <label for="forgot-number">
      <span>Номер телефона</span>
      <input type="tel" id="forgot-nunmber" class="phone_input">
    </label>
    <div class="send-code-btn" @click="requestCode">Запросить код</div>
  </div>
</template>

<script>
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.kz';

export default {
  data() {
    return {
      phone: ''
    }
  },
  mounted() {
    let phoneNumber = new Cleave('.phone_input', {
      prefix: '+7 7',
      noImmediatePrefix: true,
      phone: true,
      phoneRegionCode: 'kz',
      onValueChanged: (e) => {
        this.phone = e.target.rawValue.slice(1);
      }
    });
  },
  methods: {
    requestCode() {
      if(this.validate()){
        this.$axios.$post('/forgot-password', {
          phone_number: this.phone
        }).then(res => {
          this.$router.push(`/verify?user_id=${res.user_id}`)
        }).catch(err => {
          console.error(err)
        })
      }
    },
    validate() {
      const phone = /^\+?77([0124567][0-8]\d{7})$/;
      phone.test(this.phone) ? this.errorPhone = false : this.errorPhone = true;
      return phone.test(this.phone)
    }
  }
}
</script>

<style lang="scss" scoped>
.forgot-form {
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
}
</style>