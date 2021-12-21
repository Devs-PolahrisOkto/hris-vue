import Vue from 'vue';
import AddressTypeClient from '@/api/clients/AddressTypeClient';

const client = new AddressTypeClient('https://apistaging.polahrisokto.com/api');

const state = {
  addressTypes: [],
  form: {
    id: '',
    name: '',
    description: '',
  },
};

const getters = {
  addressTypeForm (state) {
    return state.form;
  },
  list (state) {
    return state.addressTypes;
  },
};

const mutations = {
  SET_FORM (state, addressType) {
    state.form = { ...addressType };
  },
  SET_LIST (state, addressTypes) {
    state.addressTypes = addressTypes;
  },
  ADD_ADDRESS_TYPE (state, addressType) {
    state.addressTypes.push(addressType);
  },
  UPDATE_ADDRESS_TYPE (state, addressType) {
    const index = state.addressTypes.findIndex(obj => obj.id === addressType.id);
    Vue.set(state.addressTypes, index, addressType);
  },
};

const actions = {
  setForm ({ commit }, payload) {
    commit('SET_FORM', payload);
  },
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching address type list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving address type failed');
    } else {
      commit('ADD_ADDRESS_TYPE', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating address type failed');
    } else {
      commit('UPDATE_ADDRESS_TYPE', data);
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
