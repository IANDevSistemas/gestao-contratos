import { LOGIN, LOGOUT } from "../mutation-types"

const state = {
  auth: {},
  loggedIn: false
}

const getters = {
  auth(state) {
    // console.log("getters.auth", state)
    return state.auth
  },
  loggedIn(state) {
    return state.loggedIn
  }
}

const mutations = {
  [LOGIN](state, auth) {
    console.log(`mutations.${LOGIN}`, auth)
    state.auth = auth
    state.loggedIn = true
  },
  [LOGOUT](state) {
    console.log(`mutations.${LOGOUT}`)
    if (!state.auth.save) {
      state.auth = {}
    }
    state.loggedIn = false
  }
}

const actions = {
  login({ commit, state }, auth) {
    commit(LOGIN, auth)
  },
  logout({ commit }) {
    commit(LOGOUT)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
