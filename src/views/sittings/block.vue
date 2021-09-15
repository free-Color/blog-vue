<template><div>
<div class="div-center"><h2>屏蔽管理</h2></div>
<div class="markdown-body" v-html="content"/>
<div style="margin: 20px"/>
<el-row>
  <el-col span="6"><el-input placeholder="搜索用户" v-model="input"/></el-col>
  <el-col span="4" offset="1"><el-button @click="block">屏蔽</el-button></el-col>
</el-row>
<div style="margin: 20px"/>
<div v-for="b in blocks" :key="b" class="div-between div-border">
  <div style="margin: 0 30px" class="div-center">
    <el-button type="text">{{b.name}}</el-button>
  </div>
  <div class="div-center">
    <el-button class="my-icon-button" icon="el-icon-delete-solid" circle/>
    <div style="margin: 0 10px"></div>
  </div>
</div>
</div></template>
<script>
export default {
  data () {
    return {
      input: '',
      blocks: [{
        name: '起风了'
      }],
      content: '**被屏蔽的用户将会:**\n'
        + '- 无法关注你\n'
        + '- 无法向你发送站内短消息\n'
        + '- 无法通过@提及向你发送通知\n'
        + '- 从你看到的评论、闪存等列表中隐藏\n'
        + '- 无法评论你发布的博文、闪存等内容'
    }
  },
  methods: {
    block () {
      this.$message({
        message: '屏蔽成功',
        type: 'success'
      })
    }
  },
  created () {
    this.content = this.$markdown.render(this.content)
  }
}
</script>
<style scoped>
.div-between{
  height: 50px;
  display: flex;
  justify-content: space-between;
}
</style>
