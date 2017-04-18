import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from './store';
import App from './app';
import pages from './pages';
import Request from './utils/request';
import Rem from './utils/rem';
import Components from 'components';
import Modules from 'modules';

Vue.use(Request);
Vue.use(VueRouter);

// 引入模块
Object.keys(Components).map(_key => {
    Vue.component(_key, Components[_key]);
});
Object.keys(Modules).map(_key => {
    Vue.component(_key, Modules[_key]);
});

// 引入页面
const routes = [{
    path: '/',
    redirect: '/main',
}, ...eachRoutes(pages), {
    path: '*',
    redirect: '/404',
}]
const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})

function eachRoutes(_routeList) {
    let _routes = [];
    for (let key in _routeList) {
        _routes.push({
            ..._routeList[key].route,
            component: _routeList[key]
        });
    }
    return _routes;
}

new Vue({
    el: '#app',
    ...App,
    router,
    // store
})

console.log(VERSION);