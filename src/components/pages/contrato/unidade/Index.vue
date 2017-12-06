<template>
  <section>
    <crud-table-filter v-model="filter" />
    <vuetable ref="table" :http-fetch="httpFetch" :fields="table.fields" :css="table.css" pagination-path="">
      <template slot="actions" slot-scope="props">
        <q-toolbar v-if="!props.rowData.id" class="compact" inverted>
          <q-spinner v-show="props.rowData.isSaving" />
          <q-btn v-show="!props.rowData.isSaving && props.rowData.id" round small flat icon="delete_forever" @click="onAction('remove', props.rowData, props.rowIndex)">
            <q-tooltip>Remover</q-tooltip>
          </q-btn>
          <q-btn v-show="!props.rowData.isSaving && !props.rowData.id" round small flat icon="add" @click="onAction('add', props.rowData, props.rowIndex)">
            <q-tooltip>Adicionar</q-tooltip>
          </q-btn>
        </q-toolbar>
      </template>
    </vuetable>

  </section>
</template>

<script>
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import kebabCase from "lodash/kebabCase"
import merge from "lodash/merge"
import qs from "qs"
import service from "service/contratoUnidade"

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      baseURL,
      contrato: {},
      filter: {},
      table: {
        fields: [
          { name: "empresaunidade.text", sortField: "empresaunidade", title: "Unidade" },
          { name: "situacao", sortField: "situacao", title: "Situação", callback: "situacaoFormatter" },
          { name: "__slot:actions", title: "", width: "110px" }
        ],
        css: {
          tableClass: {
            bordered: true,
            striped: true,
            highlight: true,
            responsive: true,
            [kebabCase("qTable")]: true
          }
        }
      }
    }
  },
  methods: {
    onAction(action, item, index) {
      switch (action) {
        case "add":
          service
            .post({ params: { model: qs.stringfy(item) } })
            .then(response => {
              this.refresh()
            })
            .catch(error => {
              this.refresh()
              // TODO add some message
              console.error(error)
            })
          break
        case "delete":
          service
            .delete({ params: { id: item.id } })
            .then(response => {
              this.refresh()
            })
            .catch(error => {
              this.refresh()
              // TODO add some message
              console.error(error)
            })
          break
      }
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
