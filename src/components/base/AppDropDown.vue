<template>
  <div :class="`opsi-formulir-${name}`" class="opsi-formulir">
    <!-- <label :for="name">{{ label }}:</label> -->

    <select
      :id="name"
      class="margin-left base-dropdown minimal"
      @change="ketikaNilaiBerubah"
    >
      <option value="">{{ label }}</option>
      <option
        v-for="(pilihan, i) in list"
        :key="i"
        :value="nilaiPilihan(pilihan)"
        :selected="apakahTerpilih(pilihan)"
      >
        {{ tampilanPilihan(pilihan) }}
      </option>
    </select>
  </div>
</template>

<script>
import { formulir } from '../../mixins'

export default {
  name: 'AppDropDown',
  mixins: [formulir],
  props: {
    list: {
      type: Array,
    //   required: true,
      default() {
        return []
      }
    },
    daftarPilihanBerbentukObjek: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    apakahTerpilih() {
      return (pilihan) => {
        if (this.daftarPilihanBerbentukObjek) {
          return this.value === pilihan.nilai
        }
        return this.value === pilihan
      }
    },
    tampilanPilihan() {
      return (pilihan) => {
        if (this.daftarPilihanBerbentukObjek) {
          return pilihan.teks
        }
        return pilihan
      }
    },
    nilaiPilihan() {
      return (pilihan) => {
        if (this.daftarPilihanBerbentukObjek) {
          return pilihan.nilai
        }
        return pilihan
      }
    }
  },
  methods: {
    ketikaNilaiBerubah(event) {
      if (event.target.value && event.target.value.length > 0) {
        this.$emit('input', event.target.value)
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>
<style scoped>
    @import '../styles/custom-select.css';
    .base-dropdown {
        width: 100%;
        border-width: 2px;
    }
</style>
