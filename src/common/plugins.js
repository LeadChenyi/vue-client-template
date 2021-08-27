import { Request, UploadFile, DownloadFile } from '@/api/axios/index.js';
import Config from '@/common/config.js';
import Utils from '@/common/utils.js';
// import '@/api/mock/index.js';

export default {
    install: function (Vue) {
        /*--- Object.defineProperty 自动排除重复的插件引用 ---*/
        Object.defineProperty(Vue.prototype, '$request', { value: Request });
        Object.defineProperty(Vue.prototype, '$uploadFile', { value: UploadFile });
        Object.defineProperty(Vue.prototype, '$downloadFile', { value: DownloadFile });
        Object.defineProperty(Vue.prototype, '$config', { value: Config });
        Object.defineProperty(Vue.prototype, '$utils', { value: Utils });
    }
}