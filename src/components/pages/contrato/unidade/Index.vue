<template>
  <section>
    <crud-table-filter v-model="filter" />
    <q-card-actions>
      <q-btn @click="$router.go(-1)" small flat round color="primary" icon="arrow_back">
        <q-tooltip>Voltar</q-tooltip>
      </q-btn>
    </q-card-actions>
    <vuetable ref="table" :http-fetch="httpFetch" :fields="fields" :query-params="{ size: 'size', page:'page', perPage: 'size' }" :class="{ 'bordered': true, 'striped': true, 'highlight': true, 'responsive': true, 'q-table': true }" pagination-path="">
      <template slot="actions" slot-scope="props">
        <q-toolbar class="compact" inverted>
          <q-spinner v-show="props.rowData.isSaving" />
          <q-btn v-if="!props.rowData.isSaving && props.rowData.id && props.rowData.situacao == 'A'" small icon="delete_forever" color="negative" @click="onAction('remove', props.rowData, props.rowIndex)">
            <q-tooltip>Remover</q-tooltip>
          </q-btn>
          <q-btn v-else small icon="add" color="positive" @click="onAction('add', props.rowData, props.rowIndex)">
            <q-tooltip>Adicionar</q-tooltip>
          </q-btn>
        </q-toolbar>
      </template>
    </vuetable>
  </section>
</template>

<script>
import CrudTableFilter from "./Filter"
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import merge from "lodash/merge"
import service from "service/contratoUnidade"

export default {
  components: {
    CrudTableFilter,
    Vuetable
  },
  data() {
    return {
      baseURL,
      contrato: {},
      filter: {},
      fields: [{ name: "__slot:actions", title: "", width: "110px" }, { name: "empresaunidade.text", sortField: "empresaunidade", title: "Unidade" }]
    }
  },
  methods: {
    onAction(action, item, index) {
      const promisse = item.id ? service.put : service.post

      switch (action) {
        case "add":
          item.situacao = "A"
          break
        case "remove":
          item.situacao = "I"
          break
        default:
          throw new Error(`Invalid Action: ${action}`)
      }

      promisse({ id: item.id, model: JSON.stringify(item) })
        .then(({ data }) => {
          this.refresh()
        })
        .catch(error => {
          this.refresh()
          console.error(error)
        })
    },
    refresh() {
      this.$refs.table.refresh()
    },
    httpFetch(url, options) {
      const args = merge({}, { params: { ...this.filter, idcontrato: this.contrato.id } }, options)
      return service.get(args)
    },

    // Formatters
    situacaoFormatter(value) {
      return ["Ativo", "Inativo", "Pago"]["AIP".indexOf(value)]
    }
  },
  created() {
    const { id } = this.$route.params
    this.contrato = { id }
  },
  watch: {
    filter() {
      this.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  margin auto
  max-width 1000px

table
  width 100%

.q-toolbar
  min-height 0
  padding 0

iframe
  border none
  min-height calc(100vh - 40px)
  width 100%
</style>
