function state() {
    return {
        isShowNotif: false,
        message: '',
        type: 'info'
    }
}

const mutations = {
    setDataNotif(state, { isShowNotif, message, type }) {
        state.isShowNotif = isShowNotif;
        state.message = message;
        state.type = type;
    }
}

const actions = {
    showNotif({ commit }, { message, type }) {
        commit('setDataNotif', {
            isShowNotif: true,
            message, type
        });
        setTimeout(() => {
            commit('setDataNotif', {
                isShowNotif: false,
                message, type
            }); 
        }, 3000)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }