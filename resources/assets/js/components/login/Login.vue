<template>
    <div class="container">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">登录</div>
                        <div class="panel-body">
                            <login-from></login-from>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginFrom from './LoginFrom'
    export default {
        components:{
            LoginFrom
        }
    }
</script>