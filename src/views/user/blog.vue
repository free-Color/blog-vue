<template>
<el-card>
  <el-table :data="data" height="600" style="width: 100%" border>
      <!-- <el-table-column prop="blogTitle" label="标题" width="180"/> -->
      <el-table-column label="标题" width="180">
        <template slot-scope="scope">
          
            <router-link :to="'/blog/' + scope.row.blogId" style="color: black">
              {{scope.row.blogTitle}}
            </router-link>
            <!-- <el-button @click="bClick(scope.row.blogId)" type="text">{{scope.row.blogTitle}}</el-button> -->
        </template>
      </el-table-column>
      <el-table-column prop="blogSummary" label="摘要" width="180"/>
      <el-table-column prop="blogStatistics.admireCount" label="点赞数" width="180"/>
      <el-table-column prop="blogStatistics.collectCount" label="收藏数" width="180"/>

      <el-table-column label="发表时间" width="180">{{createTime | dateFormat}}</el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
            <el-button @click="eClick(scope.row.blogId)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
  </el-table>
  
    <div class="div-center" style="margin: 20px 0 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
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
      data: null
    }
  },
  methods: {
    refreshPage(){
      this.$axios({
        method: 'get',
        url: '/blog/findByViewCount',
        params: {
          page: this.page.currentPage,
          limit: this.page.limit,
          userId: sessionStorage.getItem('userId')
        }
      }).then(res => {
        this.page.total = res.data.data.count
        this.data = res.data.data.rows
      })
    },
    handleCurrentChange(page){
      this.page.currentPage = page
      this.refreshPage()
    },
    handleSizeChange(val){
      this.page.currentPage = 1
      this.page.limit = val
      this.refreshPage()
    },
    bClick(id){
      this.$message(id)
      this.$router.push('/blog/' + id)
    },
    eClick(id){
      this.$message(id)
      this.$router.push({
        name: 'editor',
        params: {
          blogId: id
        }
      })
    }
  },
  created () {
    this.refreshPage()
  }
}
</script>

<style scoped>

</style>
