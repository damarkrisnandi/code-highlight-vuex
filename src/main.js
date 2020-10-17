import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './assets/highlighter.css'

import DataCode from './components/preset/DataCode'
import DataLsp from './components/preset/DataLsp'
import DataErr from './components/preset/DataErr'

Vue.config.productionTip = false

Vue.component(DataCode.name, DataCode)
Vue.component(DataLsp.name, DataLsp)
Vue.component(DataErr.name, DataErr)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
