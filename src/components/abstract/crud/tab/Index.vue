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
</style>


  