import DepartmentClient from '@/api/clients/department-client';
import Vue from 'vue';

const client = new DepartmentClient('https://apistaging.polahrisokto.com/api');

const state = {
  departments: [],
  form: {
    id: '',
    name: '',
    description: ''
  },
};

const getters = {
  departmentForm(state) {
    return state.form;
  },
  list(state) {
    return state.departments;
  }
}

const mutations = {
  SET_FORM(state, position) {
    state.form = {...position};
  },
  SET_LIST(state, departments) {
    state.departments = departments;
  },
  ADD_DEPARTMENT(state, department) {
    state.departments.push(department);
  },
  UPDATE_DEPARTMENT(state, department) {
    const index = state.departments.findIndex(obj => { return obj.id === department.id });
    Vue.set(state.departments, index, department);
  }
};

const actions = {
  setForm({commit}, payload) {
    commit('SET_FORM', payload);
  },
  async list({commit}) {
    const {status, data: {data}} = await client.list();
    if(status !== 200) {
      console.error('fetching department list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save({commit}, payload) {
    const {status, data: {data}} = await client.save(payload);
    if(status !== 200) {
      console.error('saving department failed');
    } else {
      commit('ADD_DEPARTMENT', data);
    }
  },
  async update({commit}, payload) {
    const {status, data: {data}} = await client.update(payload);
    if(status !== 200) {
      console.error('updating department failed');
    } else {
      commit('UPDATE_DEPARTMENT', data);
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