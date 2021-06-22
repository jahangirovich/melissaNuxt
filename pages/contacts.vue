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