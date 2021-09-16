<template>
<el-container>
<el-header>
  <el-page-header @back="router_push('/main')" content="个人设置" style="color: white"/>
  <el-button type="danger" @click="router_push('/logout')" plain>注销</el-button>
</el-header>
<el-container>
<el-aside width="160px">
  <el-menu router class="el-menu-demo" @select="handleSelect"
    background-color="#545c64" text-color="#E4E7ED" active-text-color="#ffd04b">
    <el-menu-item index="/sittings/account">
      <i class="el-icon-setting"/>账户设置
    </el-menu-item>
    <el-menu-item index="/sittings/user">
      <i class="el-icon-user"/>个人资料
    </el-menu-item>
    <el-menu-item index="/sittings/block">
      <i class="el-icon-s-release"/>屏蔽设置
    </el-menu-item>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-s-order"/>列表管理
      </template>
      <el-menu-item index="/sittings/blog">我的博客</el-menu-item>
      <el-menu-item index="/sittings/collect">我的收藏</el-menu-item>
      <el-menu-item index="/sittings/concern">我的关注</el-menu-item>
    </el-submenu>
  </el-menu>
</el-aside>
<el-main><router-view/></el-main>
</el-container>
</el-container>
</template>
<script>
export default {
  methods: {
    router_push (path) {
      this.$router.push(path)
    }
  },
  created () {
    // this.$message(JSON.stringify(sessionStorage.getItem('userInfo')))
  }
}
</script>
<style scoped>
.div-el-menu{
  height: 100%;
  background-color: #545c64;
}
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
.el-aside{
  font-size: 18px;
  background-color: #545c64;
}
.el-menu-item-div{
  width: 100%;
  display: flex;
  align-items: center;
}
.el-main{
}
</style>
