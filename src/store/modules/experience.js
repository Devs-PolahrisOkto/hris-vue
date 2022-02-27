import ExperienceClient from '@/api/clients/ExperienceClient';
import ExperienceRepresentation from '@/api/representations/ExperienceRepresentation';

const client = new ExperienceClient('https://apistaging.polahrisokto.com/api');

const state = {

};

const getters = {
  form: (state, getters, rootState, rootGetters) => new ExperienceRepresentation({ user_id: rootGetters['employee/selected']?.user?.id }),
};

const mutations = {

};

const actions = {
  async save ({ dispatch }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving experience failed');
    } else {
      dispatch('employee/experience/add', data, { root: true });
    }
  },
  async update ({ dispatch }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating experience failed');
    } else {
      dispatch('employee/experience/update', data, { root: true });
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
