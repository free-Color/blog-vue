<template>
<div id="container" :style="{backgroundImage:`url(${img})`}">
<div id="box">
<el-container>
  <el-header height="200px">
    <div class="divcenter">
      <h2>大象博客用户注册</h2>
      <div id="icon"><i class="el-icon-user-solid"/></div>
    </div>
  </el-header>
  <el-main>
    <el-form ref="signUpForm" :model="form" status-icon :rules="rules" label-width="90px" label-position="right" class="demo-ruleForm">
      <el-form-item label="邮箱账号:" prop="email">
        <el-input v-model="form.email" placeholder="email"/>
      </el-form-item>
      <el-form-item label="用户名称:" prop="nickName">
        <el-input v-model="form.nickName" placeholder="nickname"/>
      </el-form-item>
      <el-form-item label="输入密码:" prop="password">
        <el-input v-model="form.password" placeholder="password" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码:" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" placeholder="confirm" type="password"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="click">sign up</el-button>
    <div style="margin: 30px 100px">
      <router-link :to="'/signin'" style="color: #409EFF">已有账号?快速登陆</router-link>
    </div>
  </el-main>
</el-container>

</div>
</div>
</template>
<script>
export default {
  data () {
    var validateP = (rule, value, callback) => {
      if(value === '')callback(new Error('请输入密码'))
      else callback()
    };
    var validateC = (rule, value, callback) => {
      if(value === '')callback(new Error('请再次输入密码'))
      else if(value !== this.form.password){
        callback(new Error('两次输入密码不一致!'))
      }else callback()
    };
    return {
      form: {
        email: '',
        nickName: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [{validator: validateP, trigger: 'blur'}],
        confirmPassword: [{validator: validateC, trigger: 'blur'}]
      },
      img: require('@/assets/icon/star.png')
    }
  },
  methods: {
    click () {
      this.$refs.signUpForm.validate((valid) => {
        if(valid){
          this.signup()
        }
      })
    },
    signup () {
      this.$axios({
        method: 'post',
        url: '/user/register',
        data: {
          userMail: this.form.email,
          userNickname: this.form.nickName,
          userPassword: this.form.password
        }
      }).then(res => {
        if(res.data.data == 0)this.$message.success('激活邮件已发送')
        else if(res.data.data == 1)this.$message.error('网络错误')
        else if(res.data.data == 2)this.$message.error('邮件已发送，请检查邮箱')
      })
    }
  }
}
</script>
<style scoped>
.divcenter{
  text-align: center;
}
#icon{
  font-size: 100px;
}
#container{
  /* background-color: #606266; */
  /* background-image: this.img; */
  height: 100%;
}
#box{
    width: 400px;
    height: 600px;
    background-color: #ffffff;

    top: 50%;
    left: 50%;
    position: absolute;
    margin: -300px  -200px;
}
.el-button{
  width: 100%;
}
</style>
