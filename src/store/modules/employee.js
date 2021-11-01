import EmployeeClient from '@/api/clients/employee-client';
import Employee from '@/api/models/employee-model';
import Vue from 'vue';

const client = new EmployeeClient('https://apistaging.polahrisokto.com/api');

const state = {
  employees: [],
  form: {
    id: '',
    name: '',
    description: '',
    avatar: '',
    gender_id: '',
    branch_id: '',
    employment_type_id: '',
    email: '',
    username: '',
    title: '',
    firstname: '',
    middlename: '',
    lastname: '',
    nickname: '',
    birthDate: '',
  },
};

const getters = {
  positionForm(state) {
    return state.form;
  },
  list(state) {
    return state.employees.map(employee => new Employee(employee));
  }
}

const mutations = {
  SET_FORM(state, employee) {
    state.form = {...employee};
  },
  SET_LIST(state, employees) {
    state.employees = employees;
  },
  ADD_EMPLOYEE(state, employee) {
    state.employees.push(employee);
  },
  UPDATE_EMPLOYEE(state, employee) {
    const index = state.employees.findIndex(obj => { return obj.id === employee.id });
    Vue.set(state.employees, index, employee);
  }
};

const actions = {
  setForm({commit}, payload) {
    commit('SET_FORM', payload);
  },
  async list({commit}) {
    const {status, data: {data}} = await client.list();
    if(status !== 200) {
      console.error('fetching employee list failed');
    } else {
      commit('SET_LIST', data);
    }
  },
  async save({commit}, payload) {
    const {status, data: {data}} = await client.save(payload);
    if(status !== 200) {
      console.error('saving employee failed');
    } else {
      commit('ADD_EMPLOYEE', data);
    }
  },
  async update({commit}, payload) {
    const {status, data: {data}} = await client.update(payload);
    if(status !== 200) {
      console.error('updating employee failed');
    } else {
      commit('UPDATE_EMPLOYEE', data);
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