<template>
<el-tabs tab-position="top" style="height: 200px;margin: 20px">
<el-tab-pane label="基本资料">
  <el-form label-width="80px" style="width: 600px;margin: 20px">
    <el-form-item label="姓名:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item label="性别:">
      <el-select v-model="form.sex" placeholder="请选择">
        <el-option v-for="item in ['男','女']" :key="item" :label="item" :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item label="家乡:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</el-tab-pane>
<el-tab-pane label="个人信息">
  <el-form label-width="120px" style="width: 600px;margin: 20px">
    <el-form-item label="感兴趣的技术:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item label="最近目标:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item label="座右铭:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item label="自我介绍:"><el-input :row="3" type="textarea" v-model="form.name"/></el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</el-tab-pane>
<el-tab-pane label="联系方式">
  <el-form label-width="120px" style="width: 600px;margin: 20px">
    <el-form-item label="微信号:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item label="QQ号:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item label="手机号码:"><el-input v-model="form.name"/></el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</el-tab-pane>
</el-tabs>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      form: {
        name: '',
        sex: '',
      }
    }
  }
}
</script>
<style scoped>

</style>

