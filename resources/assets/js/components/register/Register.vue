<template>
    <div class="container">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">注册</div>
                        <div class="panel-body">
                            <register-from></register-from>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RegisterFrom from './RegisterFrom'
    export default {
       components:{
           RegisterFrom
       }
    }
</script>