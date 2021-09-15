<template>
<el-card>
  <el-table ref="multipleTable" :data="data" height="600" style="width: 100%" border>
    <el-table-column type="selection" width="55">
    </el-table-column>
      <el-table-column prop="blogTitle" label="昵称" width="180"/>
      <el-table-column prop="blogSummary" label="描述" width="180"/>
      <el-table-column prop="createTime" label="时间" width="180"/>
  </el-table>
  
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
