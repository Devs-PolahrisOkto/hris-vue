const state = {
    auth_user: null
};

const mutations = {
    SET_AUTH_USER (state, user_obj) {
        state.auth_user = user_obj;
    },
    CLEAR_AUTH_USER (state) {
        state.auth_user = null;
    }
};

const actions = {
    setAuthUser: ({commit}, user_obj) => {
        commit('SET_AUTH_USER', user_obj);
    },
    clearAuthUser: ({commit}) => {
        commit('CLEAR_AUTH_USER');
    }
};

export default {
    namespaced: true,
    state, 
    mutations, 
    actions,
};