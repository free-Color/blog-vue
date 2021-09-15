<template>
<el-card>
  <el-form :inline="true">
    <!-- <el-form-item label="审批人">
      <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item> -->
    <el-form-item label="操作介绍:">
      <el-autocomplete v-model="form.logIntrod" :fetch-suggestions="querySearch"
        @select="handleSelect" class="inline-input" placeholder="请输入内容"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="data" height="500px" style="width: 100%">
      <el-table-column prop="logIntrod" label="介绍" width="180"/>
      <el-table-column prop="ip" label="ip:" width="180"/>
      <el-table-column prop="operTime" label="操作时间" width="180">
        <template slot-scope="scope">
          {{scope.row.operTime | dateFormat}}
        </template>
      </el-table-column>
  </el-table>
  
  <div class="div-center" style="margin: 20px 0 0">
    <el-pagination
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
        logIntrod: '',
        select: []
      },
      page: {
        currentPage: 1,
        limit: 10,
        total: 100
      },
      data: [{
        logId: '',
        userId: '',
        userName: '',
        ip: '',
        methods: '',
        logIntrod: '',
        operTime: ''
      }]
    }
  },
  methods: {
    onSubmit () {
      this.$axios({
        method: 'get',
        url: '/log/findLog',
        params: {
          logIntro: this.form.logIntrod,
          offset: this.page.currentPage,
          limit: this.page.limit
        }
      }).then(res => {
        this.data = res.data.data.rows
        this.page.total = res.data.data.total
      })
    },
    refreshPage(){
      this.$axios({
        method: 'get',
        url: '/log/findLog',
        params: {
          offset: this.page.currentPage,
          limit: this.page.limit
        }
      }).then(res => {
        this.data = res.data.data.rows
        this.page.total = res.data.data.total
      })
    },
    querySearch(queryString, cb) {
      cb(queryString ? this.form.select.filter(str => str.value.indexOf(queryString) != -1) : this.form.select)
    },
    handleCurrentChange(page){
      this.page.currentPage = page
      this.refreshPage()
    },
    handleSizeChange(val){
      this.page.limit = val
      this.refreshPage()
    },
    handleSelect(item) {
      this.$message(JSON.stringify(item))
    },
    getSelect () {
      var array = [
        '注册用户','保存用户','查询用户列表','查询用户列表2',
        '用户登录','用户注册','查询日志','修改用户信息','查询粉丝列表',
        '用户激活','查询用户','关注','统计粉丝数量','检查是否是其粉丝',
        '查询关注列表','封禁用户','根据Id批量删除博客','博客浏览量排序输出',
        '根据Id博客删除','根据blogId查询博客','根据Id博客批量恢复',
        '查询日志2','查询所有标签 ','发表博客','查询评论列表,分页查询',
        '点赞博客','用户收藏博客'
      ]
      array.forEach((item, index) => this.form.select.push({value: item}))
    }
  },
  created () {
    this.refreshPage()
  },
  mounted () {
    this.getSelect()
    // this.$message(JSON.stringify(this.form.select))
  }
}
</script>

<style scoped>

</style>
