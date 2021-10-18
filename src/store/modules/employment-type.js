const state = {
    employmentTypes: [
        { 'id': 1, 'name': 'Regular', 'description': '' },
        { 'id': 2, 'name': 'Probationary', 'description': '' },
        { 'id': 3, 'name': 'Part-time', 'description': '' },
    ],
    form: {
        id: '',
        name: '',
        description: ''
    },
};

const getters = {
    employmentTypeForm(state) {
        return state.form;
    },
    list(state) {
        return state.employmentTypes;
    }
}

const mutations = {
    SET_FORM(state, employmentType) {
        state.form = {...employmentType};
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