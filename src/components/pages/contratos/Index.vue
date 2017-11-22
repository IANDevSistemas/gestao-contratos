<template>
  <div>
    <q-layout ref="layout" reveal view="lHr LpR lfr">
      <div>
        <q-toolbar inverted color="primary" class="print-hide">
          <q-toolbar-title>
            Contratos
          </q-toolbar-title>

          <q-btn flat round small @click="onNavBack">
            <q-icon name="arrow_back" />
          </q-btn>

          <q-search color="teal" v-model="search" placeholder="Busca..." />

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
            <a @click="onNavTo({})">
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
          <!-- Form Contrato -->
          <q-tab-pane name="form-contrato">
            <crud-form-contrato ref="form-contrato" v-model="selection" :service="services.diretorio" @back="onFormBack" @save="onFormSave('form-contrato')" @delete="onFormDelete('form-contrato')" />
          </q-tab-pane>
          <!-- Form Diretório -->
          <q-tab-pane name="form-diretorio">
            <crud-form-diretorio ref="form-diretorio" v-model="selection" :service="services.diretorio" @back="onFormBack" @save="onFormSave('form-diretorio')" @delete="onFormDelete('form-diretorio')" />
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
import CrudFormContrato from "./form/Contrato"
import CrudFormDiretorio from "./form/Diretorio"
import { Dialog } from "quasar"
import VViewList from "./view/list/List"
import VViewModule from "./view/module/Module"

import serviceContrato from "service/contrato"
import serviceDiretorio from "service/diretorio-contrato"

// const dialogBlock = {
//   nobuttons: true,
//   progress: {
//     indeterminate: true
//   },
//   noBackdropDismiss: true,
//   noEscDismiss: true
// }

export default {
  components: { CrudFormContrato, CrudFormDiretorio, VViewList, VViewModule },
  props: ["idDiretorio", "idContrato", "action"],
  data() {
    return {
      diretorio: {},
      list: {
        contrato: [],
        diretorio: []
      },
      selection: {},
      view: "list",
      tab: "",
      search: ""
    }
  },
  computed: {
    services() {
      return {
        contrato: serviceContrato,
        diretorio: serviceDiretorio
      }
    }
  },
  methods: {
    onAdd(type) {
      this.tab = `form-${type}`
      this.selection = {}
    },
    onEdit() {
      const { selection } = this
      if (selection.iddiretoriocontrato) {
        this.tab = "form-diretorio"
      }
      if (selection.idcontrato) {
        this.tab = "form-contrato"
      }
    },
    onNavBack() {
      console.log("not implemented yet")
    },
    onNavTo(diretorio) {
      diretorio.id = diretorio.iddiretoriocontrato
      this.diretorio = diretorio
      this.tab = "view"
    },
    onChange() {
      this.diretorio = this.selection
    },
    onFormBack() {
      this.tab = "view"
    },
    onFormSave(ref) {
      const form = this.$refs[ref]

      if (!form.validate()) {
        Dialog.create({ title: "Dados inválidos", message: "Verifique os dados inseridos e tente novamente." })
        return
      }

      form
        .save()
        .then(response => {
          this.tab = "view"
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
      const config = {
        params: {}
      }

      // TODO add search
      if (this.diretorio.iddiretoriocontrato) {
        config.params.iddiretoriocontratopai = this.diretorio.iddiretoriocontrato
      } else {
        config.params.depth = 0
      }

      this.list.contrato = []
      // serviceContrato
      //   .get(config)
      //   .then(({ data }) => {
      //     this.list.contrato = data.data
      //   })
      //   .catch(error => {
      //     // TODO show some message
      //     console.error(error)
      //   })

      serviceDiretorio
        .get(config)
        .then(({ data }) => {
          this.list.diretorio = data.data
        })
        .catch(error => {
          // TODO show some message
          this.list.diretorio = []
          console.error(error)
        })
    },
    toggleView() {
      this.view = this.view === "list" ? "module" : "list"
    }
  },
  watch: {
    tab(value) {
      if (value === "view") {
        this.refresh()
      } else {
        this.selection.diretoriocontratopai = this.diretorio
      }
    },
    selection(value) {
    },
    diretorio(value) {
      console.log(value)
      this.selection = {}

      // Busca o path
      if (value.id) {
        serviceDiretorio
          .get({
            params: {
              iddiretoriocontrato: value.id
            }
          })
          .then(({ data }) => {
            const [{ path }] = data.data
            this.diretorio.path = path
            this.refresh()
          })
          .catch(error => {
            // TODO show some message
            console.error(error)
          })
      } else {
        this.refresh()
      }
    }
  },
  mounted() {
    this.tab = "view"
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

