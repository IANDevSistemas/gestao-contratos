<template>
  <div>
    <q-layout ref="layout" reveal view="lHr LpR lfr">
      <div>
        <q-toolbar inverted color="primary" class="print-hide">

          <div v-show="tab !== 'view'">
            <q-btn flat round small @click="() => { tab = 'view' }">
              <q-icon name="arrow_back" />
            </q-btn>
          </div>

          <q-toolbar-title>
            Contratos
          </q-toolbar-title>

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
            <a>
              <q-icon name="home" />
            </a>
          </li>
          <li>
            <a> Klabin </a>
          </li>
          <li>
            <a>
              Fornecimento
            </a>
          </li>
        </ul>

        <q-tabs class="explorer" :value="tab">
          <!-- Targets -->
          <!-- Form Contrato -->
          <q-tab-pane name="form-contrato">
            <v-form-contrato v-model="model" />
          </q-tab-pane>
          <!-- Form Diretório -->
          <q-tab-pane name="form-diretorio">
            <v-form-diretorio v-model="model" />
          </q-tab-pane>

          <q-tab-pane name="view">
            <!-- View: List or Grid -->
            <q-tabs :value="view">
              <q-tab-pane name="module">
                <v-view-module v-model="selection" :contratos="list.contratos" :diretorios="list.diretorios" @add="onAdd" />
              </q-tab-pane>
              <q-tab-pane name="list">
                <v-view-list v-model="selection" :contratos="list.contratos" :diretorios="list.diretorios" @add="onAdd" />
              </q-tab-pane>
            </q-tabs>
          </q-tab-pane>
        </q-tabs>
      </div>
    </q-layout>
  </div>
</template>

<script>
import VFormContrato from "./form/Contrato"
import VFormDiretorio from "./form/Diretorio"
import VViewList from "./view/list/List"
import VViewModule from "./view/module/Module"

import cloneDeep from "lodash/cloneDeep"
import model from "./Model"

import serviceContrato from "service/contrato"
import serviceDiretorio from "service/diretorio-contrato"

import times from "lodash/times"

export default {
  components: { VFormContrato, VFormDiretorio, VViewList, VViewModule },
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
      tab: "view",
      search: ""
    }
  },
  methods: {
    onAdd(type) {
      this.tab = `form-${type}`
      this.selection = {}
    },
    refresh() {
      const config = {
        params: {}
      }

      // TODO add search
      if (this.diretorio.id) {
        config.params.iddiretoriocontratopai = this.diretorio.id
      } else {
        config.params.depth = 0
      }

      this.list.contratos = []
      serviceContrato
        .get(config)
        .then(({ data }) => {
          this.list.contratos = data
        })
        .catch(error => {
          // TODO show some message
          console.error(error)
        })

      this.list.diretorios = []
      serviceDiretorio
        .get(config)
        .then(({ data }) => {
          this.list.diretorios = data
        })
        .catch(error => {
          // TODO show some message
          console.error(error)
        })
    },
    toggleView() {
      this.view = this.view === "list" ? "module" : "list"
    }
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

