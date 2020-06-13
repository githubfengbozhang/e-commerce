const state = {
  selectRouter: ''
}

const mutations = {
  SELECT_ROUTER: (state, router) => {
    state.selectRouter = router
  }
}

const actions = {

  select_router ({ commit }, router) {
    commit('SELECT_ROUTER', router)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}