import { UserService } from "../../utils/service";

function state() {
    return {
        userName: null,
        userId: null
    }
}

const mutations = {
    setDataUser(state, { userName, userId }) {
        state.userName = userName;
        state.userId = userId;
    },

    resetDataUser(state) {
        state.userName = null;
        state.userId = null;
    }
}

const actions = {
    async login({ commit, dispatch }, { userName }) {
        try {
            // mulai proses login
        dispatch('processing/startProcessing', null, { root: true });

        // ambil data dari API
        const response = await new UserService().login(userName);
        if (response.success && !response.error) {
            // set data usernya pada state dari API
            commit('setDataUser', {
                userName: response.data.name,
                userId: response.data.id
            });
            // tampilkan notifikasi sukses login
            
            await dispatch('notification/showNotif', {
                message: `Login berhasil!`,
                type: 'success'
            }, {root: true});
        } else {
            // jika gagal, throw error
            throw new Error(response.message)
        }
        } catch (error) {
            // handle error dan tampilkan notifikasi gagal login
            let message = error.message;
            if (message === 'User is not found') message = 'Harap register atau gunakan user yang sudah ada'
            dispatch('notification/showNotif', {
                message: `Login Gagal, ${message}`,
                type: 'error'
            }, {root: true});
        } finally {
            // hentikan proses login
            dispatch('processing/stopProcessing', null, { root: true });
        }
    },
    async register({ commit, dispatch }, { userName }) {
        try {
            // mulai proses login
        dispatch('processing/startProcessing', null, { root: true });

        // ambil data dari API
        const response = await new UserService().register(userName);
        if (response.success && !response.error) {
            // set data usernya pada state dari API
            commit('setDataUser', {
                userName: response.data.name,
                userId: response.data.id
            });
            // tampilkan notifikasi sukses login
            await dispatch('notification/showNotif', {
                message: 'Regiter berhasil!',
                type: 'success'
            }, {root: true});
        } else {
            // jika gagal, throw error
            throw new Error(response.message)
        }
        } catch (error) {
            // handle error dan tampilkan notifikasi gagal login
            let msg = error.message === 'User is already registered' ? 
            'User terlah terdaftar, klik login untuk masuk' : 'Registrasi Gagal';
            dispatch('notification/showNotif', {
                message: msg,
                type: 'error'
            }, {root: true});
        } finally {
            // hentikan proses login
            dispatch('processing/stopProcessing', null, { root: true });
        }
    },
    logout({ commit, dispatch }) {
        // reset data user
        commit('resetDataUser', null);
        // reset code list
        // commit('kode/resetDaftarKode', null, { root: true })
        // tampilkan notifikasi
        dispatch('notification/showNotif', {
            message: `Logout Sukses!`,
            type: 'success'
        }, {root: true});

    }  
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }