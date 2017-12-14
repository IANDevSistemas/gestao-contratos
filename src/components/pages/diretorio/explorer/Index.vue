<template>
  <q-layout ref="layout" reveal view="lHr LpR lfr">

    <q-toolbar inverted color="primary" class="print-hide">
      <!-- <q-toolbar-title> -->
      <!-- Contratos -->
      <!-- </q-toolbar-title> -->

      <q-btn flat round small @click="onNavBack">
        <q-icon name="arrow_back" />
        <q-tooltip>Voltar</q-tooltip>
      </q-btn>

      <form @submit.stop.prevent="onSearch()" class="row">
        <q-search color="teal" v-model="filter.descricao" class="search" placeholder="Busca..." />

        <q-btn flat round small type="submit">
          <q-icon name="search" />
          <q-tooltip>Busca Simples</q-tooltip>
        </q-btn>
      </form>

      <q-btn flat round small @click="detail = 'SEARCH'">
        <q-icon name="youtube_searched_for" />
        <q-tooltip>Busca Avançada</q-tooltip>
      </q-btn>

      <q-btn flat round small @click.prevent.stop="filter = {}, onRefresh()">
        <q-icon name="refresh" />
        <q-tooltip>Atualizar</q-tooltip>
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
    <div v-if="detail === 'SEARCH'" slot="right">
      <q-toolbar inverted/>
      <q-toolbar inverted>
        <q-btn icon="close" flat round small @click="detail = ''" />
        <div class="q-toolbar-title"></div>
      </q-toolbar>
      <div class="layout-padding">
        <search-filter v-model="filter" @submit="Object.keys(filter).length ? onSearch() : onRefresh()" />
      </div>
    </div>

    <div v-if="detail === 'CONTRATO'" slot="right">
      <q-toolbar inverted/>
      <div class="layout-padding">
        <detail-contrato v-model="selection" />
      </div>
    </div>

    <q-inner-loading :visible="isLoading">
      <q-spinner size="100px" color="primary" />
    </q-inner-loading>
  </q-layout>
</template>

<script>
import DetailContrato from "./detail/Contrato"
import SearchFilter from "./SearchFilter"
import ViewList from "./list/Component"
import ViewModule from "./module/Component"

import services from "service/all"

export default {
  components: {
    DetailContrato,
    SearchFilter,
    ViewList,
    ViewModule
  },
  data() {
    return {
      detail: "",
      diretorio: {},
      list: {
        contrato: [],
        diretorio: [],
        loaded: 0
      },
      selection: {},
      view: "module",
      filter: {}
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
      if (ref === "diretorio") {
        this.$router.push({ path: `/diretorio/${selection.iddiretorio || "0"}/form`, query: { diretoriopai: this.diretorio.id } })
      } else if (ref === "contrato") {
        this.$router.push({ name: "contrato", params: { id: selection.idcontrato || "0" }, query: { diretorio: this.diretorio.id } })
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
    onRefresh() {
      const { id } = this.$route.params

      this.filter = {}

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
    },
    onSearch() {
      const { id } = this.$route.params

      this.list.loaded = 0
      services.diretorio
        .get({
          params: {
            idraiz: id || 0,
            ...this.filter
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

      services.contrato
        .get({
          params: {
            idraiz: id || 0,
            ...this.filter
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
      this.onRefresh()
    },
    selection(value) {
      if (this.selection.idcontrato) {
        this.detail = "CONTRATO"
      } else if (this.detail === "CONTRATO") {
        this.detail = ""
      }
    }
  },
  mounted() {
    this.onRefresh()
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

img
  max-width 100%
</style>