<template>
  <div class="question-card" :class="{ opened: isOpened }">
    <div class="title" @click="isOpened = !isOpened">
      <span>{{ question }}</span>
      <img src="~/assets/icons/question-chevron-down.svg" alt="">
    </div>
    <transition name="answer">
      <div class="answer" v-if="isOpened">
        {{ answer }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpened: false,
    }
  },
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.question-card {
  width: 30%;
  margin-right: 24px;
  margin-bottom: 24px;
  img {
    transition: transform .3s;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    font-weight: 500;
    cursor: pointer;
  }
  .answer {
    padding: 12px;
    transform-origin: top;
  }
  &.opened {
    img {
      transform: rotate(180deg);
    }
  }
}
</style>