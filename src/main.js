import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bulma/css/bulma.css'
import axios from 'axios'
import 'bulma-pageloader';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
window.axios = axios
Vue.config.productionTip = false
new Vue({
  router,  // add router here
  render: h => h(App)
}).$mount('#app')

