<template>
  <section>
    <crud-table-filter v-model="filter" />
    <crud-table-actions @add="$router.push({ path: '/contrato/protocolo/0' })" />
    <vuetable ref="table" :http-fetch="httpFetch" :fields="fields" :query-params="{ perPage: 'size' }" :css="{ 'bordered': true, 'striped': true, 'highlight': true, 'responsive': true, 'q-table': true }" pagination-path="">
      <template slot="actions" slot-scope="props">
        <q-toolbar color="primary" inverted>
          <q-btn round small flat icon="mode_edit" @click="$router.push({ path: `/contrato/protocolo/${item.id}` })" />
        </q-toolbar>
      </template>
    </vuetable>
  </section>
</template>

<script>
import CrudTableActions from "@/abstract/crud/table/Actions"
import CrudTableFilter from "./Filter"
import { Dialog } from "quasar"
import Vuetable from "vuetable-2"
import kebabCase from "lodash/kebabCase"
import merge from "lodash/merge"
import moment from "moment"
import service from "service/contratoResponsavel"

export default {
  components: {
    CrudTableActions,
    CrudTableFilter,
    Vuetable
  },
  data() {
    return {
      contrato: {},
      filter: {},
      fields: [
        { name: "datainclusao", sortField: "datainclusao", title: "Data", callback: "dateFormatter" },
        { name: "descritivo", sortField: "descritivo", title: "Descritivo" },
        { name: "protocolo", sortField: "protocolo", title: "Protocolo" },
        { name: "datalembrete", sortField: "datalembrete", title: "Data Lembrete", callback: "dateFormatter" },
        {
          name: "situacao",
          sortField: "situacao",
          title: "Situação",
          callback(value) {
            return ["Pendente", "Resolvido"]["PR".indexOf(value)]
          }
        },
        { name: "__slot:actions", title: "", width: "110px" }
      ]
    }
  },
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    httpFetch(url, options) {
      const args = merge({}, { params: { ...this.filter, idcontrato: this.contrato.id } }, options)
      return service.get(args)
    },

    // Formatters
    dateFormatter(value) {
      const date = moment(value)
      return date.isValid() ? date.format("DD/MM/YYYY") : ""
    },
    situacaoFormatter(value) {
      return ["Pendente", "Resolvido"]["PR".indexOf(value)]
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
</style>