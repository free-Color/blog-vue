<template>
<div><h1>test</h1>
    <el-form>
      <el-form-item>
        <el-input v-model="form.username" placeholder="username" clearable/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="password" show-password clearable/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="store">sign in</el-button>
    <h2>{{message}}</h2>
</div>
</template>
<script>
export default {
  data () {
    return {
        form: {
          username: '',
          password: ''
        },
        message: ''
    }
  },
  methods: {
    store(){
      sessionStorage.setItem('form', JSON.stringify(this.form))
    }
  },
  created () {
    if(sessionStorage.getItem('form') != null)
      this.form = JSON.parse(sessionStorage.getItem('form'))
    this.message = sessionStorage.getItem('form')
  }
}
</script>
