import Vue from 'vue';
import initialState from '@/config/employmenttype.state';
import EmploymentTypeClient from '@/api/clients/EmploymentTypeClient';

const client = new EmploymentTypeClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, employmentType) {
    state.form = { ...employmentType };
  },
  SET_LIST ({ table }, employmentTypes) {
    table.list = [ ...employmentTypes ];
  },
  ADD_EMPLOYMENT_TYPE ({ table: { list } }, employmentType) {
    list.push(employmentType);
  },
  UPDATE_EMPLOYMENT_TYPE ({ table: { list } }, employmentType) {
    const index = list.findIndex(obj => obj.id === employmentType.id);
    Vue.set(list, index, employmentType);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching employment type list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving employment type failed');
    } else {
      commit('ADD_EMPLOYMENT_TYPE', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating employment type failed');
    } else {
      commit('UPDATE_EMPLOYMENT_TYPE', data);
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
