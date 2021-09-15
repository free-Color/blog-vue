<template>
<div style=" width: 1100px; margin: 20px auto;">
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item prop="title">
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>

        <el-form-item prop="description">
          <el-input type="textarea" placeholder="概要" v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item>
          <el-card>
            <div v-for="tag in tags" :key="tag.tagName" style="display: inline">
              <el-tag v-if="tag.flag" closable @close="close(tag.tagId)">{{tag.tagName}}</el-tag>
            </div>
            <el-select v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in tags"
                :key="item.tagId"
                :label="item.tagName"
                :value="item.tagId"
                :disabled="item.flag">
              </el-option>
            </el-select>
          </el-card>
        </el-form-item>

        <el-form-item>
          <mavon-editor v-model="form.content"/>
        </el-form-item>

        <el-form-item v-if="flag.editor">
          <el-button type="primary" @click="submit">立即创建</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="save">保存编辑</el-button>
        </el-form-item>
      </el-form>
</div>
</template>

<script>
export default{
  data () {
    return {
      flag: {
        editor: false
      },
      value: '',
      type:[],
      tags: [],
      form: {
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' },]
      },
      layout: {
        titleFlag: false
      }
    }
  },
  methods: {
    close (id) {
      this.tags[id-1].flag = false
    },
    setLayout () {
      this.layout.titleFlag = true
    },
    inputConfirm () {
      this.layout.titleFlag = false
    },
    getTags () {
      const tags = []
      this.tags.filter((value) => {
        value.flag
      }).forEach((value) => {
        tags.push(value.tagId)
      })
      return tags
    },
    submit () {
      if(this.form.content=='' || this.form.description==''){
        this.$message.warning('标题和概要不能为空')
      }else{
        this.$axios({
          method: 'post',
          url: '/blog/save',
          data: {
            userId: sessionStorage.getItem('userId'),
            blogContent: this.form.content,
            blogSummary: this.form.description,
            blogTitle: this.form.title
          }
        }).then(res => {
          this.$message.success('发布成功')
        })
      }
    },
    save () {
      this.$message(JSON.stringify(this.getTags()))
    }
  },
  created () {
    if(this.$route.params.blogId==null){
      this.flag.editor = true
    }
    if((this.flag.editor && localStorage.blog != 'null')){
      this.$message.success('已从本地记录中恢复')
      this.form = JSON.parse(localStorage.blog)
    }
    if(!this.flag.editor){
      this.$axios({
        method: 'get',
        url: '/blog/selectOne',
        params: {
          blogId: this.$route.params.blogId
        }
      }).then(res => {
        this.form.title = res.data.data.blogTitle
        this.form.description = res.data.data.blogSummary
        this.form.content = res.data.data.blogContent
      })
    }
    this.$axios({
      method: 'get',
      url: '/blogTag/findAllByLimit',
      params: {limit: 20,page: 1}
    }).then(res => {
      this.tags = res.data.data.rows
      for(var tag in this.tags){
        tag.flag = false
      }
    })
  },
  beforeUpdate () {
    localStorage.blog = JSON.stringify(this.form)
  },

  watch: {
    value(val, oldval){
      this.tags[val - 1].flag = true
    }
  }
}
</script>

<style scoped>
el-input{
  border: 0;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
.el-card{
  width: 100%;
  text-align: left;
}
.container-center{
  text-align: center;
}
.el-form{
  text-align: center;
  margin: 20px auto;
}
.button-title{
  border: 0;
  width: 100%;
  font-size: 30px;
}
</style>
