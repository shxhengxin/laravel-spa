<template>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand"> Vue-SPA</router-link>

            </div>
            <div class="collapse navbar-collapse" id="">

                <ul class="nav navbar-nav"></ul>
                <ul class="nav navbar-nav navbar-right">
                    <router-link to="/login" tag="li" v-if="!user.authenticated">
                        <a>登录</a>
                    </router-link>
                    <router-link to="/register" tag="li" v-if="!user.authenticated">
                        <a>注册</a>
                    </router-link>
                    <router-link to="/profile" tag="li" v-if="user.authenticated">
                        <a>个人中心</a>
                    </router-link>
                    <li v-if="user.authenticated">
                        <a href="#" @click.prevent="logout">退出</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'top-menu',
        computed: {
            ...mapState({
                user: state => state.AuthUser

            })
        },
        methods: {
            logout() {
                this.$store.dispatch('logoutRequest').then(response => {

                    this.$router.push({name:'home'});
                })

            }
        }

    }
</script>
