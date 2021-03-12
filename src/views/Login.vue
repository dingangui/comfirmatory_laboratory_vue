<template>
    <div>
        <el-container>
            <el-header id="login-el-header">
                <h1>HIV 抗 体 检 测 中 心</h1>
            </el-header>
            <el-main>
                <!--

                    :model 的 userForm 和 v-model 的 userForm 一致
                    :rules 的 rules 和 <script>标签里的 data()中的 rules 一致

                    我们在 rules 这里写了对表单的验证规则
                    但是我们如何在 methods 里进行指定的表单进行认证，
                    所以我们一开始就在 el-form 里写了 ref=”ruleForm”，

                    我们在 methods 里就可以用this.$refs.ruleForm.validate((valid) => {}
                    这样的方法对指定的表单根据你写的 rules 认证。

                -->

                <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="userForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!--点击后触发提交表单 submitForm 的函数，将表单内容提交到后端 -->
                        <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
                        <!--点击后重置表单内容-->
                        <el-button @click="resetForm('userForm')">重置</el-button>
                        <!--点击后跳转到注册页面-->
                        <el-button @click="signUp">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            userForm: {
                username: '系统管理员',
                password: '111111'
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名'},
                    /*
                    * trigger类型为blur的功能是文本框失去焦点才会触发
                    * trigger类型为change的功能是文本框在输入内容时触发
                    * trigger类型也可以同时使用blur和change，功能结合上面两个的功能
                    * */
                    {min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    const _this = this

                    // alert('提交成功!');
                    /*
                    * post 中的 this.userForm 表示 post 提交到对应链接时的内容
                    * res 是从链接返回来的数据
                    *
                    * 引入 axios.js 后，就可以不用在 url 中写上 http://localhost:5000 了
                    * 引入 axios.js 需要 在main.js 中 import "./axios"
                    * */
                    this.$axios.post("/login", this.userForm).then(res => {

                        const jwt = res.headers['authorization']
                        const userInfo = res.data.data

                        console.log(userInfo);
                        console.log(res.data);

                        // 获取后端返回的数据后，存入浏览器的内存
                        /*
                        * 下面的配置可将数据保存到浏览器内存
                        * 然后其他网页也可以从内存中读取
                        * 也就是说，除了login.vue可以知道userInfo和jwt的内容
                        * views中其他的页面也可以访问
                        *
                        * 实现下面的功能前，需要先在store/index.js中写一些代码
                        * 新的项目可以在写好Login.vue后直接使用本项目中的index.js
                        * */
                        _this.$store.commit("SET_TOKEN", jwt)
                        _this.$store.commit("SET_USERINFO", userInfo)


                        // 登录成功后跳转（router）
                        // push的路径是vue中的链接
                        _this.$router.push("/SampleInput")

                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 跳转到注册界面
        signUp() {
            this.$router.push('/SignUp')
        }
    }
}
</script>

<style scoped>
.el-header {
    color: #111111;
    padding: 50px 0 50px 120px;
    max-width: 1000px;
    text-align: center;
    letter-spacing: 20px;
    margin: auto;
}

.userForm {
    max-width: 500px;
    margin: auto;
}

.el-main {
    text-align: center;
    padding: 100px 0;
}

</style>