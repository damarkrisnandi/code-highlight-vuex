<template>
  <div class="tampilan-kode">
      <app-card :lang="bahasaPemrograman">
          <template v-slot:code>
              <data-code
                :code="kode"
                :lang="bahasaPemrograman"
                :is-highlighted="apakahHighlightMenyala"
                />
          </template>
          <template v-slot:button>
              <app-button
                v-if="idKode"
                :name="idKode"
                label="Hapus"
                type="error"
                class="margin-bottom-right"
                @onClick="ketikaTombolHapusDiKlik"
            />
          </template>
      </app-card>
    
    
  </div>
</template>

<script>
import { validator } from '../../utils'
import DataCode from '../preset/DataCode'
import AppButton from '../base/AppButton'
import AppCard from '../base/AppCard'

export default {
  name: 'AppCode',
  components: {
      DataCode,
      AppButton,
      AppCard
  },
  props: {
    idKode: {
      type: String,
      default: null
    },
    kode: {
      default: '',
      required: true,
      validator
    },
    bahasaPemrograman: {
      default: '',
      required: true,
      validator
    },
    apakahHighlightMenyala: {
      type: Number,
      default: 1
    }
  },
  methods: {
    async ketikaTombolHapusDiKlik() {
      const hasilKonfirmasi = confirm('Apakah kamu yakin?')
      if (hasilKonfirmasi && this.idKode) {
        await this.$store.dispatch('kode/hapusKode', {
          userId: this.$store.state.user.userId,
          idKode: this.idKode
        })
        await this.$emit('terhapus')
      }
    }
  }
}
</script>
