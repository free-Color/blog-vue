<template>
<el-tabs style="height: 200px;margin: 20px">
  <el-tab-pane label="关注我的">
    <ul v-infinite-scroll="loadFan" style="width: 80%">
      <el-divider/>
      <div v-for="fan in fans" :key="fan">
        {{fan.userNickname}}<el-divider/>
      </div>
    </ul>
  </el-tab-pane>
  <el-tab-pane label="我关注的" name="second">
    <ul v-infinite-scroll="loadFan" style="width: 80%">
      <el-divider/>
      <div v-for="fan in fans" :key="fan">
        <div class="div-between">
          <span>{{fan.userNickname}}</span>
          <el-button type="primary" @click="click(fan.userId)">取消关注</el-button>
        </div>
        <el-divider/>
      </div>
    </ul>
  </el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data () {
    return {
      pagef: {
        page: 1,
        total: 21
      },
      fans: []
    }
  },
  methods: {
    loadFan () {
      if(this.pagef.page*20>this.pagef.total)return
      this.$axios({
        method: 'get',
        url: '/user/findFans',
        params: {
          limit: 20,
          offset: this.pagef.page,
          userId: sessionStorage.getItem('userId')
        }
      }).then(res => {
        this.pagef.total = res.data.data.total
        res.data.data.rows.forEach(element => {
          element.userAvatarAddress = this.$image + element.userAvatarAddress
        });
        this.fans = this.fans.concat(res.data.data.rows)
        this.pagef.page += 1
      })
    },
    click (id) {
      this.$message(JSON.stringify(id))
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
