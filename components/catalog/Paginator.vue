<template>
  <div class="paginator">
    <div class="prev-page paginator-btn" @click="prev">&lt;</div>
    <div class="page paginator-btn" @click="setPage(1)" :class="{active: currentPage == 1}">1</div>
    <div class="dotted paginator-btn inactive" v-if="hasBeforeDots">...</div>
    <div class="page paginator-btn" @click="setPage(1 + 1)" :class="{active: currentPage == 1 + 1}" v-else>{{ 1 + 1 }}</div>
    <div class="page paginator-btn desktop-only" @click="setPage(page)" :class="{active: page == currentPage}" v-for="page in renderedPages" :key="`${page}`">{{ page }}</div>
    <div class="page paginator-btn mobile-only" @click="setPage(page)" :class="{active: page == currentPage}" v-for="page in renderedPagesMobile" :key="`${page}-mobile`">{{ page }}</div>
    <div class="dotted paginator-btn inactive" v-if="hasAfterDots">...</div>
    <div class="page paginator-btn" @click="setPage(lastPage - 1)" :class="{active: currentPage == lastPage - 1 }" v-else>{{ lastPage - 1 }}</div>
    <div class="page paginator-btn" @click="setPage(lastPage)" :class="{active: currentPage == lastPage}">{{lastPage}}</div>
    <div class="next-page paginator-btn active" @click="next">&gt;</div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
    updateProducts: {
      type: Function,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    }
  },
  methods: {
    prev() {
      this.updateProducts(this.categoryId, this.currentPage - 1 || 1)
    },
    next() {
      this.updateProducts(this.categoryId, this.currentPage + 1 > this.lastPage ? this.lastPage : this.currentPage + 1);
    },
    setPage(page) {
      this.updateProducts(this.categoryId, page);
      window.scrollTo(0, 0);
    }
  },
  computed: {
    renderedPages() {
      let rendered = [];
      let firstRendered = this.currentPage - 2 > 3 ? this.currentPage - 2 : 3;
      let lastRendered = this.currentPage + 2 < this.lastPage - 2 ? this.currentPage + 2 : this.lastPage - 2;

      for (let i = firstRendered; i < lastRendered+1; i++) {
        rendered.push(i);
      }
      return rendered;
    },
    renderedPagesMobile() {
      let rendered = [];
      let firstRendered = this.currentPage - 1 > 2 ? this.currentPage - 1 : 3;
      let lastRendered = this.currentPage + 1 < this.lastPage - 1 ? this.currentPage + 1 : this.lastPage - 1;

      for (let i = firstRendered; i < lastRendered+1; i++) {
        rendered.push(i);
      }
      return rendered;
    },
    hasBeforeDots() {
      return !(this.currentPage - 3 <= 2);
    },
    hasAfterDots() {
      return !(this.currentPage + 3 >= this.lastPage);
    }
  }
}
</script>

<style lang="scss" scoped>
.paginator {
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.paginator-btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  border: 1px solid #DEE0E4;
  border-radius: 3px;
  font-weight: 500;
  color: #A1A4B2;
  &:not(:last-child) {
    margin-right: 12px;
  }
  &.page {
    &.active {
      background: #3BDE15;
      color: #fff;
    }
  }
  &.prev-page, &.next-page {
    font-weight: 700;
    &.active {
      color: #3BDE15;
    }
  }
}
</style>