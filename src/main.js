import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './plugins' // 引入

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
