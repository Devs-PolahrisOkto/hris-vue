import AuthenticationClient from '@/api/clients/authentication-client';

const client = new AuthenticationClient('https://apistaging.polahrisokto.com/api');

const state = {
    authToken: localStorage.getItem('authToken'),
    authUser: JSON.parse(localStorage.getItem('authUser')),
};

const mutations = {
    SET_AUTH_TOKEN (state, token) {
        state.authToken = token;
        localStorage.setItem('authToken', token);
    },
    SET_AUTH_USER (state, user) {
        state.authUser = user;
        localStorage.setItem('authUser', JSON.stringify(user));
    },
    CLEAR_AUTH_USER (state) {
        state.authUser = null;
        state.authToken = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
    }
};

const actions = {
    async login({commit}, payload) {
        const {token, user} = await client.login(payload);
        commit('SET_AUTH_TOKEN', token);
        commit('SET_AUTH_USER', user);
    },
    logout({commit}) {
        commit('CLEAR_AUTH_USER');
    }
};

export default {
    namespaced: true,
    state, 
    mutations, 
    actions,
};