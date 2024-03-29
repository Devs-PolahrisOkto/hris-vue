import EducationClient from '@/api/clients/EducationClient';
import EducationRepresentation from '@/api/representations/EducationRepresentation';

const client = new EducationClient('https://apistaging.polahrisokto.com/api');

const state = {

};

const getters = {
  form: (state, getters, rootState, rootGetters) => new EducationRepresentation({ user_id: rootGetters['employee/selected']?.user?.id }),
};

const mutations = {

};

const actions = {
  async save ({ dispatch }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving education failed');
    } else {
      dispatch('employee/education/add', data, { root: true });
    }
  },
  async update ({ dispatch }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating education failed');
    } else {
      dispatch('employee/education/update', data, { root: true });
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
