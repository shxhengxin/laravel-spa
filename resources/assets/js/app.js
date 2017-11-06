/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import router from './routes';//引入路由文件
import store from './store/index';
import jwtToken from './helpers/jwt';
import App from './components/App';
//表单验证  http://vee-validate.logaretm.com/localization.html#translation
//import zh_CN from 'vee-validate/dist/locale/zh_CN';
import zh_CN from './locale/zh_CN';
import VeeValidate, {Validator} from 'vee-validate';

//axios设置
axios.interceptors.request.use(function (config) {

    if (jwtToken.getToken()) {
        config.headers['Authorization'] = 'Bearer ' + jwtToken.getToken();
    }
    return config;
}, function (error) {
    //"use strict";
    return Promise.reject(error);

});

// Add locale helper.
Validator.addLocale(zh_CN);
Vue.use(VueRouter);


// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
    locale: 'zh_CN'
});

//注册全局组件
Vue.component('app', App);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
new Vue({
    el: '#app',
    router,
    store
});
