<template>
  <q-btn class="component" icon="folder" @click="$emit('input', !value)" :color="value ? 'primary' : 'secondary'">
    <span class="label">{{model.descricao}}</span>
  </q-btn>
</template>

<script>
export default {
  props: ["model", "value"]
}
</script>

<style lang="stylus" scoped>
.component
  width 100%

  .label
    margin 0
    width 100%
</style>
