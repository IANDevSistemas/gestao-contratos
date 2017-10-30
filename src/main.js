/* global __THEME:true */

import "quasar-extras/material-icons"
import Quasar from "quasar"
import Vue from "vue"
import router from "./router"

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

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === "mat") {
  require("quasar-extras/roboto-font")
}

// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: "#q-app",
    router,
    render: (h) => h(require("./App").default)
  })
})
