<template>
  <div>
    <app-user @keluar="ketikaTombolResetDiKlik" />
    <div class="container">
      <div class="title">
        <h1 style="color: black">Code Highlighter</h1>
        <label>Beautify Your Code Here...</label>
      </div>
      <div class="flex-tab">
        <app-button 
        name="code-editor"
        label="Editor"
        class="space"
        color="tab"
        @onClick="klikTabEditor"
        />
        <app-button 
        v-if="$store.state.user.userId"
        name="code-list"
        label="List"
        class="space"
        color="tab"
        @onClick="klikTabCodeList"
        />
      </div>
      <div v-if="showCodeEditor || !$store.state.user.userId" style="margin-top: 50px">
        <app-option-editor
        :input-kode="dataKode.inputKode"
        :bahasa-pemrograman-terpilih.sync="dataKode.bahasaPemrogramanTerpilih"
        :twoslash-terpilih.sync="dataKode.twoslashTerpilih"
        :nama-berkas.sync="dataKode.namaBerkas"
        :highlight.sync="dataKode.highlight"
        :hasil-highlight="hasilHighlight"
        @tersimpan="dapatkanDaftarKode()"
        @reset="ketikaTombolResetDiKlik"
        />
        <app-code-editor
          :input-kode.sync="dataKode.inputKode"
          :hasil-highlight="hasilHighlight"
          :bahasa-pemrograman-terpilih="dataKode.bahasaPemrogramanTerpilih"
        />
      </div>
      
    <div v-if="$store.state.user.userId && !showCodeEditor" style="margin-top: 50px">
      <app-code-list-option
        :halaman.sync="filter.halaman"
        :banyak-data.sync="filter.banyakData"
        :urutkan-berdasarkan.sync="filter.urutkanBerdasarkan"
        :urutkan.sync="filter.urutkan"
        :apakah-highlight-menyala.sync="filter.apakahHighlightMenyala"
      />

      <app-code-list
        :apakah-highlight-menyala="filter.apakahHighlightMenyala"
        :dapatkan-daftar-kode="dapatkanDaftarKode"
      />
    </div>
    </div>
    <app-notification></app-notification>
    <app-loading></app-loading>
  </div>
</template>

