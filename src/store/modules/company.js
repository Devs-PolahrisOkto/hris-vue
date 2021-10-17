const state = {
    companies: [
        { 'id': 1, 'name': 'Company A', 'description': '' },
        { 'id': 2, 'name': 'Company B', 'description': '' },
        { 'id': 3, 'name': 'Company C', 'description': '' },
    ],
    form: {
        id: '',
        name: '',
        description: ''
    },
};

const getters = {
    companyForm(state) {
        return state.form;
    },
    list(state) {
        return state.companies;
    }
}

const mutations = {
    SET_FORM(state, company) {
        state.form = {...company};
    },
};

const actions = {
    setForm({commit}, payload) {
        commit('SET_FORM', payload);
    }
};

export default {
    namespaced: true,
    state, 
    getters,
    mutations, 
    actions,
};