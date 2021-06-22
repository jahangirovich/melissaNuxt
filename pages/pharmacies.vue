<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="pharmacies-main">
        <h1 class="title">Аптеки</h1>
        <div class="pharmacies-container">
          <div class="pharmacies-block" v-for="address in addresses" :key="address.id">
            <div class="pharmacies-line">
              <span class="title">Телефон:</span>
              <a class="value" :href="`tel:${address.phone_number}`">{{address.phone_number}}</a>
            </div>
            <div class="pharmacies-line">
              <span class="title">Адрес:</span>
              <span class="value">{{ address.address }}</span>
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
          title: 'Аптеки',
          url: '/pharmacies'
        }
      ],
    }
  },
  async asyncData({ $axios }) {
    let addresses = await $axios.$get('/company-addresses');
    addresses = addresses.addresses;
    return { addresses };
  }
}
</script>

<style lang="scss" scoped>
.pharmacies-main {
  margin-top: 24px;
  margin-bottom: 48px;
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}
.pharmacies-container {
  display: flex;
  flex-wrap: wrap;
}

.pharmacies-block {
  margin-bottom: 18px;
}

.pharmacies-line {
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