<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="vacancy-main">
        <h1 class="title">{{ currentVacancy.title }}</h1>
        <div class="vacancy-description" v-html="currentVacancy.body"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vacancies: [
        {
          id: 1,
          title: 'Челиксон',
          price: 'от 140 000 до 250 000 KZT на руки',
        },
        {
          id: 2,
          title: 'Челиксон2',
          price: 'от 140 000 до 250 000 KZT на руки',
        },
        {
          id: 3,
          title: 'Челиксон3',
          price: 'от 140 000 до 250 000 KZT на руки',
        },
        {
          id: 4,
          title: 'Челиксон4',
          price: 'от 140 000 до 250 000 KZT на руки',
        }
      ]
    }
  },
  async asyncData({ $axios }) {
    let vacancies = await $axios.$get('/jobs');
    vacancies = vacancies.jobs;
    return { vacancies };
  },
  computed: {
    currentVacancy() {
      return this.vacancies.find(vacancy => vacancy.id == this.$route.params.id);
    },
    breadcrumbs() {
      let breadcrumbs = [
        {
          title: 'Главная',
          url: '/',
        },
        {
          title: 'Карьера',
          url: '/vacancies'
        }
      ];
      breadcrumbs.push({
        title: this.currentVacancy.title,
        url: `/vacancies/${this.currentVacancy.id}`
      });
      return breadcrumbs;
    }
  }
}
</script>

<style lang="scss" scoped>
.vacancy-main {
  margin-top: 24px;
  margin-bottom: 48px;
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