<template>
<el-container>
  <el-header class="div-between">
    <el-page-header @back="goBack" v-if="this.$route.path!='/main'"/>
    <span v-if="this.$route.path=='/main'">大象博客 主页</span>
    <el-menu router ref="mainmenu"
      class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item>
        <el-input placeholder="请输入内容" v-model="input" prefix-icon="el-icon-search"
            @keyup.enter.native="search"></el-input>
      </el-menu-item>
      <el-menu-item index="/editor">新随笔</el-menu-item>

      <el-submenu v-if="userInfo!==null">
        <template slot="title">
          <el-avatar size="medium" :src="$image + userInfo.userAvatarAddress"/>
        </template>
        <el-menu-item index="/sittings">个人中心</el-menu-item>
        <el-menu-item index="/admin" v-if="userInfo.roleId == 1">后台管理</el-menu-item>
        <el-menu-item index="/logout">注销</el-menu-item>
      </el-submenu>

      <el-menu-item index="/signin" v-if="userInfo===null">登陆</el-menu-item>
      <el-menu-item index="/signup" v-if="userInfo===null">注册</el-menu-item>
    </el-menu>
  </el-header>
  <el-main>
    <router-view/>
  </el-main>
</el-container>
</template>

<script>
import handler from "@/utils/handler";
export default{
  data () {
    return {
      input: '',
      userInfo: {},
      roleId: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push('/main')
    },
    search(){
      handler.$emit('search', this.input)
    }
  },
  created () {
    const val = sessionStorage.getItem('userInfo')
    if(val == '' || val == null) this.userInfo = null
    else this.userInfo = JSON.parse(val)
  }
}
</script>

<style scoped="scoped">
.el-container{
  height: 100%;
}
.el-header{
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #545c64;
  justify-content: space-between;
}
</style>
