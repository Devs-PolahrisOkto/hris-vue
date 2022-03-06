import { isEmpty } from 'lodash';
import initialState from '@/config/authentication.state';
import AuthenticationClient from '@/api/clients/AuthenticationClient';

const client = new AuthenticationClient('https://apistaging.polahrisokto.com/api');

const state = {
  ...initialState,
};

const getters = {
  authUserObj: ({ authUser }) => authUser,
  authUserName: ({ authUser }) => `${authUser?.user?.firstname} ${authUser?.user?.lastname}`,
  authUserAvatar: ({ authUser }) => authUser?.avatar,
  authUserEmail: ({ authUser }) => authUser?.user?.email,
  errors: ({ errors }) => errors,
  hasErrors: ({ errors: { errors } }) => !isEmpty(errors),
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
  },
  SET_ERRORS (state, errors) {
    state.errors = errors;
  },
  CLEAR_ERRORS (state) {
    state.errors = {
      errors: {},
      message: '',
    };
  },
};

const actions = {
  async login ({ commit }, payload) {
    const { status, data } = await client.login(payload);
    if (status !== 200) {
      commit('SET_ERRORS', data);
      console.error('login failed');
      return false;
    }
    commit('SET_AUTH_TOKEN', data?.token);
    commit('SET_AUTH_USER', data?.user);
    commit('CLEAR_ERRORS');
    return true;
  },
  logout ({ commit }) {
    commit('CLEAR_AUTH_USER');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
