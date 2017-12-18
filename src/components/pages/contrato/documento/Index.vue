<template>
  <section>
    <crud-table-actions @add="$refs.uploader.open()" />
    <vuetable ref="table" :http-fetch="httpFetch" :fields="fields" :query-params="{ size: 'size', page:'page', perPage: 'size' }" :css="{ 'bordered': true, 'striped': true, 'highlight': true, 'responsive': true, 'q-table': true }" pagination-path="">
      <template slot="actions" slot-scope="props">
        <q-toolbar color="primary" inverted>
          <q-btn round small flat icon="remove_red_eye" @click="onAction('view', props.rowData, props.rowIndex)" />
          <q-btn round small flat icon="cloud_download" @click="onAction('download', props.rowData, props.rowIndex)" />
          <q-btn round small flat icon="delete_forever" @click="onAction('delete', props.rowData, props.rowIndex)" />
        </q-toolbar>
      </template>
    </vuetable>

    <q-modal ref="modal" :content-css="{ minWidth: '80vw', minHeight: '100vh' }">
      <q-modal-layout>
        <q-toolbar slot="header">
          <div class="q-toolbar-title">{{modal.title}}</div>
          <q-btn flat @click="$refs.modal.close()">
            <q-icon name="close" />
          </q-btn>
        </q-toolbar>
        <iframe ref="iframe" @load="$refs.iframe.src && $refs.modal.open()" />
      </q-modal-layout>
    </q-modal>

    <q-modal ref="uploader" position="bottom" :content-css="{ minWidth: '320px', minHeight: '200px' }">
      <q-uploader v-show="contrato.id" multiple :url="baseURL" :url-factory="urlFactory" @finish="refresh()" />
    </q-modal>
  </section>
</template>

<script>
import CrudTableActions from "@/abstract/crud/table/Actions"

import { Dialog } from "quasar"
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import kebabCase from "lodash/kebabCase"
import merge from "lodash/merge"
import qs from "qs"
import services from "service/all"

const service = services.contratoDocumento

export default {
  components: {
    CrudTableActions,
    Vuetable
  },
  data() {
    return {
      baseURL,
      modal: {
        title: ""
      },
      contrato: {},
      filter: {},
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
      ]
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
        case "view":
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
          _fileUploadConvertCharset: "UTF-8",
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
