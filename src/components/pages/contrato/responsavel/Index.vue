<template>
  <section>

    <crud-table-filter v-model="filter" />
    <crud-table-actions @add="$refs.modal.open()" />

    <vuetable ref="table" :http-fetch="httpFetch" :fields="fields" :query-params="{ size: 'size', page:'page', perPage: 'size' }" :class="{ 'bordered': true, 'striped': true, 'highlight': true, 'responsive': true, 'q-table': true }" pagination-path="">
      <template slot="actions" slot-scope="props">
        <q-toolbar color="primary" inverted>
          <q-btn round small flat icon="mode_edit" @click="onAction('edit', props.rowData, props.rowIndex)" />
          <q-btn round small flat icon="delete_forever" @click="onAction('delete', props.rowData, props.rowIndex)" />
        </q-toolbar>
      </template>
    </vuetable>

    <q-modal ref="modal" @close="refresh()" :content-css="{ minWidth: '1000px', minHeight: '100vh' }">
      <q-modal-layout>
        <q-toolbar slot="header">
          <div class="q-toolbar-title">Adicionar Responsáveis</div>
          <q-btn flat @click="$refs.modal.close()">
            <q-icon name="close" />
          </q-btn>
        </q-toolbar>
        <add :idcontrato="contrato.id" />
      </q-modal-layout>
    </q-modal>
    <crud-form-modal ref="modal" />
  </section>
</template>

<script>
import Add from "./Add"
import CrudTableActions from "@/abstract/crud/table/Actions"
import CrudTableFilter from "./Filter"
import { Dialog } from "quasar"
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import merge from "lodash/merge"
import moment from "moment"
import service from "service/contratoResponsavel"

export default {
  components: {
    Add,
    CrudTableActions,
    CrudTableFilter,
    Vuetable
  },
  data() {
    return {
      baseURL,
      contrato: {},
      filter: {},
      fields: [
        { name: "pessoa.text", sortField: "pessoa", title: "Pessoa" },
        { name: "funcao", sortField: "funcao", title: "Função" },
        { name: "tiporesponsavelcontrato.text", sortField: "tiporesponsavelcontrato", title: "Tipo Responsável" },
        { name: "__slot:actions", title: "", width: "110px" }
      ]
    }
  },
  methods: {
    onAction(action, item, index) {
      switch (action) {
        case "edit":
          this.$router.push({ path: `/contrato/responsavel/${item.id}` })
          break
        case "delete":
          Dialog.create({
            title: "Deletar",
            message: "Deletar o responsável ?",
            buttons: [
              {
                label: "Não",
                color: "primary",
                flat: true
              },
              {
                label: "Sim",
                raised: true,
                color: "negative",
                handler: () => {
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
                }
              }
            ]
          })
          break
        default:
          console.error(new Error("Invalid action"))
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
    dateFormatter(value) {
      const date = moment(value)
      return date.isValid() ? date.format("DD/MM/YYYY") : ""
    },
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
