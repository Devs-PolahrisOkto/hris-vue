import Vue from 'vue';
import EmployeeClient from '@/api/clients/EmployeeClient';
import Employee from '@/api/models/EmployeeModel';
import initialState from '@/config/employee.state';

const client = new EmployeeClient('https://apistaging.polahrisokto.com/api');

const state = {
  ...initialState,
};

const getters = {
  'table/headers': ({ table: { headers } }) => headers,
  list (state) {
    return state.employees.map(employee => new Employee(employee));
  },
  selectedEmployee (state) {
    return state.selectedEmployee;
  },
};

const mutations = {
  SET_FORM (state, employee) {
    state.form = { ...employee };
  },
  SET_LIST (state, employees) {
    state.employees = employees;
  },
  ADD_EMPLOYEE (state, employee) {
    state.employees.push(employee);
  },
  UPDATE_EMPLOYEE (state, employee) {
    const index = state.employees.findIndex(obj => obj.id === employee.id);
    Vue.set(state.employees, index, employee);
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
