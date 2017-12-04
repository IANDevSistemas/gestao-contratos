<template>
  <section>
    <q-card>
      <q-card-title>
        {{`#${contrato.id} - ${contrato.descricao}`}}
      </q-card-title>
      <q-card-actions>
        <div class="col">
          <q-btn @click="$router.go(-1)" small flat round color="primary" icon="arrow_back">
            <q-tooltip>Voltar</q-tooltip>
          </q-btn>
        </div>
        <div class="col">
          <div class="row justify-end">
            <div class="col-2 justify-end">
              <q-btn round icon="add" color="primary" @click="$refs.modalAdd.open()">
                <q-tooltip>Adicionar</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-actions>
      <vuetable ref="table" :http-fetch="httpFetch" :fields="table.fields" :css="table.css" pagination-path="">
        <template slot="actions" slot-scope="props">
          <q-toolbar color="primary" inverted>
            <q-btn round small flat icon="remove_red_eye" @click="onAction('view', props.rowData, props.rowIndex)" />
            <q-btn round small flat icon="cloud_download" @click="onAction('download', props.rowData, props.rowIndex)" />
            <!-- <q-btn round small flat icon="mode_edit" @click="onAction('edit', props.rowData, props.rowIndex)" /> -->
            <q-btn round small flat icon="delete_forever" @click="onAction('delete', props.rowData, props.rowIndex)" />
          </q-toolbar>
        </template>
      </vuetable>
    </q-card>

    <q-modal ref="modalAdd" :content-css="{ minWidth: '800px', minHeight: '100vh' }">
      <q-modal-layout>
        <q-toolbar slot="header">
          <div class="q-toolbar-title">Adicionar Valores</div>
          <q-btn flat @click="$refs.modalAdd.close()">
            <q-icon name="close" />
          </q-btn>
        </q-toolbar>

        <add-form :idcontrato="contrato.id" />
      </q-modal-layout>
    </q-modal>

    <q-modal ref="modalPay">
      <q-btn color="primary" label="Close" />
    </q-modal>
  </section>
</template>

<script>
import AddForm from "./AddForm"
import { Dialog } from "quasar"
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import isNumber from "lodash/isNumber"
import kebabCase from "lodash/kebabCase"
import moment from "moment"
import numeral from "numeral"
import merge from "lodash/merge"
import qs from "qs"
import services from "service/all"

const service = services.contratoValor

export default {
  components: {
    AddForm,
    Vuetable
  },
  data() {
    return {
      baseURL,
      contrato: {},
      table: {
        fields: [
          { name: "situacao", sortField: "situacao", title: "Situação", callback: "situacaoFormatter" },
          { name: "datareferenciainicial", sortField: "datareferenciainicial", title: "Ref. Inicio", callback: "dateFormatter" },
          { name: "datareferenciafinal", sortField: "datareferenciafinal", title: "Ref. Fim", callback: "dateFormatter" },
          { name: "valor", sortField: "valor", title: "Valor", callback: "numberFormatter" },
          { name: "datavencimento", sortField: "datavencimento", title: "Vencimento", callback: "dateFormatter" },
          { name: "valorpago", sortField: "valorpago", title: "Valor Pago", callback: "numberFormatter" },
          { name: "datapagamento", sortField: "datapagamento", title: "Data Pagamento", callback: "dateFormatter" },
          { name: "__slot:actions", title: "", width: "160px" }
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
      console.log(action, item, index)
      const query = {
        action: "execFunction",
        apelido: "GESTAOCONTRATOS-service-contrato-documento-arquivo",
        contentDisposition: "inline",
        id: item.id
      }

      switch (action) {
        case "view":
          Dialog.create({
            title: "Pagar",
            message: "Gravar o pagamento do valor",
            form: {
              valorpago: { type: "text", label: "Valor Pago", model: item.valor, money: {} },
              datapagamento: { type: "date", label: "Data Pagamento" }
            },
            buttons: [
              "Cancelar",
              {
                label: "Pagar",
                handler(data) {
                  Toast.create("Returned " + JSON.stringify(data))
                }
              }
            ]
          })

          break

        case "delete":
          Dialog.create({
            title: "Deletar",
            message: "Deletar o arquivo ?",
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
      const args = merge(
        {},
        {
          params: {
            action: "execTarefa",
            apelido: "GESTAOCONTRATOS-service-contrato-valor-adicionar",
            idcontrato: this.contrato.id || 0
          },
          options
        }
      )
      // console.log(self.filter, args, options)
      return service.get(args)
    },
    urlFactory(file) {
      const { baseURL } = this
      return new Promise((resolve, reject) => {
        const query = {
          action: "execTarefa",
          apelido: "GESTAOCONTRATOS-service-contrato-documento-arquivo-upload",
          tKey: "",
          idcontrato: this.contrato.id,
          arquivo: file.name
        }

        resolve(new URL(`${baseURL}?${qs.stringify(query)}`))
      })
    },

    // Formatters
    dateFormatter(value) {
      const date = moment(value)
      return date.isValid() ? date.format("DD/MM/YYYY") : ""
    },
    numberFormatter(value) {
      return isNumber(value) ? numeral(value).format("0,0.00") : "-"
    },
    situacaoFormatter(value) {
      return ["Ativo", "Inativo", "Pagamento"]["AIP".indexOf(value)]
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      services.contrato
        .get({ params: { id } })
        .then(({ data }) => {
          this.contrato = data || {}
        })
        .catch(error => {
          // todo: add some message
          console.error(error)
        })
    }
  },
  watch: {
    contrato() {
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
