<template>
  <section class="opsi-daftar-kode">
    <div class="d-flex">
      <app-button
        name="sebelumnya"
        label="Prev"
        class="margin-bottom-right"
        :disabled="halaman === 1"
        @onClick="ketikaTombolSebelumnyaDiKlik"
      />
      &nbsp;
      <app-button
        name="selanjutnya"
        label="Next"
        class="margin-bottom-right"
        @onClick="ketikaTombolSelanjutnyaDiKlik"
      />
      
    </div>
    <div class="d-flex">
        <app-text-input 
        :value="banyakData" 
        name="banyak data" 
        label="Banyak Data" 
        class="margin-bottom-right"
        type="number"
        @input="$emit('update:banyakData', $event)"
        />
    <app-dropdown
      :value="urutkanBerdasarkan"
      name="urutkan-berdasarkan"
      label="Urutkan Berdasarkan"
      class="margin-bottom-right"
      :list="daftarUrutkanBerdasarkan"
      :daftar-pilihan-berbentuk-objek="true"
      @input="$emit('update:urutkanBerdasarkan', $event)"
    />
    <app-dropdown
      :value="urutkan"
      name="urutkan"
      label="Urutkan"
      class="margin-bottom-right"
      :list="daftarUrutkan"
      :daftar-pilihan-berbentuk-objek="true"
      @input="$emit('update:urutkan', $event)"
    />
    </div>
  </section>
</template>

<script>
import AppButton from '../base/AppButton';
import AppDropdown from '../base/AppDropDown';
import AppTextInput from '../base/AppTextInput';
export default {
name: 'AppCodeListOption',
  props: {
    halaman: {
      type: Number,
      required: true,
      default: 1
    },
    banyakData: {
      type: Number,
      required: true,
      default: 5
    },
    urutkanBerdasarkan: {
      type: String,
      required: true,
      default: 'fileName'
    },
    urutkan: {
      type: String,
      required: true,
      default: 'DESC'
    },
    apakahHighlightMenyala: {
      type: Number,
      required: true,
      default: 1
    }
  },
  components: {
      AppButton,
      AppDropdown,
      AppTextInput
  },
  data() {
    return {
      daftarHighlightMenyala: [
        { nilai: 1, teks: 'Menyala' },
        { nilai: 0, teks: 'Tidak Menyala' }
      ],
      daftarUrutkanBerdasarkan: [
        { nilai: 'fileName', teks: 'Nama Berkas' },
        { nilai: 'lang', teks: 'Bahasa Pemrograman' },
        { nilai: 'createdAt', teks: 'Kapan Dibuat' }
      ]
    }
  },
  computed: {
    daftarUrutkan() {
      if (this.urutkanBerdasarkan === 'createdAt') {
        return [
          { nilai: 'ASC', teks: 'Terlama' },
          { nilai: 'DESC', teks: 'Terbaru' }
        ]
      }
      return [
        { nilai: 'ASC', teks: 'A-Z' },
        { nilai: 'DESC', teks: 'Z-A' }
      ]
    }
  },
  methods: {
    ketikaTombolSebelumnyaDiKlik() {
      if (this.halaman - 1 < 1) {
        return
      }
      this.$emit('update:halaman', this.halaman - 1)
    },
    ketikaTombolSelanjutnyaDiKlik() {
      this.$emit('update:halaman', this.halaman + 1)
    }
  }
}
</script>
<style scoped>
    .d-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .margin-bottom-right {
        margin: 0px 2px 2px 0px;
    }
</style>
