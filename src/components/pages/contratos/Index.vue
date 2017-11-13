<template>
  <div>
    <q-layout ref="layout" reveal view="lHr LpR lfr">
      <div>
        <q-toolbar inverted color="primary" class="print-hide">

          <div v-show="tab === 'form'">
            <q-btn flat round small @click="gotoView">
              <q-icon name="arrow_back" />
            </q-btn>
          </div>

          <q-toolbar-title>
            Contratos
          </q-toolbar-title>

          <q-search color="teal" v-model="search" placeholder="Busca..." />

          <!-- View Mode -->
          <div v-show="tab === 'view'">
            <q-btn flat round small @click.prevent.stop="console.log">
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
          <!-- Form -->
          <q-tab-pane name="form">
            <v-form v-model="selection" />
          </q-tab-pane>

          <q-tab-pane name="view">
            <!-- View: List or Grid -->
            <q-tabs :value="view">
              <q-tab-pane name="module">
                <v-view-module v-model="selection" :contratos="contratos" :diretorios="diretorios" />
              </q-tab-pane>
              <q-tab-pane name="list">
                <v-view-list v-model="selection" :contratos="contratos" :diretorios="diretorios" />
              </q-tab-pane>
            </q-tabs>
          </q-tab-pane>
        </q-tabs>
      </div>
    </q-layout>
    <q-context-menu ref="context">
      <q-list link separator no-border style="min-width: 150px; max-height: 300px;">
        <q-item v-for="n in 5" :key="n" @click="$refs.context.close()">
          <q-item-main label="Label" sublabel="Value" />
        </q-item>
      </q-list>
    </q-context-menu>
  </div>
</template>

<script>
import VForm from "./form/Form"
import VViewList from "./view/list/List"
import VViewModule from "./view/module/Module"

import cloneDeep from "lodash/cloneDeep"
import model from "./Model"
import times from "lodash/times"

const diretorios = []
times(10, () => {
  diretorios.push(cloneDeep(model.diretorio))
})

const contratos = []
times(16, () => {
  contratos.push(cloneDeep(model.contrato))
})

export default {
  components: { VForm, VViewList, VViewModule },
  props: ["idDiretorio", "idContrato", "action"],
  data() {
    return {
      contratos,
      diretorios,
      selection: {},
      view: "list",
      tab: "form",
      search: ""
    }
  },
  methods: {
    add() {
      alert("add")
    },
    toggleView() {
      this.view = this.view === "list" ? "module" : "list"
    },
    gotoForm() {
      this.tab = "form"
    },
    gotoView() {
      this.tab = "view"
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

