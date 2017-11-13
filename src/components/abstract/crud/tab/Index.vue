<template>
  <div>
    <!-- <transition name="fade"> -->
    <slot v-if="isShowing"></slot>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  props: ["isShowing"]
}
</script>

<style lang="stylus">
.fade-enter-active
  transition all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53)

.fade-leave-active
  transition all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)

.fade-enter, .transition-leave-to
  opacity 0
  transform scaleY(0) translateZ(0)
</style>


  