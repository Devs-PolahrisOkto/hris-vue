import EducationClient from '@/api/clients/EducationClient';

const client = new EducationClient('https://apistaging.polahrisokto.com/api');

const state = {

};

const getters = {

};

const mutations = {

};

const actions = {
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('fetching employee list failed');
    } else {
      commit('', data);
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
