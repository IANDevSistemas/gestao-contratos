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

    <div class="actions">
      <q-btn flat color="primary" @click="$router.push({ name: 'contrato', params: { id: value.id } })" class="full-width">
        Editar
      </q-btn>
      <q-btn flat color="primary" @click="$router.push({ name: 'contrato.documento', params: { id: value.id } })" class="full-width">
        Documentos
      </q-btn>
      <q-btn flat color="primary" @click="$router.push({ name: 'contrato.valor', params: { id: value.id } })" class="full-width">
        Valores
      </q-btn>
      <q-btn flat color="primary" @click="$router.push({ name: 'contrato.unidade', params: { id: value.id } })" class="full-width">
        Unidades
      </q-btn>
      <q-btn flat color="primary" @click="$router.push({ name: 'contrato.responsavel', params: { id: value.id } })" class="full-width">
        Responsáveis
      </q-btn>
      <q-btn flat color="primary" @click="$router.push({ name: 'contrato.protocolo', params: { id: value.id } })" class="full-width">
        Protocolos
      </q-btn>
    </div>

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
.actions
  margin-bottom 12px
  margin-top 12px
</style>


