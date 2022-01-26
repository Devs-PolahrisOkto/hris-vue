import initialState from '@/config/workshift.state';

const state = {
  ...initialState,
};

const getters = {
  'table/columns': ({ table: { columns } }) => columns,
  'table/list': ({ table: { list } }) => list,
  'table/meta': ({ table: { meta } }) => meta,
  employeeList: ({ employeeList }) => employeeList,
  'addWorkShift/table/columns': ({ addWorkShift: { columns } }) => columns,
  'addWorkShift/table/meta': ({ addWorkShift: { meta } }) => meta,
};

const mutations = {

};

const actions = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
