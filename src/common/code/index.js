const modules = {};
const files = require.context('./modules', false, /\.js$/);
files.keys().forEach((item) => {
    Object.assign(modules, files(item).default)
});
export default modules;