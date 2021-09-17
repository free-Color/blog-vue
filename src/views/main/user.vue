<template>
<div>
  <div class="div-center" style="margin: 0 50px" v-if="userInfo.userAvatarAddress!=undefined">
    <el-avatar :size="100" :src="$image + userInfo.userAvatarAddress"></el-avatar>
  </div>
  <div class="div-center">
    <span>{{userInfo.userNickname}}</span>
  </div>
  <div class="div-center">
    {{userInfo.userProfile}}
  </div>

  <el-card class="div-blogs" v-if="blogs != null">
    <div v-for="blog in blogs" :key="blog">
      <router-link :to="'/blog/' + blog.blogId" style="color: black">
        <h2>{{blog.blogTitle}}</h2>
      </router-link>
      <span>{{blog.blogSummary}}</span>
      <div style="margin: 20px"></div>
      <el-row :gutter="20">
        <el-col :span="6">{{blog.users.userNickname}}</el-col>
        <el-col :span="10">{{blog.createTime | dateFormat}}</el-col>
        <el-col :span="2">
          <i class="iconfont icon-dianzan1"/>{{blog.blogStatistics.admireCount}}
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
        <el-divider/>
      </el-row>
    </div>
    <div class="div-center" style="margin: 20px 0 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
      </el-pagination>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  data(){
    return {
      userInfo: {},
      blogs: null,
      page: {
        currentPage: 1,
        limit: 10,
        total: 100
      }
    }
  },
  created() {
    this.$axios.get('/user/findUserById',{
      params: {userId: this.$route.params.userId}
    }).then(res => {
      this.userInfo = res.data.data
    })
    this.$axios.get('/blog/findByViewCount',{
      params: {
        userId: this.$route.params.userId,
        limit: this.page.limit,
        page: this.page.currentPage
      }
    }).then(res => {
      this.blogs = res.data.data.rows
      this.page.total = res.data.data.count
    })
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
</style>
