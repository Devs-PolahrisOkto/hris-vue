import Vue from 'vue';
import initialState from '@/config/position.state';
import PositionClient from '@/api/clients/PositionClient';

const client = new PositionClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, position) {
    state.form = { ...position };
  },
  SET_LIST ({ table }, positions) {
    table.list = [ ...positions ];
  },
  ADD_POSITION ({ table: { list } }, position) {
    list.push(position);
  },
  UPDATE_POSITION ({ table: { list } }, position) {
    const index = list.findIndex(obj => obj.id === position.id);
    Vue.set(list, index, position);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching position list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving position failed');
    } else {
      commit('ADD_POSITION', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating position failed');
    } else {
      commit('UPDATE_POSITION', data);
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
