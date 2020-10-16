<template>
  <div>
    <app-user @keluar="ketikaTombolResetDiKlik" />
    <div class="container">
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
    </div>
    <app-notification></app-notification>
    <app-loading></app-loading>
  </div>
</template>

<script>
  import AppNotification from './base/AppNotification';
  import AppLoading from './base/AppLoading';
  import AppUser from './child/AppUser';
  import AppOptionEditor from './child/AppOptionEditor';
  export default {
    name: 'AppParent',

    data: () => ({
      panel: [0],
      disabled: false,
      readonly: false,
      disabledCodes: true,
      user: null,
      dataKode: {
        inputKode: null,
        bahasaPemrogramanTerpilih: null,
        namaBerkas: null,
        highlight: null,
        twoslashTerpilih: null,
      },
      hasilHighlight: ''
    }),
    components: {
      AppNotification, 
      AppLoading, 
      AppUser, 
      AppOptionEditor
    },
    async created() {
      await this.dapatkanDaftarKode();
    },
    methods: {
      ketikaTombolResetDiKlik() {
        this.dataKode = {
          inputKode: null,
          bahasaPemrogramanTerpilih: 'typescript',
          namaBerkas: null,
          highlight: null,
          twoslashTerpilih: null,
        }
      }
    },
    async dapatkanDaftarKode() {
      await this.$store.dispatch('kode/dapatkanSemuaKode', {
        idPengguna: this.$store.state.pengguna.idPengguna,
        filter: {
          halaman: this.filter.halaman,
          banyakData: this.filter.banyakData,
          urutkanBerdasarkan: this.filter.urutkanBerdasarkan,
          urutkan: this.filter.urutkan,
          apakahHighlightMenyala: this.filter.apakahHighlightMenyala
        }
      })
    }
  }
</script>
<style scoped>

</style>
