import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/util/rem.js';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
