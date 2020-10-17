<template>
  <section class="code-editor">
      <app-text-area 
        :value="inputKode"
        name="input-kode"
        label="Input Kode"
        @input="$emit('update:inputKode', $event)"
        style="width: 50%; margin-right: 2px;"
      />
      <app-code
        v-if="inputKode !== null && inputKode !== '' && $store.state.user.userId"
        :kode="hasilHighlight"
        :bahasa-pemrograman="bahasaPemrogramanTerpilih"
        class="tampilan-kode--kustom"
        style="width: 50%; margin-right: 2px;"
      />
    <!-- <app-card :lang="bahasaPemrograman">
          <template v-slot:code>
                      
          </template>
          <template v-slot:button>
              
          </template>
      </app-card> -->
    
  </section>
</template>

<script>
import AppCode from './AppCode'
import AppTextArea from '../base/AppTextArea'
// import AppCard from '../base/AppCard'

import { validator } from '../../utils'

export default {
  name: 'AppCodeEditor',
  components: {
    AppCode,
    AppTextArea,
    // AppCard
  },
  props: {
    inputKode: {
      default: '',
      required: true,
      validator
    },
    hasilHighlight: {
      type: String,
      default: '',
      required: true
    },
    bahasaPemrogramanTerpilih: {
      default: '',
      required: true,
      validator
    }
  }
}
</script>
<style scoped>
  .code-editor {
    margin-top: 2px;
    display: flex;
  }
</style>