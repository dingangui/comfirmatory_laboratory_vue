<template>
  <div>
    <el-container>
      <el-header>
        <h1>H I V 抗 体 检 测 中 心</h1>
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
            _this.$router.push("/Mains")

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
.mlogo {
  height: 60%;
  width: 8%;
  margin-top: 10px;
}

.userForm{
  max-width: 500px;
  margin: auto;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 0;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>