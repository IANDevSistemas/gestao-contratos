<template>
  <section>

    <crud-table-filter v-model="filter" />
    <crud-table-actions @add="$refs.modal.open()" />

    <vuetable ref="table" :http-fetch="httpFetch" :fields="table.fields" :css="table.css" pagination-path="">
      <template slot="actions" slot-scope="props">
        <q-toolbar color="primary" inverted>
          <q-btn round small flat icon="mode_edit" @click="onAction('edit', props.rowData, props.rowIndex)" />
          <q-btn round small flat icon="delete_forever" @click="onAction('delete', props.rowData, props.rowIndex)" />
        </q-toolbar>
      </template>
    </vuetable>

    <q-modal ref="modal" :content-css="{ minWidth: '800px', minHeight: '100vh' }">
      <q-modal-layout>
        <q-toolbar slot="header">
          <div class="q-toolbar-title">Adicionar Valores</div>
          <q-btn flat @click="$refs.modal.close()">
            <q-icon name="close" />
          </q-btn>
        </q-toolbar>

        <add :idcontrato="contrato.id" />
      </q-modal-layout>
    </q-modal>
  </section>
</template>

<script>
import CrudTableActions from "@/abstract/crud/table/Actions"
import CrudTableFilter from "./Filter"
import Add from "./Add"
import { Dialog } from "quasar"
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import isNumber from "lodash/isNumber"
import kebabCase from "lodash/kebabCase"
import moment from "moment"
import numeral from "numeral"
import merge from "lodash/merge"
import qs from "qs"
import service from "service/contratoValor"

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
      table: {
        fields: [
          { name: "situacao", sortField: "situacao", title: "Situação", callback: "situacaoFormatter" },
          { name: "datareferenciainicial", sortField: "datareferenciainicial", title: "Ref. Inicio", callback: "dateFormatter" },
          { name: "datareferenciafinal", sortField: "datareferenciafinal", title: "Ref. Fim", callback: "dateFormatter" },
          { name: "valor", sortField: "valor", title: "Valor", dataClass: "text-right" },
          { name: "datavencimento", sortField: "datavencimento", title: "Vencimento", callback: "dateFormatter" },
          { name: "valorpago", sortField: "valorpago", title: "Valor Pago", dataClass: "text-right" },
          { name: "datapagamento", sortField: "datapagamento", title: "Data Pagamento", callback: "dateFormatter" },
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
      // console.log(action, item, index)
      const query = {
        action: "execFunction",
        apelido: "GESTAOCONTRATOS-service-contrato-documento-arquivo",
        contentDisposition: "inline",
        id: item.id
      }

      switch (action) {
        case "edit":
          this.$router.push({ name: "contrato.valor.edit", params: { id: item.id } })
          break
        case "delete":
          Dialog.create({
            title: "Deletar",
            message: "Deletar o valor ?",
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
