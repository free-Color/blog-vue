<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <router-link :to="'/user/' + blog.users.userId" style="color: black">
        <h2>{{blog.users.userNickname}}</h2>
      </router-link>
    </div>
    <div class="div-title"><h2>{{blog.blogTitle}}</h2></div>
    <div class="markdown-body" v-html="blog.blogContent"></div>
    <div style="margin: 80px;"></div>
    <el-divider/>
    <el-row>
      <el-col :offset="18">
        <el-button v-if="flag.rise" @click="unrise" icon="iconfont icon-dianzan" circle/>
        <el-button v-else @click="rise" icon="iconfont icon-dianzan1" circle/>

        <el-button @click="unconcern" v-if="flag.concern" circle icon="iconfont icon-guanzhu"/>
        <el-button @click="concern" v-else circle icon="iconfont icon-guanzhu1"/>

        <el-button @click="uncollection" v-if="flag.collection" icon="iconfont icon-shoucang" circle/>
        <el-button @click="collection" v-else icon="iconfont icon-shoucang1" circle/>
      </el-col>
    </el-row>
  </el-card>

  <div style="margin: 20px;"/>

  <el-card class="box-card">
    <div style="margin: 20px;"/>
    <h3>发表评论</h3>
    <el-divider/>
    <div class="comment">
      <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 10}"
        v-model="input" maxlength="60" show-word-limit>
      </el-input></div>
    <div style="margin: 20px;"></div>
    <el-button type="primary" @click="makeComment">提交评论</el-button>
    <el-divider/>

    <div v-for="(item,index) in comments" :key="index">

      <span>{{item.users.userNickname}}: {{item.commentContent}}</span>
      <el-button type="text" @click="responseComment(item.id)">回复</el-button>
      <el-divider></el-divider>
    </div>
  </el-card>

  <div style="margin: 100px;"></div>
</div>
</template>

<script>
import 'github-markdown-css'
export default{
  data () {
    return {
      flag: {
        rise: false,
        concern: false,
        collection: false
      },
      isLogin: true,
      input: '',
      blog: null,
      comments: null,
      page: {
        currentPage: 1,
        limit: 10,
        total: 100
      }
    }
  },
  methods: {
    show () {
      this.blog.content = this.$markdown.render(this.blog.content)
    },
    makeComment () {
      if(this.isLogin === false){
        this.$message.warning('未登陆用户用户不能评论')
        return
      }
      this.$axios({
        method: 'post',
        url: '/comment/save',
        data: {
          blogId: this.blog.blogId,
          commentContent: this.input,
          userId: sessionStorage.getItem('userId')
        }
      }).then(res => {
        if(res.data.data == true){
          this.$message.success('成功评论')
          this.input = ''
          this.getComment()
        }
      })
    },
    responseComment (id) {
      this.$message('向id:'+id+'回复评论')
    },
    unrise(){
      this.flag.rise = false
    },
    rise () {
      if(this.isLogin === false){
        this.$message.warning('请先登陆')
        return
      }
      this.$axios({
        method: 'post',
        url: '/blogStatistics/admire',
        params: {blogId: this.$route.params.blogId}
      }).then(res => {
        this.$message.success('点赞成功！')
        this.flag.rise = true
      })
    },
    unconcern(){
      this.flag.concern = false
    },
    concern () {
      if(this.isLogin === false){
        this.$message.warning('请先登陆')
        return
      }
      this.$axios({
        method: 'post',
        url: '/user/follow',
        params: {
          followerId: sessionStorage.getItem('userId'),
          userId: this.blog.users.userId
        }
      }).then(res => {
        if(res.data.data == true) this.$message.success('关注成功！')
        this.flag.concern = true
      })
    },
    uncollection(){
      this.flag.collection = false
    },
    collection () {
      if(this.isLogin === false){
        this.$message.warning('请先登陆')
        return
      }
      this.$axios({
        method: 'post',
        url: '/collect/collect',
        params: {
          blogId: this.$route.params.blogId,
          userId: sessionStorage.getItem('userId'),
          categoryId: 1
        }
      }).then(res => {
        if(res.data.data == true){
          this.$message.success('收藏成功！')
        }
        this.flag.collection = true
      })
    },
    getComment() {
      this.$axios({
        method: 'get',
        url: '/comment/findAll',
        params: {
          blogId: this.$route.params.blogId,
          limit: this.page.limit,
          page: this.page.currentPage
        }
      }).then(res => {
        this.comments = res.data.data
      })
    }
  },
  created () {
    if(sessionStorage.getItem('userInfo') == null ||
        sessionStorage.getItem('userInfo') == '')
      this.isLogin = false
    // this.$message(JSON.stringify(this.isLogin))
    this.$axios({
      method: 'get',
      url: '/blog/selectOne',
      params: {
        blogId: this.$route.params.blogId
      }
    }).then(res => {
      this.blog = res.data.data
      this.blog.blogContent = this.$markdown.render(this.blog.blogContent)
    })
    this.getComment()
  }
}
</script>

<style scoped>
.comment{
  width: 700px;
}
.div-title{
  text-align: center;
}
.box-card{
  width: 1000px;
  margin: auto;
}
a{
  text-decoration: none
}
</style>
