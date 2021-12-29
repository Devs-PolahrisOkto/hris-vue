import Vue from 'vue';
import initialState from '@/config/documenttype.state';
import DocumentTypeClient from '@/api/clients/DocumentTypeClient';

const client = new DocumentTypeClient('https://apistaging.polahrisokto.com/api');

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
  SET_FORM (state, documentType) {
    state.form = { ...documentType };
  },
  SET_LIST ({ table }, documentTypes) {
    table.list = [ ...documentTypes ];
  },
  ADD_DOCUMENT_TYPE ({ table: { list } }, documentType) {
    list.push(documentType);
  },
  UPDATE_DOCUMENT_TYPE ({ table: { list } }, documentType) {
    const index = list.findIndex(obj => obj.id === documentType.id);
    Vue.set(list, index, documentType);
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
