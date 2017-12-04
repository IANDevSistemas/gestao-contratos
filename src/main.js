/* global __THEME:true */

// Icons
// import "quasar-extras/ionicons"
import "quasar-extras/fontawesome"
// import "quasar-extras/animate"
import "quasar-extras/material-icons"

import "moment/locale/pt-br"
import "numeral/locales/pt-br"

import Quasar, * as AllQuasar from "quasar"
import VMoney from "v-money"
import Vue from "vue"
import VueTheMask from "vue-the-mask"
import Vuelidate from "vuelidate"

import numeral from "numeral"
import moment from "moment"

// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)
if (__THEME === "mat") {
  require("quasar-extras/roboto-font")
}

Vue.config.productionTip = false

Vue.use(Quasar, {
  components: AllQuasar,
  directives: AllQuasar
})

Vue.use(VMoney, {
  decimal: ",",
  thousands: ".",
  prefix: "",
  suffix: "",
  precision: 2,
  masked: false
})

Vue.use(VueTheMask)

Vue.use(Vuelidate)

numeral.locale("pt-br")
moment.locale("pt-br")

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: "#q-app",
    render(h) {
      const render = require("./App").default
      return h(render)
    }
  })
})
