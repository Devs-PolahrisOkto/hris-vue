import Vue from 'vue';
import initialState from '@/config/gender.state';
import GenderClient from '@/api/clients/GenderClient';

const client = new GenderClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, gender) {
    state.form = { ...gender };
  },
  SET_LIST ({ table }, genders) {
    table.list = [ ...genders ];
  },
  ADD_GENDER ({ table: { list } }, gender) {
    list.push(gender);
  },
  UPDATE_GENDER ({ table: { list } }, gender) {
    const index = list.findIndex(obj => obj.id === gender.id);
    Vue.set(list, index, gender);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching gender list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving gender failed');
    } else {
      commit('ADD_GENDER', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating gender failed');
    } else {
      commit('UPDATE_GENDER', data);
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
