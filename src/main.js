import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'

// 数据模拟与网络请求
// import '@/api/mock/index.js'
import Api from '@/api/axios/index.js'
Vue.prototype.$api = Api;

// 自定义脚本插件
import Code from '@/common/code'
Vue.prototype.$code = Code;

// 第三方插件代理注册
import Plugins from '@/plugins'
Vue.use(Plugins);

// 指令注册
// import Directives from '@/directives'
// Vue.use(Directives);

// 混入对象
// import Authorize from '@/mixins/authorize';
// Vue.mixin(Authorize);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
