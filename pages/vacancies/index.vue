<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="vacancies-main">
        <h1 class="title">Карьера</h1>
        <div class="vacancies-description">На вакантные должности требуются сотрудники:</div>
        <div class="vacancies-container">
          <nuxt-link :to="`/vacancies/${vacancy.id}`" class="vacancy-card" v-for="vacancy in vacancies" :key="vacancy.id">
            <div class="vacancy-title">{{vacancy.title}}</div>
            <div class="vacancy-salary">{{vacancy.price}}</div>
          </nuxt-link>
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
          title: 'Карьера',
          url: '/vacancies'
        }
      ],
    }
  },
  async asyncData({ $axios }) {
    let vacancies = await $axios.$get('/jobs');
    vacancies = vacancies.jobs;
    return { vacancies };
  },
}
</script>

<style lang="scss" scoped>
.vacancies-main {
  margin-top: 24px;
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}
.vacancies-description {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
}
.vacancies-container {
  display: flex;
  flex-wrap: wrap;
}

.vacancy-card {
  width: 30%;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 18px;
  border: 1px solid #DEE0E4;
  border-radius: 12px;
  text-decoration: none;
  color: #3F414E;
  .vacancy-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .vacancy-salary {
    font-size: 14px;
    color: #838383;
  }
}
</style>