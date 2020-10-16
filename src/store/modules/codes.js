function state() {
    return {
        codeList: []  
    }
}

const mutations = {
    setCodeList(state, { codeList }) {
        state.codeList = codeList;
    },
    resetCodeList(state) {
        state.codeList = [];
    }
}

const actions = {
    // getAll({ commit, dispatch }, { userId, filter }) {

    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }