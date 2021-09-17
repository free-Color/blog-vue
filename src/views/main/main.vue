<template>
<div>
  <el-card class="div-blogs"><el-divider/>
    <div v-for="blog in blogs" :key="blog">
      <router-link :to="'/blog/' + blog.blogId" style="color: black">
        <h2>{{blog.blogTitle}}</h2>
      </router-link>
      <el-container>
        <el-aside width="110px">
           <el-avatar style="width: 100px; height: 100px" :src="$image+blog.users.userAvatarAddress"
              shape="square" size="large"/>
<!--          <span>{{$image+blog.users.userAvatarAddress}}</span>-->
        </el-aside>
        <el-main>
          <span>{{blog.blogSummary}}</span>
        </el-main>
      </el-container>
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
import handler from "@/utils/handler";

export default {
  data () {
    return {
      blogs: [],
      blogTitle: '',
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
          url: '/blog/findByViewCount',
          params: {
            limit: this.page.limit,
            page: this.page.currentPage
          }
        }).then(res => {
          this.blogs = res.data.data.rows
          this.page.total = res.data.data.count
          // this.blogs[0].users.userAvatarAddress =
          //     this.$image + this.blogs[0].users.userAvatarAddress
          // // this.$message(JSON.stringify(this.blogs[1].users.userAvatarAddress))
          // var blog
          // for (blog in this.blogs) {
          //   this.$message(JSON.stringify(blog.users.userAvatarAddress))
          //   if(blog.users.userAvatarAddress !== null)
          //     blog.users.userAvatarAddress =
          //       this.$image + blog.users.userAvatarAddress
          // }
          // this.$message(JSON.stringify(this.blogs[0].users.userAvatarAddress))
          // this.$message(JSON.stringify(this.blogs[0].users.userAvatarAddress))
        })
      },
      findByBlogTitle(title){
        this.$axios({
          method: 'get',
          url: '/blog/findByBlogTitle',
          params: {
            blogTitle: title,
            limit: this.page.limit,
            page: this.page.currentPage
          }
        }).then(res => {
          this.blogs = res.data.data.rows
          this.page.total = res.data.data.count
          for (let blog in this.blogs) {
            if(blog.users.userAvatarAddress != null)
              blog.users.userAvatarAddress =
                  this.$image + blog.users.userAvatarAddress
          }
        })
      },
      handleCurrentChange(page){
        this.page.currentPage = page
        if(this.blogTitle === '') this.getPage()
        else this.findByBlogTitle(this.blogTitle)
      },
      handleSizeChange(val){
        this.page.currentPage = 1
        this.page.limit = val
        if(this.blogTitle === '') this.getPage()
        else this.findByBlogTitle(this.blogTitle)
      }
  },
  created () {
    this.getPage()
  },
  mounted() {
    handler.$on('search', msg => {
      // this.$message(msg)
      this.blogTitle = msg
      if(this.blogTitle === '') this.getPage()
      else this.findByBlogTitle(this.blogTitle)
    })
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
</style>
