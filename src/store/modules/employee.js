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
  'selected/id': (state, getters) => getters.selected?.user?.id,
  'selected/employeeAvatar': (state, getters) => getters.selected?.avatar,
  'selected/employeeName': (state, getters) => getters.selected?.fullname,
  'selected/employeeNumber': (state, getters) => getters.selected?.user?.employee_number,
  'selected/employmentType': (state, getters) => getters.selected?.employmentType,
  'selected/position': (state, getters) => getters.selected?.positions?.[0]?.name || '',
  'selected/contact': (state, getters) => getters.selected?.contacts?.[0]?.description || '',
  'selected/address': (state, getters) => getters.selected?.addresses?.[0]?.address || '',
  'selected/education': (state, getters) => getters.selected?.education,
  'selected/hasEducation': (state, getters) => getters.selected?.education?.length,
  'selected/experiences': (state, getters) => getters.selected?.experiences,
  'selected/hasExperiences': (state, getters) => getters.selected?.experiences?.length,
  'selected/addresses': (state, getters) => getters.selected?.addresses,
  'selected/hasAddresses': (state, getters) => getters.selected?.addresses?.length,
  'selected/contacts': (state, getters) => getters.selected?.contacts,
  'selected/hasContacts': (state, getters) => getters.selected?.contacts?.length,
  'selected/documents': (state, getters) => getters.selected?.documents,
  'selected/hasDocuments': (state, getters) => getters.selected?.documents?.length,
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
  'EXPERIENCE/ADD': ({ selectedEmployee }, experience) => selectedEmployee.experiences.push(experience || {}),
  'EXPERIENCE/UPDATE': ({ selectedEmployee }, experience) => {
    const index = selectedEmployee.experiences.findIndex(obj => obj.id === experience.id);
    Vue.set(selectedEmployee.experiences, index, experience);
  },
  'CONTACT/ADD': ({ selectedEmployee }, contact) => selectedEmployee.contacts.push(contact || {}),
  'CONTACT/UPDATE': ({ selectedEmployee }, contact) => {
    const index = selectedEmployee.contacts.findIndex(obj => obj.id === contact.id);
    Vue.set(selectedEmployee.contacts, index, contact);
  },
  'DOCUMENT/ADD': ({ selectedEmployee }, document) => selectedEmployee.documents.push(document || {}),
  'DOCUMENT/UPDATE': ({ selectedEmployee }, document) => {
    const index = selectedEmployee.documents.findIndex(obj => obj.id === document.id);
    Vue.set(selectedEmployee.documents, index, document);
  },
  'DOCUMENT/DELETE': ({ selectedEmployee }, id) => {
    const index = selectedEmployee.documents.findIndex(obj => obj.id === id);
    selectedEmployee.documents.splice(index, 1);
  },
};

const actions = {
  async list ({ commit },
    params = {
      page: 1, size: 10, sort: '-created_at', filter: '',
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
      commit('SET_EMPLOYEE', data);
    }
  },
  async uploadNewAvatar ({ getters }, avatar) {
    const base64Regex = new RegExp(/^(data):(.*?)(;base64,)/);
    const empId = getters['selected/id'];
    if (base64Regex.test(avatar)) {
      const blob = await fetch(avatar).then(response => response.blob());
      await avatarClient.uploadUserAvatar(blob, empId);
    }
  },
  'education/add': ({ commit }, education) => commit('EDUCATION/ADD', education),
  'education/update': ({ commit }, education) => commit('EDUCATION/UPDATE', education),
  'address/add': ({ commit }, address) => commit('ADDRESS/ADD', address),
  'address/update': ({ commit }, address) => commit('ADDRESS/UPDATE', address),
  'experience/add': ({ commit }, experience) => commit('EXPERIENCE/ADD', experience),
  'experience/update': ({ commit }, experience) => commit('EXPERIENCE/UPDATE', experience),
  'contact/add': ({ commit }, contact) => commit('CONTACT/ADD', contact),
  'contact/update': ({ commit }, contact) => commit('CONTACT/UPDATE', contact),
  'document/add': ({ commit }, document) => commit('DOCUMENT/ADD', document),
  'document/update': ({ commit }, document) => commit('DOCUMENT/UPDATE', document),
  'document/delete': ({ commit }, id) => commit('DOCUMENT/DELETE', id),
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
