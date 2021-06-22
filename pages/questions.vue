<template>
  <div class="page-inner">
    <div class="container">
      <LayoutBreadcrumbs
        :crumbs="breadcrumbs"
      />
      <div class="questions-main">
        <h1 class="title">Вопросы и ответы</h1>
        <div class="questions-container">
          <question-card v-for="question in questions" :key="question.id"
            :question="question.title"
            :answer="question.body"
          />
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
          title: 'Вопросы и ответы',
          url: '/questions'
        }
      ],
    }
  },
  async asyncData({ $axios }) {
    let questions = await $axios.$get('/questions');
    questions = questions.questions;
    return { questions };
  }
}
</script>

<style lang="scss" scoped>
.questions-main {
  margin-top: 24px;
  margin-bottom: 48px;
}
h1.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 24px;
}
.questions-container {
  display: flex;
  flex-wrap: wrap;
}
</style>