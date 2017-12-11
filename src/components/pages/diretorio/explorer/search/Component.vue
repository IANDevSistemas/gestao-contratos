<template>
  <form>
    <h6>Vencimento</h6>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-6">
        <label>Data Inicial</label>
      </div>
      <div class="col-xs-12 col-sm-6">
        <label>Data Final</label>
      </div>
    </div>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-3">
        <!-- Min Data Inicial -->
        <q-field>
          <q-datetime v-model="value.mindatainicial" float-label="Maior que" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Max Data Inicial -->
        <q-field>
          <q-datetime v-model="value.maxdatainicial" float-label="Menor que" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Min Data Final -->
        <q-field>
          <q-datetime v-model="value.mindatafinal" float-label="Maior que" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Max Data Final -->
        <q-field>
          <q-datetime v-model="value.maxdatafinal" float-label="Menor que" />
        </q-field>
      </div>
    </div>

    <h6>Renovação</h6>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-6">
        <!-- Data Inicial -->
        <q-field>
          <q-datetime v-model="value.datainicial" float-label="Data Inicial" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6">
        <!-- Data Final -->
        <q-field>
          <q-datetime v-model="value.datafinal" float-label="Data Final" />
        </q-field>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>
