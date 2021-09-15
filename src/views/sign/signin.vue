<template>
<div id="container" :style="{backgroundImage:`url(${img})`}">
<div id="box">
<el-container>
  <el-header height="200px">
    <div class="divcenter">
      <h2>大象博客用户登陆</h2>
      <div id="icon"><i class="el-icon-user-solid"/></div>
    </div>
  </el-header>
  <el-main>
    <el-form>
      <el-form-item>
        <el-input v-model="form.username" placeholder="username" clearable/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="password" show-password clearable/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="signin">sign in</el-button>
    <div style="margin: 30px 100px">
      <router-link :to="'/signup'" style="color: #409EFF">没有账号?立即注册</router-link>
    </div>
  </el-main>
</el-container>

</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      img: require('@/assets/icon/star.png')
    }
  },
  mounted () {
    if(localStorage.login){
      this.form = JSON.parse(localStorage.login)
    }
  },
  methods: {
    signin () {
      localStorage.login = JSON.stringify(this.form)
      if(this.form.username == '' || this.form.password == ''){
        this.$message.warning('用户名和密码不能为空')
        return
      }
      this.$axios({
        method: 'post',
        url: '/user/login',
        data: {
          userMail: this.form.username,
          userPassword: this.form.password
        }
      }).then(res => {
        var val = res.data.data
        // this.$message.error(JSON.stringify(val))
        if(val == '-1'){
          this.$message.error('密码错误')
        }else if(val == '0'){
          this.$message.error('用户名输入错误')
        }else{
          val.userAvatarAddress = this.$image + val.userAvatarAddress
          sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
          sessionStorage.setItem('userId',res.data.data.userId)
          this.$message.success('登陆成功')
          this.$router.push('/')
        }
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
    height: 500px;
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
