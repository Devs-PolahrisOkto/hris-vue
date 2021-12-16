import SettingClient from '@/api/clients/setting-client';

const client = new SettingClient('https://apistaging.polahrisokto.com/api');

const state = {
  companies: [],
  departments: [],
  positions: [],
  employmentTypes: [],
  addressTypes: [],
  documentTypes: [],
  banks: [],
  civilStatuses: [],
  genders: [],
};

const getters = {
  companiesState(state) {
    return state.companies.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  departmentsState(state) {
    return state.departments.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  positionsState(state) {
    return state.positions.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  employmentTypesState(state) {
    return state.employmentTypes.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  addressTypesState(state) {
    return state.addressTypes.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  documentTypesState(state) {
    return state.documentTypes.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  banksState(state) {
    return state.banks.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  civilStatusesState(state) {
    return state.civilStatuses.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
  gendersState(state) {
    return state.genders.map(obj => {
      return {
        value: obj.id,
        text: obj.name,
      };
    });
  },
}

const mutations = {
  SET_LIST(state, settings) {
    const {
      companyList,
      departmentList,
      positionList,
      employmentTypeList,
      addressTypeList,
      documentTypeList,
      bankList,
      civilStatusList,
      genderList,
    } = settings;
    state.companies = companyList;
    state.departments = departmentList;
    state.positions = positionList;
    state.employmentTypes = employmentTypeList;
    state.addressTypes = addressTypeList;
    state.documentTypes = documentTypeList;
    state.banks = bankList;
    state.civilStatuses = civilStatusList;
    state.genders = genderList;
  },
};

const actions = {
  async list({commit}) {
    const companyList = client.companyList().then(response => {
      if (response.status !== 200) {
        console.error('fetching company list failed');
        return [];
      }
      return response.data.data;
    });
    const departmentList = client.departmentList().then(response => {
      if (response.status !== 200) {
        console.error('fetching department list failed');
        return [];
      }
      return response.data.data;
    });
    const positionList = client.positionList().then(response => {
      if (response.status !== 200) {
        console.error('fetching position list failed');
        return [];
      }
      return response.data.data;
    });
    const employmentTypeList = client.employmentTypeList().then(response => {
      if (response.status !== 200) {
        console.error('fetching employment type list failed');
        return [];
      }
      return response.data.data;
    });
    const addressTypeList = client.addressTypeList().then(response => {
      if (response.status !== 200) {
        console.error('fetching address type list failed');
        return [];
      }
      return response.data.data;
    });
    const documentTypeList = client.documentTypeList().then(response => {
      if (response.status !== 200) {
        console.error('fetching document type list failed');
        return [];
      }
      return response.data.data;
    });
    const bankList = client.bankList().then(response => {
      if (response.status !== 200) {
        console.error('fetching bank list failed');
        return [];
      }
      return response.data.data;
    });
    const civilStatusList = client.civilStatusList().then(response => {
      if (response.status !== 200) {
        console.error('fetching civil status list failed');
        return [];
      }
      return response.data.data;
    });
    const genderList = client.genderList().then(response => {
      if (response.status !== 200) {
        console.error('fetching gender list failed');
        return [];
      }
      return response.data.data;
    });

    const settings = await Promise.all([
      companyList,
      departmentList,
      positionList,
      employmentTypeList,
      addressTypeList,
      documentTypeList,
      bankList,
      civilStatusList,
      genderList,
    ]).then(results => {
      return {
        companyList: results[0],
        departmentList: results[1],
        positionList: results[2],
        employmentTypeList: results[3],
        addressTypeList: results[4],
        documentTypeList: results[5],
        bankList: results[6],
        civilStatusList: results[7],
        genderList: results[8],
      }
    });
    
    commit('SET_LIST', settings);
  },
};

export default {
  namespaced: true,
  state, 
  getters,
  mutations, 
  actions,
};