<template>
  <div>
    <!-- <label :for="name">{{ label }}</label> -->
    <input :placeholder="label" :type="type" :value="value" :name="name" :id="name" @input="onChange" class="base-text-input">
  </div>
</template>

<script>
import { formulir } from '../../mixins/index'

export default {
  name: 'AppTextInput',
  mixins: [formulir],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onChange(event) {
      if (this.type === 'number') {
        this.$emit('input', parseInt(event.target.value))
      } else {
        this.$emit('input', event.target.value)
      }
    }
  }
}
</script>
<style scoped>
    .base-text-input {
        width: 95%;
        font-size: 1rem;
        border-radius: 0.25em;
        display: inline-block;
        font: inherit;
        line-height: 1.5em;
        padding: 0.5em 0em 0.5em 1em;
    }
</style>
