// import Underscore from 'underscore';
import Axios from 'axios';

export default {
    install: function (Vue) {
        // Object.defineProperty(Vue.prototype, '$underscore', { value: Underscore });
        Object.defineProperty(Vue.prototype, '$axios', { value: Axios });
    }
}