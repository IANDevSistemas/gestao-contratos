<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="hhh LpR lFr" :left-class="{ 'bg-white': true }">
      <q-toolbar v-if="!isFullScreen" slot="header" class="print-hide">
        <q-btn v-show="loggedIn" flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Gestão de Contratos</q-toolbar-title>

        <q-btn flat icon="exit_to_app" v-show="loggedIn" @click="$router.push('/logout')">Logout</q-btn>
      </q-toolbar>

      <q-scroll-area class="print-hide" slot="left" v-if="!isFullScreen && loggedIn" style="width: 100%; height: 100%;">
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
        <q-side-link item to="/cadastro/indice">
          <q-item-side icon="fa-line-chart" />
          <q-item-main label="Índice Financeiro" />
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
import { mapActions, mapGetters } from "vuex"
import qs from "qs"
import router from "router"
import sha1 from "sha1"
import service from "service"
import services from "service/all"
import store from "store"
// import { sync } from "vuex-router-sync"
// const unsync = sync(store, router)

export default {
  store,
  router,
  data() {
    return {
      isFullScreen: false
    }
  },
  computed: {
    ...mapGetters(["loggedIn", "auth"]),
    loginRoute() {
      return "/login"
    },
    currentRoute() {
      return this.$router.currentRoute
    }
  },
  methods: {
    ...mapActions(["login", "logout"]),
    isLoginRoute(route) {
      return route === this.loginRoute
    },
    doLogout() {
      try {
        this.$refs.layout.hideLeft()
      } catch (error) {
        console.error(error)
      }
      this.logout()
      this.$router.push(this.loginRoute)
    },
    doLogin() {
      if (this.loggedIn) {
        service
          .post("", {
            action: "login",
            usr: this.auth.usr,
            pwd: `!${sha1(this.auth.pwd)}`
          })
          .then(response => {
            if (response.data === "odwctrl?action=menu") {
              this.login(this.auth)
            } else {
              this.doLogout()
            }
          })
          .catch(error => {
            this.doLogout()
            console.error(error)
          })
      }
    }
  },
  mounted() {
    const self = this

    const { isFullScreen } = qs.parse(window.location.search.substr(1))

    self.isFullScreen = Boolean(isFullScreen)

    self.doLogin()
    setInterval(() => {
      self.doLogin()
    }, 25 * 60 * 1000 /* 25 minutes */)

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
    })

    if (!this.isLoginRoute(this.$route.path) && !this.loggedIn) {
      this.$router.push({ path: "/", query: this.$route.query })
    }
  },
  destroyed() {
    // unsync()
  },
  watch: {
    loggedIn(value) {
      if (!value) {
        this.doLogout()
      }
    }
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

