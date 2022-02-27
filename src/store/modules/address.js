import AddressClient from '@/api/clients/AddressClient';
import AddressRepresentation from '@/api/representations/AddressRepresentation';

const client = new AddressClient('https://apistaging.polahrisokto.com/api');

const state = {

};

const getters = {
  form: () => new AddressRepresentation(),
};

const mutations = {

};

const actions = {
  async save ({ dispatch }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving address failed');
    } else {
      dispatch('employee/address/add', data, { root: true });
    }
  },
  async update ({ dispatch }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating address failed');
    } else {
      dispatch('employee/address/update', data, { root: true });
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
