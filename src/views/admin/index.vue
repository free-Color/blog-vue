<template>
<el-container>
  <el-aside width="200px">
      <el-menu router default-active="2" class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
      <el-submenu>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">图表管理</span>
        </template>
        <el-menu-item index="/admin/mix">访问时间分析</el-menu-item>
        <el-menu-item index="/admin/china">访问地点分析</el-menu-item>
      </el-submenu>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">列表管理</span>
        </template>
        <el-menu-item index="/admin/log">日志</el-menu-item>
        <el-menu-item index="/admin/user">用户</el-menu-item>
        <el-menu-item index="/admin/blog">博客</el-menu-item>
        <el-menu-item index="/admin/tag">标签</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
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
  }
}
</script>

<style scoped>
.el-container{
  height: 100%;
}
.el-aside{
  background-color: #545c64;
}
/* .el-header{
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #E4E7ED;
} */
</style>
