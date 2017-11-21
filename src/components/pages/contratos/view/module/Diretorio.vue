<template>
  <q-card :color="color" @click="$emit('click', $data)" @dblclick="$emit('dblclick', $data)">
    <q-card-main>
      <q-icon :name="model.favorito === 'S' ? 'fa-star-o' : 'fa-folder-o'" />
      <span>{{model.descricao}}</span>
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  props: ["model", "color"]
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-icon
  background-color $white
  border-radius 100%
  color $secondary
  display inline-block
  font-size 1.2em
  height 32px
  padding 0 4px
  position relative
  width 32px

  &::before
    font-size 20px
    left 7px
    position absolute
    top 6px

.q-card-container
  padding 10px

span
  cursor default
  display inline-block
  font-size 1em
  overflow hidden
  padding 0 2px
  text-overflow ellipsis
  vertical-align middle
  white-space nowrap
  width calc(100% - 38px)
</style>

