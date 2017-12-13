<template>
  <section>
    <h6>{{value.descricao}}</h6>
    <table>
      <tr>
        <td>
          <label>Nº</label>
        </td>
        <td>{{value.numero}}</td>
      </tr>
      <tr>
        <td>
          <label>Início</label>
        </td>
        <td>{{value.datainicial | date}}</td>
      </tr>
      <tr>
        <td>
          <label>Fim</label>
        </td>
        <td>{{value.datafinal | date}}</td>
      </tr>
      <tr>
        <td>
          <label>Renovação</label>
        </td>
        <td>{{value.dataproximarenovacao | date}}</td>
      </tr>
    </table>
    <h6>Objeto</h6>
    <div colspan="2" v-html="value.objetocontrato"></div>
  </section>
</template>

<script>
export default {
  props: ["value"]
}
</script>

<style lang="stylus" scoped>
</style>


