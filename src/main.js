import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'

/*--- 自定义插件 ---*/
import Plugins from '@/common/plugins.js'
Vue.use(Plugins);

/*--- 第三方依赖 ---*/
import Vender from '@/common/vender.js'
Vue.use(Vender);

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
