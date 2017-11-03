<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="hhh LpR lFr" :left-class="{'bg-grey-2': true}">
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Gestão de Contratos
          <div slot="subtitle">v{{$q.version}}</div>
        </q-toolbar-title>
      </q-toolbar>

      <div slot="left">
        <q-side-link item to="/contratos">
          <q-item-side icon="fa-file-text" />
          <q-item-main label="Contratos" />
        </q-side-link>
      </div>

      <!-- Page -->
      <router-view />

    </q-layout>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {
  methods: {
    launch(url) {
      openURL(url)
    }
  }
}
</script>

<style></style>
