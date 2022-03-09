import ContactClient from '@/api/clients/ContactClient';
import ContactRepresentation from '@/api/representations/ContactRepresentation';

const client = new ContactClient('https://apistaging.polahrisokto.com/api');

const state = {

};

const getters = {
  form: () => new ContactRepresentation(),
};

const mutations = {

};

const actions = {
  async save ({ dispatch, rootGetters }, payload) {
    const userId = rootGetters['employee/selected']?.user?.id;
    const { status, data: { data } } = await client.save(userId, payload);
    if (status !== 200) {
      console.error('saving contact failed');
    } else {
      dispatch('employee/contact/add', data, { root: true });
    }
  },
  async update ({ dispatch, rootGetters }, payload) {
    const userId = rootGetters['employee/selected']?.user?.id;
    const { status, data: { data } } = await client.update(userId, payload);
    if (status !== 200) {
      console.error('updating contact failed');
    } else {
      dispatch('employee/contact/update', data, { root: true });
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
