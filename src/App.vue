<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="hhh LpR lFr" :left-class="{ 'bg-white': true }">
      <q-toolbar slot="header" class="print-hide">
        <q-btn v-if="loggedIn" flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Gestão de Contratos
          <div slot="subtitle">v{{$q.version}}</div>
        </q-toolbar-title>
      </q-toolbar>

      <div slot="left" class="print-hide">
        <q-side-link item to="/cadastro/empresa">
          <q-item-side icon="fa-file-text" />
          <q-item-main label="Empresa" />
        </q-side-link>
        <q-side-link item to="/contratos">
          <q-item-side icon="fa-file-text" />
          <q-item-main label="Contratos" />
        </q-side-link>
      </div>

      <!-- Page -->
      <transition name="fade">
        <router-view />
      </transition>

    </q-layout>
  </div>
</template>

<script>
import isEmpty from "lodash/isEmpty"
import { mapGetters } from "vuex"
import store from "store"

export default {
  store,
  computed: {
    ...mapGetters(["loggedIn"]),
    loginRoute() {
      return "/login"
    },
    currentRoute() {
      return this.$router.currentRoute
    }
  },
  methods: {
    isLoginRoute(route) {
      return route === this.loginRoute
    }
  },
  mounted() {
    const self = this
    self.$router.beforeEach((from, to, next) => {
      const { loggedIn, loginRoute } = self
      const { path } = from

      const isLoginRoute = self.isLoginRoute(path)

      try {
        if (isLoginRoute) {
          self.$refs.layout.hideLeft()
        }
      } catch (error) {
        console.error(error)
      }

      const route = isLoginRoute ? true : loggedIn ? true : loginRoute

      // next(route)
      next()
      // this.$router.push(route)
    })

    // TODO testar sessão
    // // if (!self.isLoginRoute(self.currentRoute) && !this.loggedIn) {
    // try {
    //   self.$refs.layout.hideLeft()
    // } catch (error) {
    //   console.error(error)
    // }
    // self.$router.push(self.loginRoute)
    // // }
  }
}
</script>
<style lang="stylus">
@import '~variables'

.layout-page
  background-color $grey-3

.q-card, .q-data-table
  background-color $white
</style>

