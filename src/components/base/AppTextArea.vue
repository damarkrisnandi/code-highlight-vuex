<template>
  <div>
    <textarea :placeholder="label" :name="name" :id="name" :value="value" @input="onChange" cols="30" rows="10" class="base-text-area"></textarea>
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
<style scoped>
    .base-text-area {
        width: 100%;
        height: 100%;
        resize: none;
        font-size: 1rem;
        border-radius: 0.25em;
        border-style: inset;
        border-width: 2px;
        display: inline-block;
        font: inherit;
        padding: 0.5em 0em 0.5em 1em;
    }
</style>
