import Vue from 'vue';
import initialState from '@/config/employee.state';
import EmployeeClient from '@/api/clients/EmployeeClient';
import AvatarClient from '@/api/clients/AvatarClient';
import EmployeeRepresentation from '@/api/representations/EmployeeRepresentation';

const client = new EmployeeClient('https://apistaging.polahrisokto.com/api');
const avatarClient = new AvatarClient('https://apistaging.polahrisokto.com/api');

const state = {
  ...initialState,
};

const getters = {
  'table/columns': ({ table: { columns } }) => columns,
  'table/list': ({ table: { list } }) => list.map(employee => (new EmployeeRepresentation(employee)).asViewData),
  'table/list/loading': ({ table: { loading } }) => loading,
  'table/meta': ({ table: { meta } }) => meta,
  selected: ({ selectedEmployee }) => (new EmployeeRepresentation(selectedEmployee)).asViewData,
  'selected/employeeAvatar': (state, getters) => getters.selected?.avatar,
  'selected/employeeName': (state, getters) => getters.selected?.fullname,
  'selected/employeeNumber': (state, getters) => getters.selected?.user?.employee_number,
  'selected/employmentType': (state, getters) => getters.selected?.employmentType,
  'selected/position': (state, getters) => getters.selected?.positions?.[0]?.name || '',
  'selected/contact': (state, getters) => getters.selected?.contacts?.[0]?.description || '',
  'selected/address': (state, getters) => getters.selected?.addresses?.[0]?.address || '',
  'selected/education': (state, getters) => getters.selected?.education,
  'selected/addresses': (state, getters) => getters.selected?.addresses,
  'selected/contacts': (state, getters) => getters.selected?.contacts,
  'selected/documents': (state, getters) => getters.selected?.documents,
};

const mutations = {
  SET_FORM (state, employee) {
    state.form = { ...employee };
  },
  SET_LIST ({ table }, { data, meta }) {
    table.list = [ ...data ];
    table.meta = { ...table.meta, ...meta };
  },
  SET_LIST_LOADING ({ table }, loading) {
    table.loading = loading;
  },
  ADD_EMPLOYEE ({ table: { list } }, employee) {
    list.push(employee);
  },
  UPDATE_EMPLOYEE ({ table: { list } }, employee) {
    const index = list.findIndex(obj => obj.id === employee.id);
    Vue.set(list, index, employee);
  },
  SET_EMPLOYEE (state, employee) {
    state.selectedEmployee = { ...employee };
  },
  'EDUCATION/ADD': ({ selectedEmployee }, education) => selectedEmployee.education.push(education || {}),
  'EDUCATION/UPDATE': ({ selectedEmployee }, education) => {
    const index = selectedEmployee.education.findIndex(obj => obj.id === education.id);
    Vue.set(selectedEmployee.education, index, education);
  },
  'ADDRESS/ADD': ({ selectedEmployee }, address) => selectedEmployee.addresses.push(address || {}),
  'ADDRESS/UPDATE': ({ selectedEmployee }, address) => {
    const index = selectedEmployee.addresses.findIndex(obj => obj.id === address.id);
    Vue.set(selectedEmployee.addresses, index, address);
  },
};

const actions = {
  async list ({ commit },
    params = {
      page: 1, size: 10, sort: '-created_at', filter: 'created_at',
    }) {
    commit('SET_LIST_LOADING', true);
    const { status, data: { data, meta } } = await client.list(params);
    if (status !== 200) {
      console.error('fetching employee list failed');
    } else {
      commit('SET_LIST', { data, meta });
    }
    commit('SET_LIST_LOADING', false);
  },
  async find ({ commit }, id) {
    const { status, data: { data } } = await client.find(id);
    if (status !== 200) {
      console.error('fetching employee failed');
    } else {
      commit('SET_EMPLOYEE', data);
    }
  },
  async save ({ commit }, payload) {
    const { status, data: { data } } = await client.save(payload);
    if (status !== 200) {
      console.error('saving employee failed');
    } else {
      if (payload.profile_photo) {
        await avatarClient.uploadUserAvatar(payload.profile_photo, data?.user?.id);
      }
      commit('ADD_EMPLOYEE', data);
    }
  },
  async update ({ commit }, payload) {
    const { status, data: { data } } = await client.update(payload);
    if (status !== 200) {
      console.error('updating employee failed');
    } else {
      commit('UPDATE_EMPLOYEE', data);
    }
  },
  async upload ({ commit }, payload) {
    const { status, data: { data } } = await client.upload(payload);
    if (status !== 200) {
      console.error('uploading file failed');
    } else {
      commit('', data);
    }
  },
  async uploadDocument ({ commit }, { file, id }) {
    const { status, data: { data } } = await client.uploadDocument(file, id);
    if (status !== 200) {
      console.error('uploading document failed');
    } else {
      commit('', data);
    }
  },
  'education/add': ({ commit }, education) => commit('EDUCATION/ADD', education),
  'education/update': ({ commit }, education) => commit('EDUCATION/UPDATE', education),
  'address/add': ({ commit }, address) => commit('ADDRESS/ADD', address),
  'address/update': ({ commit }, address) => commit('ADDRESS/UPDATE', address),
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
