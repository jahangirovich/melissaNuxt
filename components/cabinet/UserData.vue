<template>
  <main class="user-data">
    <div class="private-info cabinet-block">
      <h2 class="block-title">Личная информация</h2>
      <div class="block-inner">
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">ФИО</div>
            <div class="user-data-text">Балдеж Приколдесович</div>
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Телефон</div>
            <div class="user-data-text">+77088308418</div>
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Дата рождения</div>
            <div class="user-data-text">02.02.2002</div>
          </div>
          <div class="user-dataline">
            <div class="user-data-label">Почта</div>
            <div class="user-data-text">test@gmail.com</div>
          </div>
        </div>
        <div class="inner-column-30">
          <div class="user-dataline">
            <div class="user-data-label">Пол</div>
            <div class="user-data-text">Мужской</div>
          </div>
          <div class="user-dataline">
            <div class="user-data-label"></div>
            <div class="user-data-text"></div>
          </div>
        </div>
      </div>
      <svg class="block-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17V20H7L16 11L13 8L4 17Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 6L18 9L20.5 6.5L17.5 3.5L15 6Z" stroke="#A1A4B2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="ads-discounts cabinet-block">
      <h2 class="block-title">Реклама и акции</h2>
      <div class="block-inner">
        <div class="inner-column-40">
          <label for="email">
            <input type="checkbox" name="email" id="email">
            <span class="title">Эл. почта</span>
            <div class="switch"></div>
          </label>
        </div>
        <div class="inner-column-40">
          <label for="push">
            <input type="checkbox" name="push" id="push">
            <span class="title">Эл. почта</span>
            <div class="switch"></div>
          </label>
        </div>
      </div>
    </div>
    <div class="addresses cabinet-block">
      <h2 class="block-title">Адреса</h2>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.block-inner {
  display: flex;
}
.inner-column-30 {
  width: 30%;
}
.inner-column-40 {
  width: 40%;
}
.user-dataline {
  font-size: 14px;
  &:not(:last-child) {
    margin-bottom: 36px;
  }
}
.user-data-label {
  color: #A1A4B2;
  margin-bottom: 6px;
}
.block-edit {
  position: absolute;
  cursor: pointer;
  right: 24px;
  top: 24px;
}

.ads-discounts {
  .block-inner {
    justify-content: space-between;
  }
}

.inner-column-40 {
  label {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .switch {
      position: relative;
      width: 36px;
      height: 20px;
      border-radius: 10px;
      background: #A1A4B2;
      transition: all .3s;
      &::after {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        background: #fff;
        left: 1px;
        top: 1px;
        border-radius: 50%;
      }
    }
    input:checked ~ .switch{
      background: #3BDE15;
      &::after {
        left: auto;
        right: 1px;
      }
    }
  }
  input[type=checkbox] {
    display: none;
  }
}
</style>