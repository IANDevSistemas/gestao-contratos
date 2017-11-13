<template>
  <div>
    <q-btn @click="$emit('filter', $data)" round color="primary" icon="filter_list" />
    <q-btn @click="$emit('clear', $data)" round color="primary" icon="clear" />
  </div>
</template>
<script>
export default {}
</script>

<style lang="stylus" scoped>
</style>

