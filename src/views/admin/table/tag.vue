<template>
<el-card>
  <el-table ref="tagTable" :data="data" height="600px" style="width: 100%"
    @selection-change="handleSelectionChange" :key="Math.random()">
    <el-table-column prop="tagName" label="标题" width="250" align="center"/>
    <el-table-column prop="tagState" label="状态" width="180" align="center">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.tagState == 1" type="danger">停用</el-tag>
        <el-tag v-if="scope.row.tagState == 0" type="success">正常</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="创造时间" width="250" align="center">
      <template slot-scope="scope">
        {{scope.row.createTime | dateFormat}}
      </template>
    </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
            <el-button v-if="scope.row.tagState == 0" @click="handleClick(scope.row.blogId)"
                type="danger" plain>停用</el-button>
            <el-button v-if="scope.row.tagState == 1" @click="handleClick(scope.row.blogId)"
                type="primary" plain>启用</el-button>
        </template>
      </el-table-column>
  </el-table>
  
    <div class="div-center" style="margin: 20px 0 0">
      <el-pagination background
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
        url: '/blogTag/findAllByLimit',
        params: {
          page: this.page.currentPage,
          limit: this.page.limit
        }
      }).then(res => {
        this.data = res.data.data.rows
        this.page.total = res.data.data.total
      })
    },
    handleSelectionChange(val){
      this.selection = val
    },
    handleCurrentChange(page){
      this.$message(JSON.stringify(page))
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
