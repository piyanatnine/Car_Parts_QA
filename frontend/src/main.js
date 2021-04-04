import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bulma/css/bulma.css'
import axios from 'axios'
import VideoBg from 'vue-videobg'

window.axios = axios
Vue.config.productionTip = false
Vue.component('video-bg', VideoBg)

new Vue({
  router,  // add router here
  render: h => h(App)
}).$mount('#app')

