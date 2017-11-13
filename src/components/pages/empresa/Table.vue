<template>
  <span>
    Table
  </span>
</template>

<script>
import Table from "@/abstract/crud/table"
export default {
  extends: Table,
  // data() {
  //   return {}
  // },
  computed: {
    title() {
      return "Cadastro Empresa"
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
