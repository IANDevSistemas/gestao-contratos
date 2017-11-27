<template>
  <div>
    <q-layout ref="layout" reveal view="lHr LpR lfr">
      <div>
        <q-toolbar inverted color="primary" class="print-hide">
          <q-toolbar-title>
            Contratos
          </q-toolbar-title>

          <!-- 
          <q-btn flat round small @click="onNavBack">
            <q-icon name="arrow_back" />
          </q-btn>

          <q-search color="teal" v-model="search" placeholder="Busca..." /> 
          -->

          <!-- View Mode -->
          <div v-show="tab === 'view'">
            <q-btn flat round small @click.prevent.stop="refresh()">
              <q-icon name="refresh" />
            </q-btn>

            <q-btn flat round small @click.prevent.stop="toggleView">
              <q-icon :name="`view_${view}`" />
            </q-btn>

            <q-btn flat round small @click.prevent.stop="console.log">
              <q-icon name="info" />
            </q-btn>

            <q-btn flat round small @click.prevent.stop="console.log">
              <q-icon name="settings" />
            </q-btn>
          </div>
        </q-toolbar>

        <ul class="breadcrumb print-hide">
          <li>
            <a @click="onNavTo({ iddiretorio: 0 })">
              <q-icon name="home" />
            </a>
          </li>
          <li v-for="(value, index) in diretorio && diretorio.path && diretorio.path.split('/')" :key="index">
            <a @click="onNavTo(JSON.parse(value))">
              {{JSON.parse(value).descricao}}
            </a>
          </li>
        </ul>

        <q-tabs class="explorer" :value="tab">
          <!-- Targets -->
          <!-- Form -->
          <q-tab-pane name="form-diretorio">
            <crud-form-diretorio ref="form-diretorio" v-model="selection" service-name="diretorio" @back="onFormBack('form-diretorio')" @save="onFormSave('form-diretorio')" @delete="onFormDelete('form-diretorio')" />
          </q-tab-pane>

          <q-tab-pane name="form-contrato">
            <crud-form-contrato ref="form-contrato" v-model="selection" service-name="contrato" @back="onFormBack('form-contrato')" @save="onFormSave('form-contrato')" @delete="onFormDelete('form-contrato')" />
          </q-tab-pane>

          <q-tab-pane name="view">
            <!-- View: List or Grid -->
            <q-tabs :value="view">
              <q-tab-pane name="module">
                <v-view-module v-model="selection" :contratos="list.contrato" :diretorios="list.diretorio" @add="onAdd" @edit="onEdit" @change="onChange" />
              </q-tab-pane>
              <q-tab-pane name="list">
                <v-view-list v-model="selection" :contratos="list.contrato" :diretorios="list.diretorio" @add="onAdd" @edit="onEdit" @change="onChange" />
              </q-tab-pane>
            </q-tabs>
          </q-tab-pane>
        </q-tabs>
      </div>
    </q-layout>
  </div>
</template>

<script>
import CrudFormDiretorio from "./form/Diretorio"
import CrudFormContrato from "../contrato/form/Contrato"

import { Dialog } from "quasar"
import VViewList from "./view/list/List"
import VViewModule from "./view/module/Module"

import services from "service/all"

const dialogBlock = {
  nobuttons: true,
  progress: {
    indeterminate: true
  },
  noBackdropDismiss: true,
  noEscDismiss: true
}

export default {
  components: { CrudFormDiretorio, CrudFormContrato, VViewList, VViewModule },
  data() {
    return {
      diretorio: {},
      list: {
        contrato: [],
        diretorio: []
      },
      selection: {},
      view: "module",
      tab: "view",
      search: ""
    }
  },
  computed: {
    services: () => services
  },
  methods: {
    onAdd(ref) {
      this.selection = {}
      if (ref === "diretorio") {
        this.selection.diretoriopai = this.diretorio
      } else {
        this.selection.diretorio = this.diretorio
      }
      this.tab = `form-${ref}`
    },
    onEdit(ref) {
      const { selection } = this
      if (selection.iddiretorio) {
        this.selection.diretoriopai = this.diretorio
        this.tab = "form-diretorio"
      }

      if (selection.idcontrato) {
        this.selection.diretoriopai = this.diretorio
        this.tab = "form-contrato"
      }
    },
    onNavBack() {
      console.log("not implemented yet")
    },
    onNavTo({ iddiretorio }) {
      this.tab = "view"
      this.$router.push({ name: "diretorio", params: { id: iddiretorio }, query: { view: this.view } })
    },
    onChange() {
      if (this.selection.iddiretorio) {
        this.onNavTo(this.selection)
      }
    },
    onFormBack() {
      this.tab = "view"
      this.refresh()
    },
    onFormSave(ref) {
      const form = this.$refs[ref]

      if (!form.validate()) {
        Dialog.create({ title: "Dados inválidos", message: "Verifique os dados inseridos e tente novamente." })
        return
      }

      let dialog
      if (ref === "form-contrato") {
        dialog = Dialog.create({ title: "Salvando dados", message: "Verifique os dados inseridos e tente novamente.", ...dialogBlock })
      }

      form
        .save()
        .then(response => {
          if (ref === "form-diretorio") {
            this.tab = "view"
            this.refresh()
          } else {
            dialog.close()
          }
        })
        .catch(error => {
          Dialog.create({ title: "Erro !", message: "Erro ao salvar os dados." })
          console.error(error)
        })
    },
    onFormDelete(ref) {
      const form = this.$refs[ref]

      const confirm = {
        label: "Sim",
        handler: () => {
          dialog1.close()

          form
            .delete()
            .then(response => {
              this.tab = "view"
              this.refresh()
            })
            .catch(error => {
              console.error(error)
            })
        }
      }

      // Etapa 1: Confirmação a ação
      const dialog1 = Dialog.create({ title: "Remover os dados ?", message: "Tem certeza que os dados devem ser removidos ?", buttons: ["Não", confirm] })
    },
    refresh() {
      const { id } = this.$route.params

      services.diretorio
        .get({
          params: {
            iddiretoriopai: id || 0
          }
        })
        .then(({ data }) => {
          this.list.diretorio = data.data
        })
        .catch(error => {
          // TODO show some message
          console.error(error)
        })

      services.diretorio
        .get({
          params: {
            iddiretorio: id || 0
          }
        })
        .then(({ data }) => {
          this.diretorio = data.data[0]
        })
        .catch(error => {
          // TODO show some message
          console.error(error)
        })

      services.contrato
        .get({
          params: {
            iddiretorio: id || 0
          }
        })
        .then(({ data }) => {
          this.list.contrato = data.data
        })
        .catch(error => {
          // TODO show some message
          console.error(error)
        })
    },
    toggleView() {
      this.view = this.view === "list" ? "module" : "list"
    }
  },
  watch: {
    $route(to, from) {
      this.tab = "view"
      this.refresh()
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>

<style lang="stylus">
.explorer
  padding 0 12px

  .q-tabs-head
    display none

  .q-tab-pane
    border none
    padding 0
</style>

