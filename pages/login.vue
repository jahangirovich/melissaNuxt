<template>
  <div class="login-form">
    <h1 class="form-title">Вход</h1>
    <h2 class="error-title" v-if="error">{{error}}</h2>
    <label for="phone" id="phone-label" :class="{'has-error': errorPhone}">
      <span>Мобильный телефон</span>
      <span class="error-text" v-if="errorPhone">Проверьте правильность введенного номера</span>
      <input type="text" class="phone_input" id="phone" placeholder="+7 (7xx) xxx-xx-xx" @blur="errorPhone = false">
    </label>
    <label for="password" id="password-label" :class="{'has-error': errorPassword}">
      <span>Пароль</span>
      <span class="error-text" v-if="errorPassword">Пароль должен быть больше 8 символов, меньше 40</span>
      <input type="password" id="password" placeholder="********" v-model="password" @blur="errorPassword = false">
    </label>
    <div class="auth-actions">
      <div class="btn-login" @click="auth">Войти</div>
      <a href="/forgot" class="forgot">Забыли пароль?</a>
    </div>
    <span class="register">Еще нет аккаунта? <nuxt-link to="/register">Зарегистрироваться</nuxt-link></span>
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
      errorPhone: false,
      errorPassword: false,
      error: null
    }
  },

  layout: 'login',
  middleware({ $cookies, redirect }) {
    if($cookies.get('auth-token')) {
      redirect('/cabinet')
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
    validate() {
      const phone = /^\+?77([0124567][0-8]\d{7})$/
      const password = /[\S\w\d]{8,40}/
      phone.test(this.phone) ? this.errorPhone = false : this.errorPhone = true;
      password.test(this.password) ? this.errorPassword = false : this.errorPassword = true;
      return (phone.test(this.phone) && password.test(this.password))
    },
    auth() {
      if (this.validate()) {
        this.error = null;
        this.$axios.$post('/login', {
          phone_number: this.phone,
          password: this.password,
        }).then((res) => {
            this.$cookies.set('auth-token', res.token);
            this.$router.push(`/cabinet`);
        }).catch((err) => {
          // this.$router.push(`/verify?user_id=${err.response.data.user_id}&phone=${err.response.data.phone_number}`);
          if (err.response.status == 422 || err.response.status == 418) {
            this.error = "Неверный номер телефона или пароль";
          } else {
            this.error = "Ошибка сервера, попробуйте позже";
          }
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.login-form {
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
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
  h2.error-title {
    color: #ff2626;
    text-align: center;
    margin-bottom: 12px;
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
    justify-content: space-between;
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
  span.register {
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
  }
}

.error-text {
  color: #ff2626;
}
.login-form .has-error {
  span {
    color: #ff2626;
  }
  input {
    border-color: #ff2626;
  }
}

@media screen and (max-width: 992px){
  .login-form .auth-actions .btn-login {
    padding: 12px 60px;
  }
}
</style>