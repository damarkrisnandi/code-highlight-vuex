import { stringifyUrl } from 'query-string'
import { kirimData } from '../utils/index'
import { URL_API, OPSI_STRINGIFY } from '../constants'

function state() {
  return {
    daftarKode: []
  }
}

const mutations = {
  aturDaftarKode(state, { daftarKode }) {
    state.daftarKode = daftarKode
  },
  resetDaftarKode(state) {
    state.daftarKode = []
  }
}

const actions = {
  async dapatkanSemuaKode({ commit, dispatch }, { userId, filter }) {
    try {
      dispatch('processing/startProcessing', null, { root: true })
      const objekUrl = {
        url: `${URL_API}/code/list`,
        query: {
          page: filter.halaman,
          limit: filter.banyakData,
          sortBy: filter.urutkanBerdasarkan,
          sort: filter.urutkan,
          highlighted: filter.apakahHighlightMenyala
        }
      }
      const url = stringifyUrl(objekUrl, OPSI_STRINGIFY)

      const respon = await kirimData(url, {
        user: userId
      })

      if (respon.success && !respon.error) {
        commit('aturDaftarKode', {
          daftarKode: respon.data
        })
      } else {
        throw new Error(respon.message)
      }
    } catch (error) {
      commit('resetDaftarKode')
      const dataNotifikasiGalat = {
        isShowNotif: true,
        type: 'error',
        message: error.message || 'Silahkan masuk terlebih dahulu'
      }
      dispatch('notification/showNotif', dataNotifikasiGalat, { root: true })
      console.log('1', error)
    } finally {
      dispatch('processing/stopProcessing', null, { root: true })
    }
  },
  async simpanKode({ dispatch }, { userId, konten }) {
    try {
      dispatch('processing/startProcessing', null, { root: true })
      const url = `${URL_API}/code/store`
      const data = {
        user: userId,
        content: {
          code: konten.kode,
          lang: konten.bahasaPemrograman,
          highlight: konten.highlight,
          fileName: konten.namaBerkas,
          twoslash: konten.twoslash
        }
      }

      const respon = await kirimData(url, data)

      if (respon.success && !respon.error) {
        const dataNotifikasi = {
          isShowNotif: true,
          type: 'success',
          message: 'Kode berhasil disimpan'
        }

        await dispatch(`notification/showNotif`, dataNotifikasi, { root: true })
      } else {
        throw new Error(respon.message)
      }
    } catch (error) {
      const dataNotifikasiGalat = {
        isShowNotif: true,
        type: 'error',
        message: error.message || 'Silahkan masuk terlebih dahulu'
      }
      dispatch('notification/showNotif', dataNotifikasiGalat, { root: true })
      console.log('2', error)
    } finally {
      dispatch('processing/stopProcessing', null, { root: true })
    }
  },
  async ubahKode({ dispatch }, { userId, idKode, konten }) {
    try {
      dispatch('processing/startProcessing', null, { root: true })
      const url = `${URL_API}/code/edit`
      const data = {
        id: idKode,
        user: userId,
        content: {
          code: konten.kode,
          lang: konten.bahasaPemrograman,
          highlight: konten.highlight,
          fileName: konten.namaBerkas,
          twoslash: konten.twoslash
        }
      }

      const respon = await kirimData(url, data)

      if (respon.success && !respon.error) {
        const dataNotifikasi = {
          isShowNotif: true,
          type: 'success',
          message: 'Kode berhasil diubah'
        }

        await dispatch(`notification/showNotif`, dataNotifikasi, { root: true })
      } else {
        throw new Error(respon.message)
      }
    } catch (error) {
      const dataNotifikasiGalat = {
        isShowNotif: true,
        type: 'error',
        message: error.message || 'Silahkan masuk terlebih dahulu'
      }
      dispatch('notification/showNotif', dataNotifikasiGalat, { root: true })
      console.log('3', error)
    } finally {
      dispatch('processing/stopProcessing', null, { root: true })
    }
  },
  async hapusKode({ dispatch }, { userId, idKode }) {
    try {
      dispatch('processing/startProcessing', null, { root: true })
      const url = `${URL_API}/code/delete`
      const data = {
        id: idKode,
        user: userId
      }

      const respon = await kirimData(url, data)

      if (respon.success && !respon.error) {
        const dataNotifikasi = {
          isShowNotif: true,
          type: 'success',
          message: 'Kode berhasil dihapus'
        }

        await dispatch(`notification/showNotif`, dataNotifikasi, { root: true })
      } else {
        throw new Error(respon.message)
      }
    } catch (error) {
      const dataNotifikasiGalat = {
        isShowNotif: true,
        type: error,
        message: error.message || 'Silahkan masuk terlebih dahulu'
      }
      dispatch('notification/showNotif', dataNotifikasiGalat, { root: true })
      console.log('4', error)
    } finally {
      dispatch('processing/stopProcessing', null, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
