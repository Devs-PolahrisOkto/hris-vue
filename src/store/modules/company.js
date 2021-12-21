import Vue from 'vue';
import CompanyClient from '@/api/clients/CompanyClient';

const client = new CompanyClient('https://apistaging.polahrisokto.com/api');

const state = {
  companies: [],
  form: {
    id: '',
    name: '',
    description: '',
  },
};

const getters = {
  companyForm (state) {
    return state.form;
  },
  list (state) {
    return state.companies;
  },
};

const mutations = {
  SET_FORM (state, company) {
    state.form = { ...company };
  },
  SET_LIST (state, companies) {
    state.companies = companies;
  },
  ADD_COMPANY (state, company) {
    state.companies.push(company);
  },
  UPDATE_COMPANY (state, company) {
    const index = state.companies.findIndex(obj => obj.id === company.id);
    Vue.set(state.companies, index, company);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching company list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving company failed');
    } else {
      commit('ADD_COMPANY', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating company failed');
    } else {
      commit('UPDATE_COMPANY', data);
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
