<template>
  <svg class="icon"
       aria-hidden="true"
       :style="{ width: size + 'px', height: size + 'px', color: color }">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
import '../assets/iconfont.js'
export default {
  name: 'SvgIcon',

  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: '24'
    },
    color: {
      type: String,
      default: 'inherit'
    }
  }
}
</script>

<style lang="scss">
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transition: 0.3s;
  &.opt {
    cursor: pointer;
  }
  &.active {
    color: #00b2f8 !important;
  }
  &.disable {
    color: #909399 !important;
  }
  &.danger {
    color: #fe694a !important;
  }
  &.h-primary:hover {
    color: #00b2f8 !important;
  }
  &.h-danger:hover {
    color: #fe694a !important;
  }
}
</style>
