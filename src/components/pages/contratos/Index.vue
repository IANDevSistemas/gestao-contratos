<template>
  <div>
    <q-layout ref="layout" reveal view="lHr LpR lfr">

      <!-- Right Side Panel -->
      <!-- <div slot="right">
          Right Side of Layout
        </div> -->

      <div>
        <q-toolbar inverted color="primary">
          <q-toolbar-title>
            Contratos
          </q-toolbar-title>

          <q-search color="teal" v-model="search" placeholder="Busca..." />

          <!-- View Mode -->
          <q-btn flat round small v-if="view" @click="toggleView">
            <q-icon :name='`view_${view}`' />
          </q-btn>

          <q-btn flat round small>
            <q-icon name="info" />
          </q-btn>

          <q-btn flat round small>
            <q-icon name="settings" />
          </q-btn>
        </q-toolbar>
        <ul class="breadcrumb">
          <li>
            <a>
              <q-icon name="home" /> </a>
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
            <v-form />
          </q-tab-pane>

          <q-tab-pane name="view">
            <!-- View: List or Grid -->
            <q-tabs :value="view">
              <q-tab-pane name="module">
                <v-view-module :contratos="contratos" :diretorios="diretorios" />
              </q-tab-pane>
              <q-tab-pane name="list">
                <v-view-list />
                <!-- :contratos="contratos" :diretorios="diretorios" /> -->
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
import VList from "./view/list/List"
import VModule from "./view/module/Module"

import model from "./Model"
import times from "lodash/times"

const diretorios = []
times(10, () => {
  diretorios.push(model.diretorio)
})

const contratos = []
times(16, () => {
  contratos.push(model.contrato)
})

export default {
  components: { VForm, VList, VModule },
  props: ["idDiretorio", "idContrato", "action"],
  data() {
    return {
      contratos,
      diretorios,
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

