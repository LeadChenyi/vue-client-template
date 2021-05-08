import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

let baseRouters = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/pages/index')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/about')
    }
];

const files = require.context('./modules', false, /\.js$/);
files.keys().forEach((item) => {
    baseRouters = [...baseRouters, ...files(item).default];
});
baseRouters.push({
    path: '/*',
    redirect: { name: 'Index' }
});
const routers = new VueRouter({
    mode: 'history',
    routes: baseRouters
});

export default routers;