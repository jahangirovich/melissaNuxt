<template>
  <dl class="info-line">
    <dt><span>{{ title }}</span></dt>
    <dd>{{ value }}</dd>
  </dl>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      requred: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.info-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  position: relative;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  dt {
    position: relative;
    padding-right: 5px;
    span {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 500;
    }
    &::after {
      content: '';
      position: absolute;
      left: 100%;
      bottom: 2px;
      width: 340px;
      border-bottom: 1px dotted #A1A4B2;
    }
  }
  dd {
    display: block;
    padding-left: 5px;
    background: #F5F5F9;
    z-index: 2;
  }
}
</style>