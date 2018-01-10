/* global __THEME:true */

// Icons
// import "quasar-extras/ionicons"
import "quasar-extras/fontawesome"
// import "quasar-extras/animate"
import "quasar-extras/material-icons"

import "moment/locale/pt-br"
import "numeral/locales/pt-br"

import Quasar, * as AllQuasar from "quasar"
import Money from "@/util/money"
import Vue from "vue"
import VueTheMask from "vue-the-mask"
import Vuelidate from "vuelidate"

import moment from "moment"
import numeral from "numeral"

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

Vue.directive("money", Money)

Vue.use(VueTheMask)

Vue.use(Vuelidate)

numeral.locale("pt-br")
moment.locale("pt-br")

Vue.filter("date", value => {
  const parsed = moment(value)
  return value && parsed.isValid() ? parsed.format("DD/MM/YYYY") : ""
})

const opts = {
  props: {
    format: {
      default() {
        return "DD/MM/YYYY"
      }
    },
    monthNames: {
      default() {
        return ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
      }
    },
    dayNames: {
      default() {
        return ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
      }
    },
    okLabel: {
      default() {
        return "OK"
      }
    },
    clearLabel: {
      default() {
        return "Limpar"
      }
    },
    cancelLabel: {
      default() {
        return "Limpar"
      }
    }
  }
}

Vue.component("q-datetimepicker-range", { extends: AllQuasar.QDatetimeRange, ...opts })
Vue.component("q-datetimepicker", { extends: AllQuasar.QDatetime, ...opts })

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
