const install = function (Vue) {
    const files = require.context('./modules', false, /\.js$/);
    files.keys().forEach((item) => {
        Vue.directive(files(item).default.directName, files(item).default);
    });
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}