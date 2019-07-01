import Vue from 'vue'
import App from './App.vue'
import router from '../../router/indexA'
import store from './store'

Vue.prototype.URL = process.env.VUE_APP_BASEAPI

import '../../assets/util/flexible'
import '../../assets/style/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
