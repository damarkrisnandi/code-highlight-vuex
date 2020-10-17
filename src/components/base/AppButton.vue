<template>
  <div>
      <button
        :disabled="disabled"
        @click="onClick"
        :class='`${color} base-button`'
      >{{ label.toUpperCase() }}
      </button>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
        type: String,
        default: 'primary'
    }
  },
  methods: {
    onClick(evt) {
      this.$emit('onClick', evt)
    }
  }
}
</script>
<style scoped>
    .base-button {
        border-width: 0;
        padding: 15px;
        width: 120px;
        height: 2.8em;
        font-size: 15px;
        font-family: 'Roboto';
    }
    .primary {
        background-color:royalblue;
        color: white;
    }
    .primary:hover {
        background-color: lightgray;
        color: royalblue;
    }

    .success {
        background-color: limegreen;
        color: white;
    }
    .success:hover {
        background-color: lightgray;
        color: limegreen
    }

    .error {
        background-color:orangered;
        color: white;
    }
    .error:hover {
        background-color: lightgray;
        color: orangered;
    }

    .tab {
        background-color: lightslategray;
        color: white;
    }
    .tab:hover {
        background-color:  lightgray;
        color: lightslategray;
    }
</style>
