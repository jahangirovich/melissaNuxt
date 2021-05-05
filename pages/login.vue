<template>
  <div class="login-form">
    <h1 class="form-title">Вход</h1>
    <label for="phone">
      <span>Мобильный телефон</span>
      <input type="text" class="phone_input" placeholder="+7 (7xx) xxx-xx-xx">
    </label>
    <label for="password">
      <span>Пароль</span>
      <input type="password" id="password">
    </label>
  </div>
</template>

<script>
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.kz';

export default {

  mounted() {
    let phoneNumber = new Cleave('.phone_input', {
      blocks: [2, 3, 3, 2, 2],
      delimiters: [' (', ') ', '-', '-', '-'],
      prefix: '+7',
      noImmediatePrefix: true,
      onValueChanged: (e) => {
        console.log(e.target.rawValue.slice(1, e.target.rawValue.length))
      }
    });
  }

}
</script>

<style lang="scss" scoped>
.login-form {
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
    }
  }
}
</style>