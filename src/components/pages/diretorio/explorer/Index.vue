<template>
  <q-layout ref="layout" reveal view="lHr LpR lfr">

    <q-toolbar inverted color="primary" class="print-hide">
      <!-- <q-toolbar-title> -->
      <!-- Contratos -->
      <!-- </q-toolbar-title> -->

      <q-btn flat round small @click="onNavBack">
        <q-icon name="arrow_back" />
      </q-btn>

      <q-search color="teal" v-model="search" class="search" placeholder="Busca..." />

      <q-btn flat round small @click="sidePanel = true">
        <q-icon name="search" />
      </q-btn>

      <q-btn flat round small @click.prevent.stop="refresh()">
        <q-icon name="refresh" />
      </q-btn>

      <!-- <q-btn flat round small @click.prevent.stop="toggleView"> -->
      <!-- <q-icon :name="`view_${view}`" /> -->
      <!-- </q-btn> -->

      <!-- <q-btn flat round small @click.prevent.stop="console.log"> -->
      <!-- <q-icon name="info" /> -->
      <!-- </q-btn> -->

      <!-- <q-btn flat round small @click.prevent.stop="console.log"> -->
      <!-- <q-icon name="settings" /> -->
      <!-- </q-btn> -->
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

    <q-tabs class="explorer" :value="view">
      <q-tab-pane name="module">
        <view-module v-model="selection" :contratos="list.contrato" :diretorios="list.diretorio" @add="onAdd" @edit="onEdit" @change="onChange" />
      </q-tab-pane>
      <q-tab-pane name="list">
        <view-list v-model="selection" :contratos="list.contrato" :diretorios="list.diretorio" @add="onAdd" @edit="onEdit" @change="onChange" />
      </q-tab-pane>
    </q-tabs>

    <!-- Right Side Panel -->
    <div v-if="sidePanel" slot="right">
      <q-toolbar />
      <q-toolbar inverted>
        <q-btn icon="close" flat round small @click="sidePanel = false" />
        <div class="q-toolbar-title"></div>
      </q-toolbar>
      <div class="layout-padding">
        <search-filter v-model="filter" />
      </div>
      <q-toolbar inverted>
        <q-btn color="primary" icon-right="search" @click="refresh()"> Buscar </q-btn>
        <q-btn flat color="negative" icon-right="clear" @click="filter = {}"> Limpar </q-btn>
        <div class="q-toolbar-title"></div>
      </q-toolbar>
    </div>
    <q-inner-loading :visible="isLoading">
      <q-spinner size="100px" color="primary" />
    </q-inner-loading>
  </q-layout>
</template>

<script>
import SearchFilter from "./SearchFilter"
import ViewList from "./list/Component"
import ViewModule from "./module/Component"

import services from "service/all"

export default {
  components: {
    SearchFilter,
    ViewList,
    ViewModule
  },
  data() {
    return {
      sidePanel: "",
      diretorio: {},
      list: {
        contrato: [],
        diretorio: [],
        loaded: 0
      },
      selection: {},
      view: "module",
      filter: {},
      search: ""
    }
  },
  computed: {
    services: () => services,
    isLoading() {
      return this.list.loaded !== Object.keys(this.list).length - 1
    }
  },
  methods: {
    onAdd(ref) {
      this.selection = {}
      this.onEdit(ref)
    },
    onEdit(ref) {
      const { selection } = this
      const query = { diretoriopai: this.diretorio.id }
      if (ref === "diretorio") {
        this.$router.push({ path: `/diretorio/${selection.iddiretorio || "0"}/form`, query })
      } else if (ref === "contrato") {
        this.$router.push({ name: "contrato", params: { id: selection.idcontrato || "0" }, query })
      }
    },
    onNavBack() {
      this.$router.go(-1)
    },
    onNavTo({ iddiretorio }) {
      // console.log(iddiretorio)
      this.$router.push({ name: "diretorio", params: { id: iddiretorio }, query: { view: this.view } })
    },
    onChange() {
      if (this.selection.iddiretorio) {
        this.onNavTo(this.selection)
      }
    },
    refresh() {
      const { id } = this.$route.params

      this.list.loaded = 0
      services.diretorio
        .get({
          params: {
            iddiretoriopai: id || 0
          }
        })
        .then(({ data }) => {
          this.list.diretorio = data.data
          this.list.loaded++
        })
        .catch(error => {
          // TODO show some message
          console.error(error)
        })

      services.diretorio
        .get({
          params: {
            id: id || 0
          }
        })
        .then(({ data }) => {
          this.diretorio = data
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
          this.list.loaded++
        })
        .catch(error => {
          // TODO show some message
          console.error(error)
        })
    }
  },
  watch: {
    $route(to, from) {
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

.layout-padding
  padding 12px

.q-toolbar
  .q-search.search
    flex none
    width 320px
</style>