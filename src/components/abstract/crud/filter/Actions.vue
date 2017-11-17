<template>
  <div class="actions">
    <q-btn flat small round @click="$emit('filter', $data)" color="primary" icon="filter_list" />
    <q-btn flat small round @click="$emit('clear', $data)" color="primary" icon="clear" />
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

