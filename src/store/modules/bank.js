import Vue from 'vue';
import BankClient from '@/api/clients/BankClient';

const client = new BankClient('https://apistaging.polahrisokto.com/api');

const state = {
  banks: [],
  form: {
    id: '',
    name: '',
    description: '',
  },
};

const getters = {
  bankForm (state) {
    return state.form;
  },
  list (state) {
    return state.banks;
  },
};

const mutations = {
  SET_FORM (state, bank) {
    state.form = { ...bank };
  },
  SET_LIST (state, banks) {
    state.banks = banks;
  },
  ADD_BANK (state, bank) {
    state.banks.push(bank);
  },
  UPDATE_BANK (state, bank) {
    const index = state.banks.findIndex(obj => obj.id === bank.id);
    Vue.set(state.banks, index, bank);
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
