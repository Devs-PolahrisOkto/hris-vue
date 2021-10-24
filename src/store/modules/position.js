import PositionClient from '@/api/clients/position-client';
import Vue from 'vue';

const client = new PositionClient('https://apistaging.polahrisokto.com/api');

const state = {
  positions: [],
  form: {
    id: '',
    name: '',
    description: ''
  },
};

const getters = {
  positionForm(state) {
    return state.form;
  },
  list(state) {
    return state.positions;
  }
}

const mutations = {
  SET_FORM(state, position) {
    state.form = {...position};
  },
  SET_LIST(state, positions) {
    state.positions = positions;
  },
  ADD_POSITION(state, position) {
    state.positions.push(position);
  },
  UPDATE_POSITION(state, position) {
    const index = state.positions.findIndex(obj => { return obj.id === position.id });
    Vue.set(state.positions, index, position);
  }
};

const actions = {
  setForm({commit}, payload) {
    commit('SET_FORM', payload);
  },
  async list({commit}) {
    const {status, data: {data}} = await client.list();
    if(status !== 200) {
      console.error('fetching position list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save({commit}, payload) {
    const {status, data: {data}} = await client.save(payload);
    if(status !== 200) {
      console.error('saving position failed');
    } else {
      commit('ADD_POSITION', data);
    }
  },
  async update({commit}, payload) {
    const {status, data: {data}} = await client.update(payload);
    if(status !== 200) {
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