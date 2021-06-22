<template>
  <footer class="footer">
    <div class="container">
      <div class="main-block footer-block">
        <img src="@/assets/img/logo.svg" class="logo">
        <div class="socials">
          <a href="#"><img src="@/assets/icons/fb-socials.svg" alt=""></a>
          <a href="#"><img src="@/assets/icons/inst-socials.svg" alt=""></a>
          <a href="#"><img src="@/assets/icons/in-socials.svg" alt=""></a>
          <a href="#"><img src="@/assets/icons/tw-socials.svg" alt=""></a>
        </div>
        <span>© Melissa 2021</span>
      </div>
      <div class="info-block footer-block">
        <h2 class="footer-title">Информация</h2>
        <div class="links">
          <nuxt-link to="/">Новости</nuxt-link>
          <nuxt-link to="/about">О компании</nuxt-link>
          <nuxt-link to="/">Контакты</nuxt-link>
          <nuxt-link to="/vacancies">Карьера</nuxt-link>
          <nuxt-link to="/">Партнеры</nuxt-link>
        </div>
      </div>
      <div class="customer-block footer-block">
        <h2 class="footer-title">Покупателю</h2>
        <div class="links">
          <nuxt-link to="/delivery">Доставка и оплата</nuxt-link>
          <nuxt-link to="/howto">Как сделать заказ</nuxt-link>
          <nuxt-link to="/questions">Вопросы и ответы</nuxt-link>
          <nuxt-link to="/">Контроль качества</nuxt-link>
          <nuxt-link to="/">Блог</nuxt-link>
        </div>
      </div>
      <div class="documents-block footer-block">
        <h2 class="footer-title">Документы</h2>
        <div class="links">
          <nuxt-link to="/">Политика конфиденциальности</nuxt-link>
          <nuxt-link to="/">Договор публичной оферты о предоставлении услуг</nuxt-link>
          <nuxt-link to="/">Условия возврата и обмена</nuxt-link>
        </div>
      </div>
      <div class="contacts-block footer-block">
        <h2 class="footer-title">Контакты</h2>
        <div class="links">
          <a href="tel:+77273122220">+7 (727) 312 22 20</a>
          <a href="mailto:order@melissa.kz">order@melissa.kz</a>
          <span>Режим работы 24/7</span>
          <a href="tel:+77272938543">+7 (727) 293 85 43</a>
          <a href="tel:+77272910888">+7 (727) 291 08 88</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
footer.footer {
  padding: 50px 0 70px 0;
  background: #05054B;
  color: #fff;
}

footer.footer .container{
  display: flex;
  justify-content: space-between;
  .footer-block {
    display: flex;
    flex-direction: column;
    img.logo {
      margin-bottom: 12px;
    }
    .socials {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    span {
      font-size: 14px;
    }
    .footer-title {
      margin-bottom: 18px;
      font-weight: 700;
      font-size: 20px;
    }
    .links {
      display: flex;
      flex-direction: column;
      max-width: 230px;
      a, span {
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>