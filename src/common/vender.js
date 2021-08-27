import VueClipboard from 'vue-clipboard-plus'
import Cookie from 'js-cookie'
import Dayjs from 'dayjs';


export default {
    install: function (Vue) {
        /*--- 组件库全局注册 ---*/
        VueClipboard.config.autoSetContainer = true;
        Vue.use(VueClipboard);

        /*--- 插件全局挂载  ---*/
        Object.defineProperty(Vue.prototype, '$cookie', { value: Cookie });
        Object.defineProperty(Vue.prototype, '$dayjs', { value: Dayjs });
    }
}