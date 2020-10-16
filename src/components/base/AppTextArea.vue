<template>
  <div>
    <!-- <v-textarea
        :name="name"
        :label="label"
        :value="value"
        @input="onChange"
    ></v-textarea> -->
    <label :for="name">{{ label }}</label>    
    <textarea :name="name" :id="name" :value="value" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import { formulir } from '../../mixins/index'

export default {
  name: 'AppTextArea',
  mixins: [formulir],
  props: {
  },
  methods: {
    onChange(event) {
    //   if (this.tipe === 'number') {
    //     this.$emit('input', parseInt(event.target.value))
    //   } else {
        this.$emit('input', event.target.value)
    //   }
    }
  }
}
</script>
