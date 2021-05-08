import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/api/mock/index.js'
import Api from '@/api/axios/index.js'
Vue.prototype.$api = Api;
import Plugins from '@/plugins'
Vue.use(Plugins);
// import Directives from '@/directives'
// Vue.use(Directives);
// import Authorize from '@/mixins/authorize';
// Vue.mixin(Authorize);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
