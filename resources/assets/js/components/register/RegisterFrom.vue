<template>
    <form class="form-horizontal" @submit.prevent="register">
        <div class="form-group">
            <label for="name" class="col-md-3 control-label">用户名</label>
            <div class="col-md-7">
                <input id="name"
                       v-validate data-vv-rules="required|alpha|min:4" data-vv-as="用户名"
                       :class="{'input': true, 'is-danger': errors.has('name') }"
                       v-model="name"
                       type="text"
                       class="form-control"
                       name="name"
                       required autofocus
                >
                <i v-show="errors.has('name')" class="fa fa-warning"></i>
                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>
        </div>
        <div class="form-group">
            <label for="email" class="col-md-3 control-label">邮箱</label>
            <div class="col-md-7">
                <input id="email"
                       v-model="email"
                       v-validate data-vv-rules="required|email" data-vv-as="邮箱"
                       :class="{'input': true, 'is-danger': errors.has('email') }"
                       type="email"
                       class="form-control"
                       name="email" required>
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
                       :class="{'input': true, 'is-danger': errors.has('password') }"
                       type="password"
                       class="form-control"
                       name="password" required>
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </div>
        </div>

        <div class="form-group">
            <label for="password-confirm" class="col-md-3 control-label">确认密码</label>
            <div class="col-md-7">
                <input id="password-confirm"
                       v-validate data-vv-rules="required|min:6|confirmed:password" data-vv-as="确认密码"
                       :class="{'input': true, 'is-danger': errors.has('password_confirmation') }"
                       type="password"
                       class="form-control"
                       name="password_confirmation"
                       required>
                <i v-show="errors.has('password_confirmation')" class="fa fa-warning"></i>
                <span v-show="errors.has('password_confirmation')"
                      class="help is-danger">{{ errors.first('password_confirmation') }}</span>

            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <button type="submit" class="btn btn-primary">
                    注册
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        data(){
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        methods: {
            register(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let formData = {
                            name: this.name,
                            email: this.email,
                            password: this.password
                        }
                        axios.post('/api/register', formData).then(response => {
                            console.log('Register Success!')
                            this.$router.push({name: 'confirm'})
                        })
                    }
                    //提示
                })
            }
        }
    }
</script>