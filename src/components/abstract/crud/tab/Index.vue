<template>
  <transition name="fade">
    <div v-show="isShowing">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["isShowing"]
}
</script>

<style lang="stylus" scoped>
.fade-enter-active
  transition opacity 0.25s ease-out

.fade-leave-active
  transition opacity 0

.fade-enter, .fade-leave-to
  opacity 0
</style>

  