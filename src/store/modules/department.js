const state = {
    departments: [
        { 'id': 1, 'name': 'IT Department', 'description': '' },
        { 'id': 2, 'name': 'Accounting Department', 'description': '' },
        { 'id': 3, 'name': 'HR Department', 'description': '' },
    ],
    form: {
        id: '',
        name: '',
        description: ''
    },
};

const getters = {
    departmentForm(state) {
        return state.form;
    },
    list(state) {
        return state.departments;
    }
}

const mutations = {
    SET_FORM(state, position) {
        state.form = {...position};
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