<template>
<div>
<el-row><h2>账户与安全</h2></el-row>

<el-row><el-col :span="20" offset="1">

<el-collapse accordion>
  <el-collapse-item>
    <template slot="title">
      <h4>头像:</h4><br>
      <el-avatar style="margin: 20px" shape="square" :size="size" :src="user.userAvatarAddress"/>
    </template>
    <el-upload class="upload-demo" drag :action="this.$axios.defaults.baseURL + '/user/uploadPictureFile'"
        :on-success="upload" :limit="1">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <h4>登录用户名: {{user.email}}</h4>
    </template>
    <div>
      <div class="div-inline"><el-switch v-model="form.emailflag"/></div>
      <div class="div-inline" style="margin: 0 20px">使用账户邮箱作为登录用户名</div>
      <div style="margin: 20px"/>
      <el-input v-if="!form.emailflag" placeholder="登录用户名" v-model="form.name" clearable/>
    </div>
    <el-divider/>
    <div>
      <el-button type="primary" @click="updateA">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <h4>密码: ******</h4>
    </template>
    <div class="div-height-space"><el-input placeholder="当前密码" v-model="form.password.now" clearable/></div>
    <div class="div-height-space"><el-input placeholder="新密码" v-model="form.password.input" clearable/></div>
    <div class="div-height-space"><el-input placeholder="确认新密码" v-model="form.password.confirm" clearable/></div>
    <div class="div-height-space">
      <el-button type="primary" @click="updateP">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <h4>显示昵称: {{user.nickname}}</h4>
    </template>
    <div class="div-height-space"><el-input placeholder="输入新昵称" v-model="form.password.now" clearable/></div>
    <div class="div-height-space">
      <el-button type="primary" @click="updateN">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <h4>简介: {{user.profile}}</h4>
    </template>
    <div class="div-height-space"><el-input placeholder="输入简介" v-model="form.password.now" clearable/></div>
    <div class="div-height-space">
      <el-button type="primary" @click="updateN">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </el-collapse-item>
  <el-collapse-item>
    <template slot="title">
      <h4>邮箱: {{user.email}}</h4>
    </template>
    <div class="div-height-space"><el-input placeholder="输入新邮箱" v-model="form.email.account" clearable/></div>
    <div class="div-height-space"><el-input placeholder="输入验证码" v-model="form.email.code" clearable>
      <el-button slot="append" @click="updateE">获取验证码</el-button>
    </el-input></div>
    <div class="div-height-space">
      <el-button type="primary" @click="updateE">确定</el-button>
      <el-button @click="updateE">取消</el-button>
    </div>
  </el-collapse-item>
</el-collapse>
</el-col></el-row>
<!-- <h2>{{string}}</h2> -->
<el-row><h2>其他</h2></el-row>

<el-row style="display: flex">
  <el-col span="4" offset="1">
    注销账户<el-button type="text">注销</el-button>
  </el-col>
</el-row>

</div>
</template>

<script>
export default {
  data () {
    return {
      string: '',
      user: {
        name: '',
        email: '',
        nickname: '',
        profile: '',
        userAvatarAddress: ''
      },
      form: {
        name: '',
        email: '',
        nickname: '',
        emailflag: true,
        password: {
          now: '',
          input: '',
          confirm: ''
        }
      }
    }
  },
  methods: {
    upload (response, file, fileList) {
      // console.log(response, file, fileList)
      // this.$message(this.$axios.defaults.baseURL + response.data)
      this.$axios({
        method: 'put',
        url: '/user/updateUser',
        data: {
          userId: sessionStorage.getItem('userId'),
          userAvatarAddress: response.data
        }
      }).then(res => {
        this.$message.success('更换头像成功')
      })
      this.getUserInfo()
      console.log(this.user.userAvatarAddress)
    },
    getUserInfo () {
      this.$axios({
        method: 'get',
        url: '/user/findUserById',
        params: {
          userId: sessionStorage.getItem('userId')
        }
      }).then(res => {
        var userInfo = res.data.data
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.user.userPassword = userInfo.userPassword
        this.user.nickname = userInfo.userNickname
        this.user.email = userInfo.userMail
        this.user.name = userInfo.userMail
        this.user.profile = userInfo.userProfile
        this.user.userAvatarAddress = this.$image + userInfo.userAvatarAddress
      })
    },
    updateA () {
      this.$message.warning('暂时不允许更换登陆账号')
    },
    updateP () {
      // this.$message.success('更改密码成功')
      var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.$axios({
        method: 'post',
        url: '/user/login',
        data: {
          userMail: userInfo.userMail,
          userPassword: this.form.password.now
        }
      }).then(res => {
        if(res.data.data == '-1'){
          this.$message.error('密码错误')
          return
        }else if(res.data.data == '0'){
          this.$message.error('用户名不存在')
          return;
        }
      })
      this.$axios({
        method: 'put',
        url: '/user/updateUser',
        data: {
          userId: sessionStorage.getItem('userId'),
          userPassword: this.form.password.input
        }
      }).then(res => {
        if(res.data.data == true)
          this.$message.success('更改密码成功')
      })
    },
    updateN () {
      this.$axios({
        method: 'put',
        url: '/user/updateUser',
        data: {
          userId: sessionStorage.getItem('userId'),
          userNickname: this.form.nickname
        }
      }).then(res => {
        if(res.data.data == true)
          this.$message.success('更改昵称成功')
      })
    },
    updateE () {
      this.$message.warning('暂时不允许更换邮箱')
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.div-height-space{
  margin: 20px;
}
.div-inline{
  display: inline;
}
.el-input{
  width: 300px;
}
</style>
