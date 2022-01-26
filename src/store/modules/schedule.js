import initialState from '@/config/schedule.state';

const state = {
  ...initialState,
};

const getters = {
  'table/columns': ({ table: { columns } }) => columns,
  'table/list': ({ table: { list } }) => list,
  'table/meta': ({ table: { meta } }) => meta,
  scheduleList: ({ scheduleList }) => scheduleList,
  'addSchedule/table/columns': ({ addSchedule: { columns } }) => columns,
  'addSchedule/table/list': ({ addSchedule: { list } }) => list,
  'addSchedule/table/meta': ({ addSchedule: { meta } }) => meta,
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
