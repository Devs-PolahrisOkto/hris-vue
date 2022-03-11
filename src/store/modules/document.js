import { isEmpty } from 'lodash';
import DocumentClient from '@/api/clients/DocumentClient';

const client = new DocumentClient('https://apistaging.polahrisokto.com/api');

const state = {
  errors: {
    errors: {},
    message: '',
  },
};

const getters = {
  errors: ({ errors }) => errors,
  hasErrors: ({ errors: { errors } }) => !isEmpty(errors),
};

const mutations = {
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
  async save ({ commit, dispatch, rootGetters }, file) {
    const userId = rootGetters['employee/selected']?.user?.id;
    const { status, data } = await client.save(userId, file);
    if (status !== 200) {
      commit('SET_ERRORS', data);
      console.error('saving document failed');
      return Promise.reject();
    }
    dispatch('employee/document/add', data, { root: true });
    commit('CLEAR_ERRORS');
    return Promise.resolve();
  },
  async update ({ dispatch, rootGetters }, payload) {
    const userId = rootGetters['employee/selected']?.user?.id;
    const { status, data: { data } } = await client.update(userId, payload);
    if (status !== 200) {
      console.error('updating document failed');
    } else {
      dispatch('employee/document/update', data, { root: true });
    }
  },
  async delete ({ dispatch }, id) {
    const { status } = await client.delete(id);
    if (status !== 200) {
      console.error('deleting document failed');
    } else {
      dispatch('employee/document/delete', id, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
