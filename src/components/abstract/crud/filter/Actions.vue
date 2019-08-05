<template>
  <div class="actions">
    <q-btn flat small round @click.stop="$emit('filter')" color="primary" icon="filter_list" />
    <q-btn flat small round @click.stop="$emit('clear')" color="primary" icon="clear" />
  </div>
</template>
<script>
export default {}
</script>

<style lang="stylus" scoped>
.actions
  align-items center
  display flex
  height 100%
  justify-content center
</style>