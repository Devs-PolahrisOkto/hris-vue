import GenderClient from '@/api/clients/gender-client';
import Vue from 'vue';

const client = new GenderClient('https://apistaging.polahrisokto.com/api');

const state = {
  genders: [],
  form: {
    id: '',
    name: '',
    description: ''
  },
};

const getters = {
  genderForm(state) {
    return state.form;
  },
  list(state) {
    return state.genders;
  }
}

const mutations = {
  SET_FORM(state, gender) {
    state.form = {...gender};
  },
  SET_LIST(state, genders) {
    state.genders = genders;
  },
  ADD_GENDER(state, gender) {
    state.genders.push(gender);
  },
  UPDATE_GENDER(state, gender) {
    const index = state.genders.findIndex(obj => { return obj.id === gender.id });
    Vue.set(state.genders, index, gender);
  }
};

const actions = {
  setForm({commit}, payload) {
    commit('SET_FORM', payload);
  },
  async list({commit}) {
    const {status, data: {data}} = await client.list();
    if(status !== 200) {
      console.error('fetching gender list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save({commit}, payload) {
    const {status, data: {data}} = await client.save(payload);
    if(status !== 200) {
      console.error('saving gender failed');
    } else {
      commit('ADD_GENDER', data);
    }
  },
  async update({commit}, payload) {
    const {status, data: {data}} = await client.update(payload);
    if(status !== 200) {
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