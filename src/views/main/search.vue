<template>
<div>
  <div class="div-blogs">
    <el-card v-for="blog in blogs" :key="blog">
      <router-link :to="'/blog/' + blog.blogId" style="color: black">
        <h2>{{blog.blogTitle}}</h2>
      </router-link>
      <el-container>
        <el-aside width="110px">
          <el-image style="width: 100px; height: 100px" :src="blog.users.userAvatarAddress" :fit="fit"/>
        </el-aside>
        <el-main>
          <span>{{blog.blogSummary}}</span>
        </el-main>
      </el-container>
      <el-row :gutter="20">
        <el-col :span="6">{{blog.users.userNickname}}</el-col>
        <el-col :span="10">{{blog.createTime | dateFormat}}</el-col>
        <el-col :span="2">
          <i class="el-icon-sunrise-1"/>{{blog.blogStatistics.admireCount}}
        </el-col>
        <el-col :span="2">
          <i class="el-icon-chat-dot-square"/>{{blog.blogStatistics.commentCount}}
        </el-col>
        <el-col :span="2">
          <i class="el-icon-star-off"/>{{blog.blogStatistics.collectCount}}
        </el-col>
        <el-col :span="2">
          <i class="el-icon-view"/>{{blog.blogStatistics.viewCount}}
        </el-col>
      </el-row>
    </el-card>
    <div class="div-center" style="margin: 20px 0 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        page-sizes="[10, 20, 30, 40]"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      blogs: null,
      page: {
        currentPage: 1,
        limit: 20,
        total: 100
      }
    }
  },
  methods: {
      getPage () {
        this.$axios({
          method: 'get',
          url: '/blog/findByViewCount',
          params: {
            limit: this.page.limit,
            page: this.page.currentPage
          }
        }).then(res => {
          this.blogs = res.data.data.rows
          this.page.total = res.data.data.count
        })
      },
      handleCurrentChange(page){
        this.$message(1)
        this.page.currentPage = page
        this.getPage()
      },
      handleSizeChange(val){
        this.$message(2)
        this.page.currentPage = 1
        this.page.limit = val
        this.getPage()
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
.router-link-active {
  text-decoration: none;
}
</style>
