import Vue from 'vue';
import EmploymentTypeClient from '@/api/clients/employment-type-client';

const client = new EmploymentTypeClient('https://apistaging.polahrisokto.com/api');

const state = {
  employmentTypes: [],
  form: {
    id: '',
    name: '',
    description: '',
  },
};

const getters = {
  employmentTypeForm (state) {
    return state.form;
  },
  list (state) {
    return state.employmentTypes;
  },
};

const mutations = {
  SET_FORM (state, employmentType) {
    state.form = { ...employmentType };
  },
  SET_LIST (state, employmentTypes) {
    state.employmentTypes = employmentTypes;
  },
  ADD_EMPLOYMENT_TYPE (state, employmentType) {
    state.employmentTypes.push(employmentType);
  },
  UPDATE_EMPLOYMENT_TYPE (state, employmentType) {
    const index = state.employmentTypes.findIndex(obj => obj.id === employmentType.id);
    Vue.set(state.employmentTypes, index, employmentType);
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
