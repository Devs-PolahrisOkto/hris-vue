import Vue from 'vue';
import initialState from '@/config/branch.state';
import BranchClient from '@/api/clients/BranchClient';

const client = new BranchClient('https://apistaging.polahrisokto.com/api');

const state = {
  ...initialState,
};

const getters = {
  form: ({ form }) => form,
  'table/columns': ({ table: { columns } }) => columns,
  'table/list': ({ table: { list } }) => list,
  'table/meta': ({ table: { meta } }) => meta,
};

const mutations = {
  SET_FORM (state, branch) {
    state.form = { ...branch };
  },
  SET_LIST ({ table }, branches) {
    table.list = [ ...branches ];
  },
  ADD_BRANCH ({ table: { list } }, branch) {
    list.push(branch);
  },
  UPDATE_BRANCH ({ table: { list } }, branch) {
    const index = list.findIndex(obj => obj.id === branch.id);
    Vue.set(list, index, branch);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching branch list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving branch failed');
    } else {
      commit('ADD_BRANCH', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating branch failed');
    } else {
      commit('UPDATE_BRANCH', data);
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
