<template>
    <form class="form-horizontal" @submit.prevent="login" >
        <div class="form-group">
            <label for="email" class="col-md-3 control-label">邮箱</label>
            <div class="col-md-7">
                <input id="email"
                       v-model="email"
                       v-validate data-vv-rules="required|email" data-vv-as="邮箱"
                       :class="{'input': true, 'is-danger': errors.has('email') }"
                       type="email"
                       class="form-control"
                       name="email"  required>
                <i v-show="errors.has('email')" class="fa fa-warning"></i>
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
        </div>

        <div class="form-group">
            <label for="password" class="col-md-3 control-label">密码</label>
            <div class="col-md-7">
                <input id="password"
                       v-model="password"
                       v-validate data-vv-rules="required|min:6" data-vv-as="密码"
                       :class="{'input': true, 'is-danger': errors.has('password') || bag.has('password:auth') }"
                       type="password"
                       class="form-control"
                       name="password" required>
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                <span v-if="mismatchError" class="help is-danger">{{ bag.first('password:auth') }}</span>
            </div>
        </div>



        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <button type="submit" class="btn btn-primary">
                    {{button}}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import jwtToken from './../../helpers/jwt'
    import { ErrorBag } from 'vee-validate'
    export default {
        data(){
            return{
                email:'',
                password:'',
                button :'登录',
                bag : new ErrorBag()
            }
        },
        computed: {
            mismatchError() {
                return this.bag.has('password:auth') && !this.errors.has('password')
            }
        },
        methods:{
            login(){

                this.$validator.validateAll().then((result) => {

                    if(result){
                        this.button = '登录中...';
                        let formData = {
                            email : this.email,
                            password : this.password
                        }
                        this.$store.dispatch('loginRequest',formData).then(response => {

                            this.$router.push({name:'profile'});
                        }).catch(error => {
                            if(error.response.status === 421) {
                                this.bag.add('password', '邮箱和密码为相符', 'auth');
                            }

                        })
                    }
                    //
                })

            }
        }
    }
</script>