import initialState from '@/config/navigation.state';

const state = {
  ...initialState,
};

const getters = {
  sidebarState: ({ sidebar }) => sidebar,
  sidebarMiniState: ({ sidebarMini }) => sidebarMini,
};

const mutations = {
  TOGGLE_SIDEBAR (state) {
    state.sidebar = !state.sidebar;
  },
  TOGGLE_SIDEBAR_MINI (state) {
    state.sidebarMini = !state.sidebarMini;
  },
};

const actions = {
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  toggleSidebarMini ({ commit }) {
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
