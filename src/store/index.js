import * as actions from "./actions"
import * as getters from "./getters"
import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth"
import logger from "vuex/dist/logger"
import persistedState from "vuex-persistedstate"

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [logger(), persistedState()],
  modules: {
    auth
  },
  actions,
  getters
})
