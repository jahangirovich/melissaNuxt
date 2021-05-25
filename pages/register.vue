<template>
  <div class="register-form">
    <h1 class="form-title">Регистрация</h1>
    <label for="name" id="name-label" :class="{'has-error': errorName }">
      <span>ФИО</span>
      <span class="error-text" v-if="errorName">Имя не может быть пустым</span>
      <input type="text" class="name-input" id="name" placeholder="ФИО" v-model="name"  @blur="errorName = false">
    </label>
    <label for="phone" id="phone-label" :class="{'has-error': errorPhone}">
      <span>Мобильный телефон</span>
      <span class="error-text" v-if="errorPhone">Проверьте правильность введенного номера</span>
      <input type="text" class="phone_input" id="phone" placeholder="+7 (7xx) xxx-xx-xx"  @blur="errorPhone = false">
    </label>
    <label for="password" id="password-label" :class="{'has-error': errorPassword}">
      <span>Пароль</span>
      <span class="error-text" v-if="errorPassword">Пароль должен быть больше 8 символов, меньше 40</span>
      <input type="password" id="password" placeholder="********" v-model="password"  @blur="errorPassword = false">
    </label>
    <div class="auth-actions">
      <div class="btn-login" @click="auth">Зарегистрироваться</div>
    </div>
    <span class="login">Уже есть аккаунт? <nuxt-link to="/login">Войти</nuxt-link></span>
  </div>
</template>

<script>
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.kz';

export default {
  data() {
    return {
      phone: '',
      password: '',
      name: '',
      errorPassword: false,
      errorPhone: false,
      errorName: false
    }
  },
  layout: 'login',
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
    validate() {
      const phone = /^\+?77([0124567][0-8]\d{7})$/;
      const password = /[\S\w\d]{8,40}/;
      this.name.trim() !== '' ? this.errorName = false : this.errorName = true;
      phone.test(this.phone) ? this.errorPhone = false : this.errorPhone = true;
      password.test(this.password) ? this.errorPassword = false : this.errorPassword = true;
      return (phone.test(this.phone) && password.test(this.password) && this.name.trim() !== '')
    },
    async auth() {
      if (this.validate()) {
        this.$axios.$post('/register', {
          name: this.name,
          phone_number: this.phone,
          password: this.password,
        }).then((res) => {
          this.$router.push(`/verify?user_id=${res.user.id}`)
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-form {
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
    }
  }
  .auth-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    .btn-login {
      padding: 12px 84px;
      background: #05054B;
      color: #fff;
      border-radius: 40px;
      cursor: pointer;
    }
  }
  span.login {
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
  }
}
.error-text {
  color: #ff2626;
}
.register-form .has-error {
  span {
    color: #ff2626;
  }
  input {
    border-color: #ff2626;
  }
}
</style>