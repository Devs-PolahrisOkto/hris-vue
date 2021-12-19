import Vue from 'vue';
import DocumentTypeClient from '@/api/clients/DocumentTypeClient';

const client = new DocumentTypeClient('https://apistaging.polahrisokto.com/api');

const state = {
  documentTypes: [],
  form: {
    id: '',
    name: '',
    description: '',
  },
};

const getters = {
  documentTypeForm (state) {
    return state.form;
  },
  list (state) {
    return state.documentTypes;
  },
};

const mutations = {
  SET_FORM (state, documentType) {
    state.form = { ...documentType };
  },
  SET_LIST (state, documentTypes) {
    state.documentTypes = documentTypes;
  },
  ADD_DOCUMENT_TYPE (state, documentType) {
    state.documentTypes.push(documentType);
  },
  UPDATE_DOCUMENT_TYPE (state, documentType) {
    const index = state.documentTypes.findIndex(obj => obj.id === documentType.id);
    Vue.set(state.documentTypes, index, documentType);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching document type list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving document type failed');
    } else {
      commit('ADD_DOCUMENT_TYPE', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating document type failed');
    } else {
      commit('UPDATE_DOCUMENT_TYPE', data);
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
