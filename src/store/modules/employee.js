import Vue from 'vue';
import initialState from '@/config/employee.state';
import EmployeeClient from '@/api/clients/EmployeeClient';
import Employee from '@/api/models/EmployeeModel';

const client = new EmployeeClient('https://apistaging.polahrisokto.com/api');

const state = {
  ...initialState,
};

const getters = {
  'table/columns': ({ table: { columns } }) => columns,
  'table/list': ({ table: { list } }) => list.map(employee => new Employee(employee)),
  'table/meta': ({ table: { meta } }) => meta,
  selected: ({ selectedEmployee }) => selectedEmployee,
  'selected/employmentType': ({ selectedEmployee }) => selectedEmployee && selectedEmployee.employment_type && selectedEmployee.employment_type.description,
  'selected/position': ({ selectedEmployee: { positions } }) => positions && positions[0] && positions[0].name,
  'selected/contact': ({ selectedEmployee: { contacts } }) => contacts && contacts[0] && contacts[0].name,
  'selected/address': ({ selectedEmployee: { addresses } }) => addresses && addresses[0] && addresses[0].address1,
  'selected/education': ({ selectedEmployee: { education } }) => education,
  'selected/addresses': ({ selectedEmployee: { addresses } }) => addresses,
  'selected/contacts': ({ selectedEmployee: { contacts } }) => contacts,
  'selected/documents': ({ selectedEmployee: { documents } }) => documents,
};

const mutations = {
  SET_FORM (state, employee) {
    state.form = { ...employee };
  },
  SET_LIST ({ table }, employees) {
    table.list = [ ...employees ];
  },
  ADD_EMPLOYEE ({ table: { list } }, employee) {
    list.push(employee);
  },
  UPDATE_EMPLOYEE ({ table: { list } }, employee) {
    const index = list.findIndex(obj => obj.id === employee.id);
    Vue.set(list, index, employee);
  },
  SET_EMPLOYEE (state, employee) {
    state.selectedEmployee = new Employee(employee);
  },
  UPDATE_HEADERS ({ table }, headers) {
    table.headers = headers;
  },
};

const actions = {
  async list ({ commit }) {
    const { status, data: { data } } = await client.list();
    if (status !== 200) {
      console.error('fetching employee list failed');
    } else {
      commit('SET_LIST', data);
    }
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
  updateHeaders ({ commit }, headers) {
    commit('UPDATE_HEADERS', headers);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
