const state = {
    positions: [
        { 'id': 1, 'name': 'Manager', 'description': '' },
        { 'id': 2, 'name': 'Supervisor', 'description': '' },
        { 'id': 3, 'name': 'HR', 'description': '' },
        { 'id': 3, 'name': 'Accountant', 'description': '' },
        { 'id': 3, 'name': 'Office Staff', 'description': '' },
    ],
    form: {
        id: '',
        name: '',
        description: ''
    },
};

const getters = {
    positionForm(state) {
        return state.form;
    },
    list(state) {
        return state.positions;
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