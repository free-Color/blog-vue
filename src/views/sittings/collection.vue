<template>
  <div>
    <el-card class="div-blogs">

      <h2>我的收藏:</h2>
      <div class="div-center" style="margin: 20px 0 0">
        <el-table :data="blogs" height="500" style="width: 100%" border stripe>
          <el-table-column label="标题" width="180" align="center">
            <template slot-scope="scope">
              <router-link :to="'/blog/' + scope.row.blog.blogId" style="color: black">
                {{scope.row.blog.blogTitle}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="blog.blogSummary" label="博客简介" width="180" align="center"/>
          <el-table-column label="收藏时间" width="120" align="center">
            {{collectDate | dateFormat}}
          </el-table-column>
          <el-table-column prop="reason" label="收藏原因" width="250" align="center"/>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button @click="click(scope.row.blogId)" type="danger" icon="el-icon-delete" plain/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="div-center" style="margin: 20px 0 0">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.limit"
            :hide-on-single-page="page.total < page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogs: [],
      page: {
        currentPage: 1,
        limit: 10,
        total: 100
      }
    }
  },
  methods: {
    getPage () {
      this.$axios({
        method: 'get',
        url: '/collect/findAllByUserId',
        params: {
          limit: this.page.limit,
          page: this.page.currentPage,
          userId: sessionStorage.getItem('userId')
        }
      }).then(res => {
        this.blogs = res.data.data.rows
        this.page.total = res.data.data.count
        this.blogs.forEach(item => item.flag = true)
        // this.$message(JSON.stringify(this.blogs[0].users.userAvatarAddress))
      })
    },
    handleCurrentChange(page){
      // this.$message(JSON.stringify(page))
      this.page.currentPage = page
      this.getPage()
    },
    handleSizeChange(val){
      // this.$message(JSON.stringify(val))
      this.page.currentPage = 1
      this.page.limit = val
      this.getPage()
    },
    click(id){
      this.$message(JSON.stringify(id))
    }
  },
  created () {
    this.getPage()
  }
}
</script>

<style scoped>
.div-blogs{
  width: 1000px;
  margin: auto;
}
a{
  text-decoration: none;
}
</style>
