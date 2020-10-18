<template id="main">
  <div id="app">
    <app-parent/>
  </div>
</template>

<script>
import AppParent from './components/AppParent.vue'

export default {
  name: 'App',
  components: {
    AppParent
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
  /* @import './components/styles/container.css'; */

  #app {
    font-family: 'Roboto';
    background: lightsteelblue;
  }

  #main {
    background-color: lightgrey;
  }

  .space {
    margin: 2px;
  }

</style>
