import Vue from 'vue';
import initialState from '@/config/department.state';
import DepartmentClient from '@/api/clients/DepartmentClient';

const client = new DepartmentClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, department) {
    state.form = { ...department };
  },
  SET_LIST ({ table }, departments) {
    table.list = [ ...departments ];
  },
  ADD_DEPARTMENT ({ table: { list } }, department) {
    list.push(department);
  },
  UPDATE_DEPARTMENT ({ table: { list } }, department) {
    const index = list.findIndex(obj => obj.id === department.id);
    Vue.set(list, index, department);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching department list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving department failed');
    } else {
      commit('ADD_DEPARTMENT', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
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
