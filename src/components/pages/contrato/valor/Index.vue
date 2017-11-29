<template>
  <section>
    <q-card>
      <q-card-title>
        {{`${contrato.descricao} #${contrato.id}`}}
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
              <q-btn round icon="add" color="primary" @click="$refs.uploader.open()">
                <q-tooltip>Novo</q-tooltip>
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

    <q-modal ref="modal" :content-css="{ minWidth: '320px', minHeight: '200px' }">
      <q-modal-layout>
        <q-toolbar slot="header">
          <div class="q-toolbar-title">{{modal.title}}</div>
          <q-btn flat @click="$refs.modal.close()">
            <q-icon name="close" />
          </q-btn>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
  </section>
</template>

<script>
import { Dialog } from "quasar"
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import kebabCase from "lodash/kebabCase"
import merge from "lodash/merge"
import qs from "qs"
import services from "service/all"

const service = services.contratoValor

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      baseURL,
      modal: {
        title: ""
      },
      contrato: {},
      table: {
        fields: [
          {
            name: "descricao",
            sortField: "descricao",
            title: "Descrição"
          },
          {
            name: "__slot:actions",
            title: "",
            width: "160px"
          }
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
            title: "Prompt",
            message: "Modern HTML5 Single Page Application front-end framework on steroids.",
            form: {
              name: { type: "text", label: "Textbox", model: "" },
              age: { type: "number", label: "Numeric", model: 10, min: 5, max: 90 },
              tags: { type: "chips", label: "Chips", model: ["Joe", "John"] },
              comments: { type: "textarea", label: "Textarea", model: "" }
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

          this.modal.title = item.descricao
          this.$refs.iframe.src = `${baseURL}?${qs.stringify(query)}`
          break

        case "download":
          query.contentDisposition = "attachment"
          this.$refs.iframe.src = `${baseURL}?${qs.stringify(query)}`
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
      const { params } = options
      if (!params.sort) {
        delete params.sort
      }

      const args = merge({}, { params: { idcontrato: this.contrato.id || 0 }, options })
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
  max-width 700px

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
