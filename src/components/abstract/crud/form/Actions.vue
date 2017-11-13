<template>
  <div>
    <q-btn @click="$emit('back', $data)" round color="primary" icon="arrow_back" />
    <q-btn @click="$emit('clear', $data)" round color="primary" icon="clear" />
    <q-btn @click="$emit('save', $data)" round color="primary" icon="save" />
  </div>
</template>
<script>
export default {}
</script>

<style lang="stylus" scoped>
</style>

