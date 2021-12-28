import Vue from 'vue';
import initialState from '@/config/civilstatus.state';
import CivilStatusClient from '@/api/clients/CivilStatusClient';

const client = new CivilStatusClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, civilStatus) {
    state.form = { ...civilStatus };
  },
  SET_LIST ({ table }, civilStatuses) {
    table.list = [ ...civilStatuses ];
  },
  ADD_CIVIL_STATUS ({ table: { list } }, civilStatus) {
    list.push(civilStatus);
  },
  UPDATE_CIVIL_STATUS ({ table: { list } }, civilStatus) {
    const index = list.findIndex(obj => obj.id === civilStatus.id);
    Vue.set(list, index, civilStatus);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching civil status list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving civil status failed');
    } else {
      commit('ADD_CIVIL_STATUS', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating civil status failed');
    } else {
      commit('UPDATE_CIVIL_STATUS', data);
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
