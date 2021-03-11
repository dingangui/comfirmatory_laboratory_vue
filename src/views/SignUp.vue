<template>
  <div>
    <el-container>
      <el-header>
        <h1>HIV 抗 体 检 测 中 心</h1>
      </el-header>
      <el-main>
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="userForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
            <el-button @click="login()">返回登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      userForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
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
          this.$axios.post("/user/save",this.userForm).then(res=>{
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            // 获取后台的内容后，存入浏览器的内存
            alert(res.data.msg)

            _this.$store.commit("SET_TOKEN",jwt)
            _this.$store.commit("SET_USERINFO",userInfo)

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
    login() {
      this.$router.push("/")
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

.userForm{
  max-width: 500px;
  margin: auto;
}

.el-main {
  text-align: center;
  padding: 100px 0;
}
</style>