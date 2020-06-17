
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
// import element from './plugins/element'
import element from 'element-ui';
import '@/utils/flv.js'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

const speed = sessionStorage.getItem('ISC-VIDEO-RUN-PTZ-SPEED')
if (!speed) {
  sessionStorage.setItem('ISC-VIDEO-RUN-PTZ-SPEED', 1)
}

import './assets/iconfont/iconfont.css'

import '@/icons' // icon

Vue.use(element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
