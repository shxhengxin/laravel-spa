import Cookie from 'js-cookie'
export default {
    //设置token
    setToken(token) {
        window.localStorage.setItem('jwt_token', token);
    },
    //获取token
    getToken() {
        return window.localStorage.getItem('jwt_token');
    },
    //移除token
    removeToken() {
        window.localStorage.removeItem('jwt_token');
    },

    setAuthId(authId) {
        Cookie.set('auth_id',authId);
    }
}
