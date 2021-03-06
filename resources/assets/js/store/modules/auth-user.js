import * as types from './../mutation-type'
export default {
    //保存用户登录的数据
    state: {
        authenticated: false,
        name: null,
        email: null
    },
    mutations: {
        [types.SET_AUTH_USER](state, payload){
            state.authenticated = true;
            state.name = payload.user.name;
            state.email = payload.user.email;

        },
        [types.UNSET_AUTH_USER](state){
            state.authenticated = false;
            state.name = null;
            state.email = null;

        },
        [types.UPDATE_PROFILE_NAME](state, payload){
            state.name = payload.value;
        },
        [types.UPDATE_PROFILE_EMAIL](state, payload){
            state.email = payload.value;
        },

    },
    actions: {
        setAuthUser({commit, dispatch}){
            return axios.get('/api/user').then(response => {
                commit({
                    type: types.SET_AUTH_USER,
                    user: response.data
                });
            }).catch(error => {
                dispatch('refreshToken');

            });
        },
        unsetAuthUser({commit}) {
            commit({
                type: types.UNSET_AUTH_USER,
            });

        },
        refreshToken({commit, dispatch}){
            return axios.post('/api/token/refresh').then(response => {
                dispatch('loginSuccess', response.data);
            }).catch(error => {
                dispatch('logoutRequest');

            });

        }
    }
};
