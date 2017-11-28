<template>
  <q-card @click="$emit('click', $data)" @dblclick="$emit('dblclick', $data)">
    <q-card-main>
      <q-icon name="fa-plus" />
      <span>Novo</span>
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

.q-card
  background-color rgba(0, 0, 0, 0)
  border 1px $teal-4 dashed
  box-shadow none

  &:hover
    background-color $teal-4

.q-icon
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
    left 8px
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

