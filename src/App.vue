<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="hhh LpR lFr" :left-class="{ 'bg-white': true }">
      <q-toolbar slot="header" class="print-hide">
        <q-btn v-if="loggedIn" flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Gestão de Contratos</q-toolbar-title>

        <q-btn flat icon="exit_to_app" @click="$router.push('/logout')">Logout</q-btn>
      </q-toolbar>

      <q-scroll-area class="print-hide" slot="left" style="width: 100%; height: 100%;">
        <q-side-link item to="/diretorio/0">
          <q-item-side icon="fa-file-text" />
          <q-item-main label="Contratos" />
        </q-side-link>

        <q-side-link item to="/cadastro/empresa">
          <q-item-side icon="fa-building" />
          <q-item-main label="Empresa" />
        </q-side-link>
        <q-side-link item to="/cadastro/pessoa">
          <q-item-side icon="fa-users" />
          <q-item-main label="Pessoas" />
        </q-side-link>

        <q-side-link item to="/cadastro/motivo-contrato">
          <q-item-side icon="fa-file-text" />
          <q-item-main label="Motivo Contrato" />
        </q-side-link>
        <q-side-link item to="/cadastro/tipo-contrato">
          <q-item-side icon="fa-file-text" />
          <q-item-main label="Tipo Contrato" />
        </q-side-link>
        <q-side-link item to="/cadastro/tipo-responsavel-contrato">
          <q-item-side icon="fa-file-text" />
          <q-item-main label="Tipo Responsável" />
        </q-side-link>
      </q-scroll-area>

      <!-- Page -->
      <transition name="fade">
        <router-view />
      </transition>

    </q-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import router from "router"
import store from "store"
// import { sync } from "vuex-router-sync"

// const unsync = sync(store, router)

export default {
  store,
  router,
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
        } else if (self.isLoginRoute(to.path)) {
          self.$refs.layout.showLeft()
        }
      } catch (error) {
        console.error(error)
      }

      const route = isLoginRoute ? true : loggedIn ? true : loginRoute

      next(route)
      // next()
      // this.$router.push(route)
    })

    // TODO testar sessão
    if (!self.isLoginRoute(self.currentRoute) && !this.loggedIn) {
      try {
        self.$refs.layout.hideLeft()
      } catch (error) {
        console.error(error)
      }
      self.$router.push(self.loginRoute)
    }
  },
  destroyed() {
    // unsync()
  }
}
</script>
<style lang="stylus">
@import '~variables'

.layout-page
  background-color $grey-3

.q-card, .q-data-table
  background-color $white

.vue-html5-editor>.toolbar>ul>li[title='full screen'], .vue-html5-editor>.toolbar>ul>li[title='info']
  display none

th
  text-align center

text-right
  text-align right

text-left
  text-align left

text-center
  text-align center

.layout-page
  padding-bottom 32px
</style>

