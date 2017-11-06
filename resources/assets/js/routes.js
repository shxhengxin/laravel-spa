import VueRouter from 'vue-router';
import Store from './store/index';
import jwtToken from './helpers/jwt';

let routes = [
    {
        path: '/',
        name: 'home',
        component: require('./components/pages/Home'),
        meta: {title: '首页'}
    },
    {
        path: '/about',
        component: require('./components/pages/About'),
        meta: {}
    },
    {
        path: '/posts/:id',
        name: 'posts',
        component: require('./components/posts/Post'),
        meta: {title: '文章详细页'}
    },
    {
        path: '/register',
        name: 'register',
        component: require('./components/register/Register'),
        meta: {title: '注册页', requiresGuest: true}
    },
    {
        path: '/login',
        name: 'login',
        component: require('./components/login/Login'),
        meta: {title: '登录页', requiresGuest: true}
    },
    {
        path: '/confirm',
        name: 'confirm',
        component: require('./components/confirm/Email'),
        meta: {title: '邮件发送页'}
    },
    {
        path: '/profile',
        name: 'profile',
        component: require('./components/user/Profile'),
        meta: {requiresAuth: true, title: ''}
    }

];


const router = new VueRouter({
    mode: 'history',
    routes
});

// 全局导航钩子
router.beforeEach((to, from, next) => {

    //修改页面的title
    document.title = to.meta.title || '首页';
    if (to.meta.requiresAuth) {//验证是否登录
        if (Store.state.AuthUser.authenticated || jwtToken.getToken()) {
            //认证过的用户
            return next();
        } else {
            return next({'name': 'login'});
        }
    }
    if (to.meta.requiresGuest) {//验证是否登录
        //console.log(jwtToken.getToken());
        if (Store.state.AuthUser.authenticated || jwtToken.getToken()) {
            //认证过的用户，跳转到首页
            return next({'name': 'home'});
        } else {
            return next();
        }
    }
    next();
});


export default router;