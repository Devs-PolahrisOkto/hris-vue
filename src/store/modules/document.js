import DocumentClient from '@/api/clients/DocumentClient';

const client = new DocumentClient('https://apistaging.polahrisokto.com/api');

const state = {

};

const getters = {

};

const mutations = {

};

const actions = {
  async save ({ dispatch, rootGetters }, file) {
    const userId = rootGetters['employee/selected']?.user?.id;
    const { status, data: { data } } = await client.save(userId, file);
    if (status !== 200) {
      console.error('saving document failed');
    } else {
      dispatch('employee/document/add', data, { root: true });
    }
  },
  async update ({ dispatch, rootGetters }, payload) {
    const userId = rootGetters['employee/selected']?.user?.id;
    const { status, data: { data } } = await client.update(userId, payload);
    if (status !== 200) {
      console.error('updating document failed');
    } else {
      dispatch('employee/document/update', data, { root: true });
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
