<template>
<el-card>
<div class="div-center" style="margin: 20px 0 0">
  <el-table :data="data" height="600" style="width: 100%" border>
      <el-table-column prop="blogTitle" label="标题" width="180"/>
      <el-table-column prop="blogSummary" label="描述" width="180"/>
      <el-table-column prop="blogSummary" label="状态" width="180"/>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
  </el-table></div>
  
    <div class="div-center" style="margin: 20px 0 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination></div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1,
        limit: 10,
        total: 100
      },
      data: [{
        blogId: '',
        blogTitle: 'java',
        commentCount: 12,
        riseCount: 23
      }]
    }
  },
  methods: {
    refreshPage(){
      this.$axios({
        method: 'get',
        url: '/blog/findByViewCount',
        params: {
          page: this.page.currentPage,
          limit: this.page.limit
        }
      }).then(res => {
        this.data = res.data.data
      })
    },
    handleCurrentChange(page){
      this.page.currentPage = page
      this.refreshPage()
    },
    handleSizeChange(val){
      this.page.limit = val
      this.refreshPage()
    }
  },
  created () {
    this.refreshPage()
  }
}
</script>

<style scoped>

</style>
