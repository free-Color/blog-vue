<template>
<el-card>
  <el-form :inline="true">
    <el-form-item label="昵称:">
      <el-input v-model="form.nick" placeholder="输入昵称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <div style="width: 100%"><div class="div-center" @selection-change="handleSelectionChange">
    <el-table :data="data" height="500" style="width: 100%">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="userNickname" label="昵称" width="180"/>
      <el-table-column prop="userState" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.userState === 1" type="danger">未激活</el-tag>
          <el-tag v-if="scope.row.userState === 0" type="success">已激活</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userRole.roleName" label="角色" width="180">
        <template slot-scope="scope">
          <el-tag :type="tags.type[scope.row.roleId]">{{tags.role[scope.row.roleId]}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div></div>
  <div class="div-center" style="margin: 20px 0 0">
    <el-button type="danger" @click="prohibit" plain>封禁用户</el-button>
  </div>
    
    <div class="div-center" style="margin: 20px 0 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        nick: ''
      },
      page: {
        currentPage: 1,
        limit: 10,
        total: 100
      },
      table:{
        selection: [],
        selectionId: []
      },
      tags:{
        type: ['danger', 'warning', 'success'],
        role: ['管理员', '系统人员', '普通用户'],
      },
      data: [
      //   {
      //   "userId": 1,
      //   "userPassword": "4753f178327ea660dac7dfd1808e5186",
      //   "userPhone": "110",
      //   "userMail": "110@qq.com",
      //   "userAvatarAddress": "https://img0.baidu.com/it/u=3128516090,1100310040&fm=26&fmt=auto&gp=0.jpg",
      //   "userNickname": "博客网管",
      //   "userProfile": "博客管理系统的管理员",
      //   "userTime": "2021-09-29T09:29:14.000+00:00",
      //   "userState": 0,
      //   "userDeleted": 0,
      //   "userCode": null,
      //   "roleId": 1,
      //   "userRole": {
      //     "roleId": 1,
      //     "roleName": "管理员",
      //     "roleDescribe": "后台系统维护人员"
      //   }
      // }
      ]
    }
  },
  methods: {
    refreshPage(){
      this.$axios({
        method: 'get',
        url: '/user/findUsers',
        params: {
          offset: this.page.currentPage,
          limit: this.page.limit
        }
      }).then(res => {
        this.data = res.data.data.rows
        this.page.total = res.data.data.total
        // this.$message(JSON.stringify(this.data))
      })
    },
    handleSelectionChange(val){
      this.table.selection = val
    },
    prohibit(){
      var selectionId = []
      this.table.selection.forEach((value) => {
        selectionId.push(value.userId)
      })
      this.$axios({
        method: 'get',
        url: '/user/banUser',
        data: {
          userIds: JSON.stringify(selectionId)
        }
      }).then(res => {
        var selectionId = []
        this.table.selection.forEach((value) => {
          selectionId.push(value.userNickname)
        })
        this.$message.success('已封禁用户' + JSON.stringify(selectionId))
      })
    }
  },
  created () {
    this.refreshPage()
  }
}
</script>

<style scoped>

</style>
