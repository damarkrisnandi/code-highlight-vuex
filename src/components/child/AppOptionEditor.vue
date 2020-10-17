<template>
  <section class="editor-opsi">
    <div class="d-flex">
        <app-dropdown
          :value="bahasaPemrogramanTerpilih"
          name="bahasa-pemrograman"
          label="Pilih Bahasa Pemrograman"
          class="margin-component"
          :list="daftarBahasaPemrograman"
          @input="$emit('update:bahasaPemrogramanTerpilih', $event)"
        ></app-dropdown>
    <app-dropdown
        v-if="bahasaPemrogramanTerpilih === 'typescript' || bahasaPemrogramanTerpilih === 'json'"
        :value="bahasaPemrogramanTerpilih"
        name="two-slash"
        label="Pilih Two Slash"
        class="margin-component"
        :list="daftarTwoslash"
        @input="$emit('update:twoslashTerpilihTerpilih', $event)"
        ></app-dropdown>
    </div>
    <app-text-input
        :value="namaBerkas"
      name="nama-berkas"
      label="Nama Berkas"
      class="margin-component"
      @input="$emit('update:namaBerkas', $event)"
    >
    </app-text-input>
    <app-text-input
        :value="highlight"
      name="highlight"
      label="Baris Highlight"
      class="margin-component"
      @input="$emit('update:highlight', $event)"
    >
    </app-text-input>
    <div class="flex-button">
        <app-button
            name="reset"
            label="Reset"
            class="margin-component"
            color="error"
            @onClick="$emit('reset')"
        />
        <app-button
            v-if="hasilHighlight && hasilHighlight.length > 0"
            name="unduh"
            label="Unduh"
            class="margin-component"
            @onClick="ketikaTombolUnduhDiKlik"
        />
        <app-button
            v-if="$store.state.user.userId"
            name="simpan"
            label="Simpan"
            class="margin-component"
            @onClick="ketikaTombolSimpanDiKlik"
        />
    </div>
  </section>
</template>

<script>
import { stringifyUrl } from 'query-string'
import cleanDeep from 'clean-deep'

import {
  validator,
  dapatkanOpsi,
  unduhKode
} from '../../utils'
import { URL_API, OPSI_STRINGIFY } from '../../constants'

import AppButton from '../base/AppButton'
import AppTextInput from '../base/AppTextInput'
import AppDropdown from '../base/AppDropDown'

export default {
    name: 'AppOptionEditor',
  components: {
    AppButton,
    AppTextInput,
    AppDropdown
  },
  props: {
    inputKode: {
      required: true,
      validator
    },
    bahasaPemrogramanTerpilih: {
      required: true,
      validator
    },
    twoslashTerpilih: {
      required: true,
      validator
    },
    namaBerkas: {
      required: true,
      validator
    },
    highlight: {
      required: true,
      validator
    },
    hasilHighlight: {
      required: true,
      validator
    }
  },
  data() {
    return {
      daftarBahasaPemrograman: [],
      daftarTwoslash: ['twoslash', 'tsconfig']
    }
  },
  created() {
    this.dapatkanDaftarBahasaPemrograman()
  },
  methods: {
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
    async ketikaTombolUnduhDiKlik() {
      try {
        this.$store.dispatch('processing/startProcessing', null)
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.bahasaPemrogramanTerpilih,
            fileName: this.namaBerkas,
            highlight: this.highlight,
            twoslash: this.twoslashTerpilih,
            download: 1
          }
        }
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY)
        await unduhKode(url, {
          code: this.inputKode
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
          kode: this.inputKode,
          bahasaPemrograman: this.bahasaPemrogramanTerpilih,
          highlight: this.highlight,
          namaBerkas: this.namaBerkas,
          twoslash: this.twoslashTerpilih
        })
        await this.$store.dispatch('kode/simpanKode', {
          userId: this.$store.state.user.userId,
          konten: konten
        })
        await this.$emit('tersimpan')
      } catch (error) {
        const dataNotifikasiGalat = {
          isShowNotif: true,
          message: error.message || 'Gagal menyimpan'
        }
        this.$store.dispatch('notification/showNotif', dataNotifikasiGalat)
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
    .editor-opsi {
        width: 30%;
    }

    .margin-component {
        /* margin: -20px; */
    }

    .margin-component {
        margin: 2px 2px 0 0;
    }
    
    .flex-button {
        display: flex;
        flex-direction: row;
        flex-basis: 1;
    }

    .d-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>