<template>
<el-container>
<el-header>
  <el-page-header @back="goBack" style="display: inline"/>
  <el-button type="danger" plain>注销</el-button>
</el-header>
<el-container>
<el-aside width="200px">
  <el-menu router class="el-menu-demo" @select="handleSelect"
    background-color="#545c64" text-color="#909399" active-text-color="#303133">
    <el-menu-item index="/user/blog">
      <i class="el-icon-setting"/>我的博客
    </el-menu-item>
    <el-menu-item index="/user/concern">
      <i class="el-icon-user"/>我的关注
    </el-menu-item>
    <el-menu-item index="/user/tag">
      <i class="el-icon-s-release"/>我的标签
    </el-menu-item>
    <el-menu-item index="/user/collection">
      <i class="el-icon-s-order"/>博客设置
    </el-menu-item>
  </el-menu>
</el-aside>
<el-main><router-view/></el-main>
</el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped>

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
</style>