<script>
  import { stringifyUrl } from 'query-string'
  import debounce from 'debounce-fn'
  import cleanDeep from 'clean-deep'

  import AppNotification from './base/AppNotification';
  import AppLoading from './base/AppLoading';

  import AppUser from './child/AppUser';
  import AppOptionEditor from './child/AppOptionEditor';
  import AppCodeEditor from './child/AppCodeEditor';
  import AppCodeListOption from './child/AppCodeListOption';
  import AppCodeList from './child/AppCodeList';
  import AppButton from './base/AppButton';

  import { dapatkanOpsi, kirimData, unduhKode } from '../utils'
  import { URL_API, OPSI_STRINGIFY } from '../constants'
  export default {
    name: 'AppParent',
    components: {
      AppNotification,
      AppLoading,
      AppUser,
      AppOptionEditor,
      AppCodeEditor,
      AppCodeListOption,
      AppCodeList,
      AppButton
    },
    data() {
    return {
      dataKode: {
        inputKode: null,
        bahasaPemrogramanTerpilih: null,
        namaBerkas: null,
        highlight: null,
        twoslashTerpilih: null,
      },
      filter: {
        halaman: 1,
        banyakData: 6,
        urutkanBerdasarkan: 'createdAt',
        urutkan: 'DESC',
        apakahHighlightMenyala: 1
      },
      hasilHighlight: '',
      daftarBahasaPemrograman: [],
      showCodeEditor: true
    }
  },
  watch: {
    '$store.state.user.userName'(userName) {
      if (userName) {
        this.dapatkanDaftarKode()
      }
    },
    dataKode: {
      handler: debounce(function(dataKode) {
        this.hasilHighlight = ''
        this.highlighter(dataKode.inputKode)
      }, { wait: 500 }),
      deep: true
    },
    filter: {
      handler: debounce(function() {
        this.dapatkanDaftarKode()
      }, { wait: 500 }),
      deep: true
    }
  },
  async created() {
    await this.dapatkanDaftarBahasaPemrograman()
    await this.dapatkanDaftarKode()
  },
  methods: {
    ketikaTombolResetDiKlik() {
      this.dataKode = {
        inputKode: null,
        bahasaPemrogramanTerpilih: 'typescript',
        namaBerkas: null,
        highlight: null,
        twoslashTerpilih: null,
      };
      this.showCodeEditor = true;
    },
    async dapatkanDaftarKode() {
      await this.$store.dispatch('kode/dapatkanSemuaKode', {
        userId: this.$store.state.user.userId,
        filter: {
          halaman: this.filter.halaman,
          banyakData: this.filter.banyakData,
          urutkanBerdasarkan: this.filter.urutkanBerdasarkan,
          urutkan: this.filter.urutkan,
          apakahHighlightMenyala: this.filter.apakahHighlightMenyala
        }
      })
    },
    async ketikaTombolUnduhDiKlik() {
      try {
        this.$store.dispatch('processing/showProcessing', null)
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.dataKode.bahasaPemrogramanTerpilih,
            fileName: this.dataKode.namaBerkas,
            highlight: this.dataKode.highlight,
            twoslash: this.dataKode.twoslashTerpilih,
            download: 1
          }
        }
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY)
        await unduhKode(url, {
          code: this.dataKode.inputKode
        })
      } catch (error) {
        const dataNotifikasiGalat = {
          isShowNotif: true,
          message: error.message || 'Gagal mengunduh'
        }
        this.$store.dispatch('notification/showNotif', dataNotifikasiGalat)
        console.log(error)
      } finally {
        this.$store.dispatch('processing/stopProcessing', null)
      }
    },
    async ketikaTombolSimpanDiKlik() {
      try {
        const konten = cleanDeep({
          kode: this.dataKode.inputKode,
          bahasaPemrograman: this.dataKode.bahasaPemrogramanTerpilih,
          highlight: this.dataKode.highlight,
          namaBerkas: this.dataKode.namaBerkas,
          twoslash: this.dataKode.twoslashTerpilih
        })
        await this.$store.dispatch('kode/simpanKode', {
          userName: this.$store.state.user.userName,
          konten: konten
        })
        await this.dapatkanDaftarKode()
      } catch (error) {
        const dataNotifikasiGalat = {
          isShowNotif: true,
          message: error.message || 'Gagal menyimpan'
        }
        this.$store.dispatch('notification/showNotif', dataNotifikasiGalat)
        console.log(error)
      }
    },
    async dapatkanDaftarBahasaPemrograman() {
      try {
        const respon = await dapatkanOpsi()
        if (respon.success && !respon.error) {
          this.daftarBahasaPemrograman = respon.data.languages
        }
      } catch (error) {
        const dataNotifikasiGalat = {
          isShowNotif: true,
          message: error.message
        }
        this.$store.dispatch('notification/showNotif', dataNotifikasiGalat)
        console.log(error)
      }
    },
    async highlighter(inputKode, download) {
      try {
        this.$store.dispatch('processing/showProcessing', null)
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.dataKode.bahasaPemrogramanTerpilih,
            fileName: this.dataKode.namaBerkas,
            highlight: this.dataKode.highlight,
            twoslash: this.dataKode.twoslashTerpilih,
            download
          }
        }
        console.log(objekUrl, OPSI_STRINGIFY);
        console.log(stringifyUrl(objekUrl, OPSI_STRINGIFY))
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY)
        

        const respon = await kirimData(url, {
          code: inputKode
        })

        if (respon.success && !respon.error) {
          this.hasilHighlight = respon.data
        } else {
          throw new Error(respon.message)
        }
      } catch (error) {
        const dataNotifikasiGalat = {
          isShowNotif: true,
          message: error.message || 'Bahasa Pemrograman dan Kode wajib diisi'
        }
        this.$store.dispatch('notification/showNotif', dataNotifikasiGalat)
        console.log(error)
      } finally {
        this.$store.dispatch('processing/stopProcessing', null)
      }
    },
    klikTabEditor() {
      this.showCodeEditor = true;
    },
    klikTabCodeList() {
      this.showCodeEditor = false;
    }
  }
  }
</script>
<style scoped>
  .title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 30px;
    flex-direction: column;
  }
  .flex-tab {
    display: flex;
    flex-direction: row;
  }
</style>
