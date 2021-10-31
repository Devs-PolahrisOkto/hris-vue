const state = {
  sidebarMini: false,
};

const getters = {
  sidebarMiniState(state) {
    return state.sidebarMini;
  }
};

const mutations = {
  TOGGLE_SIDEBAR_MINI(state) {
    state.sidebarMini = !state.sidebarMini;
  },
};

const actions = {
  toggleSidebarMini({commit}) {
    commit('TOGGLE_SIDEBAR_MINI');
  },
};

export default {
  namespaced: true,
  state, 
  getters,
  mutations, 
  actions,
};