<template>
<el-card>
  <el-form :inline="true">
    <el-form-item label="博客标题:">
      <el-input v-model="form.title" placeholder="博客标题"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table ref="blogTable" :data="data" height="550px" style="width: 100%" border
    @selection-change="handleSelectionChange" :key="Math.random()">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="blogTitle" label="标题" width="250"/>
      <el-table-column prop="blogSummary" label="描述" width="180"/>

      <el-table-column prop="blogDeleted" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.blogDeleted == 1" type="danger">封禁</el-tag>
          <el-tag v-if="scope.row.blogDeleted == 0" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.blogId)" type="primary">详情</el-button>
        </template>
      </el-table-column>
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
  <div class="div-center" style="margin: 20px 0 0">
    <el-button type="primary" @click="recover" plain>恢复博客</el-button>
    <el-button type="danger" @click="prohibit" plain>封禁博客</el-button>
  </div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: ''
      },
      page: {
        currentPage: 1,
        limit: 10,
        total: 100
      },
      data: [],
      selection: null
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
        this.data = res.data.data.rows
        this.page.total = res.data.data.total
      })
    },
    onSubmit(){
      if(this.form.title === '')this.refreshPage()
      else {
        // this.$message(this.form.title)
        this.$axios({
          method: 'get',
          url: '/blog/findByBlogTitle',
          params: {
            page: this.page.currentPage,
            limit: this.page.limit,
            blogTitle: this.form.title
          }
        }).then(res => {
          this.data = res.data.data.rows
          this.page.total = res.data.data.total
        })
      }
    },
    handleSelectionChange(val){
      this.selection = val
    },
    handleClick (val) {
      // this.$message(JSON.stringify(val))
      this.$router.push('/blog/' + val)
    },
    handleCurrentChange(page){
      // this.$message(JSON.stringify(page))
      this.page.currentPage = page
      this.refreshPage()
    },
    handleSizeChange(val){
      this.page.limit = val
      this.refreshPage()
    },
    prohibit(){
      var selectionId = []
      this.selection.forEach((value) => {
        selectionId.push(value.blogId)
      })
      this.$axios({
        method: 'post',
        url: '/blog/removeBatch',
        data: selectionId
      }).then(res => {
        var selectionId = []
        this.selection.forEach((value) => {
          selectionId.push(value.blogTitle)
        })
        this.$message.success('已封禁博客' + JSON.stringify(selectionId))
      })
      this.refreshPage()
    },
    recover () {
      var selectionId = []
      this.selection.forEach((value) => {
        selectionId.push(value.blogId)
      })
      this.$axios({
        method: 'post',
        url: '/blog/recoverBatch',
        data: selectionId
      }).then(res => {
        var selectionId = []
        this.selection.forEach((value) => {
          selectionId.push(value.blogTitle)
        })
        this.$message.success('已恢复博客' + JSON.stringify(selectionId))
      })
      this.refreshPage()
    },
  },
  created () {
    this.refreshPage()
  }
}
</script>

<style scoped>

</style>
