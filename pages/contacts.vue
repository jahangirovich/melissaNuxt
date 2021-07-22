<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="contacts-main">
        <h1 class="title">Контакты</h1>
        <div class="contacts-container">
          <div class="contact-block" v-for="contact in contacts" :key="contact.id">
            <div class="contact-line">
              <span class="title">Телефон:</span>
              <a class="value" :href="`tel:${contact.phone_number}`">{{contact.phone_number}}</a>
            </div>
            <div class="contact-line">
              <span class="title">Адрес:</span>
              <span class="value">{{ contact.address }}</span>
            </div>
            <div class="contact-line">
              <span class="title">Город:</span>
              <span class="value">{{ contact.city }}</span>
            </div>
          </div>
        </div>
        <h1 class="title">Адреса Аптек</h1>
        <div class="address-container">
          <div class="address-names">
            <div class="addres-item">
              <span>Райымбека 239г</span>
              <span>Тел.:227-32-56</span>
            </div>
          </div>
          <div class="address-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.371326861119!2d76.8974696154852!3d43.26459597913646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883695f43c6fcbf%3A0xd6cd7ac6840f70df!2sRayimbek%20Ave%20239%20%D0%93%2C%20Almaty%20050000!5e0!3m2!1sen!2skz!4v1626838283131!5m2!1sen!2skz" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: 'Контакты',
          url: '/questions'
        }
      ],
    }
  },
  async asyncData({ $axios }) {
    let contacts = await $axios.$get('/contacts');
    contacts = contacts.contacts;
    console.log(contacts);
    return { contacts };
  }
}
</script>

<style lang="scss" scoped>
.contacts-main {
  margin-top: 24px;
  margin-bottom: 48px;
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}
.contacts-container {
  display: flex;
  flex-wrap: wrap;
}
.address-container{
  flex-direction: column;
}

.address-map{
  margin-top: 20px;
}

.contact-block {
  margin-bottom: 18px;
}

.contact-line {
  margin-bottom: 6px;
  .title {
    font-weight: 500;
  }
  .value {
    text-decoration: none;
    color: #3F414E;
  }
}
</style>