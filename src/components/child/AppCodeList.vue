<template>
  <section class="daftar-kode flex">
    <app-code
      v-for="itemKode in $store.state.kode.daftarKode"
      :key="itemKode.id"
      :id-kode="itemKode.id"
      :kode="itemKode.code"
      :bahasa-pemrograman="itemKode.lang"
      :apakah-highlight-menyala="apakahHighlightMenyala"
      @terhapus="dapatkanDaftarKode"
      class="items"
    />
  </section>
</template>

<script>
import AppCode from './AppCode'

export default {
  components: {
    AppCode
  },
  props: {
    apakahHighlightMenyala: {
      type: Number,
      default: 1,
      required: true
    },
    dapatkanDaftarKode: {
      type: Function,
      default() {
        return () => {}
      },
      required: true
    }
  }
}
</script>
<style scoped>
    .flex {
        display: flex;
    }

    .items {
        width: 50%;
        margin: 0px 2px 2px 0px;
    }
</style>
