function state() {
    return {
        isProcessing: false
    }
}

const mutations = {
    setProcess (state, { isProcessing }) {
        state.isProcessing = isProcessing;
    }
}

const actions = {
    startProcessing({ commit }) {
        // ketika processing, maka prosesnya berjalan (isProcessing akan bernilai true)
        commit('setProcess', {
            isProcessing: true
        });
    },

    stopProcessing({ commit }) {
        // ketika stop, maka prosesnya berhenti (isProcessing akan bernilai false)
        commit('setProcess', {
            isProcessing: false
        })

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }