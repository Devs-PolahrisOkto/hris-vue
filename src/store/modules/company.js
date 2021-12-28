import Vue from 'vue';
import initialState from '@/config/addresstype.state';
import CompanyClient from '@/api/clients/CompanyClient';

const client = new CompanyClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, company) {
    state.form = { ...company };
  },
  SET_LIST ({ table }, companies) {
    table.list = [ ...companies ];
  },
  ADD_COMPANY ({ table: { list } }, company) {
    list.push(company);
  },
  UPDATE_COMPANY ({ table: { list } }, company) {
    const index = list.findIndex(obj => obj.id === company.id);
    Vue.set(list, index, company);
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
