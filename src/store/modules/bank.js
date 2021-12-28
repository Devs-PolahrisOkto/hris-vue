import Vue from 'vue';
import initialState from '@/config/bank.state';
import BankClient from '@/api/clients/BankClient';

const client = new BankClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, bank) {
    state.form = { ...bank };
  },
  SET_LIST ({ table }, banks) {
    table.list = [ ...banks ];
  },
  ADD_BANK ({ table: { list } }, bank) {
    list.push(bank);
  },
  UPDATE_BANK ({ table: { list } }, bank) {
    const index = list.findIndex(obj => obj.id === bank.id);
    Vue.set(list, index, bank);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching bank list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving bank failed');
    } else {
      commit('ADD_BANK', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating bank failed');
    } else {
      commit('UPDATE_BANK', data);
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
