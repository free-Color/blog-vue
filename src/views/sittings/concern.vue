<template>
<el-tabs style="height: 200px;margin: 20px">
  <el-tab-pane label="关注我的">
    <ul v-infinite-scroll="loadFan" style="width: 80%">
      <div v-for="fan in fans" :key="fan">
        <router-link :to="'/user/' + fan.userId" style="color: black">
          {{fan.userNickname}}<el-divider/>
        </router-link>
      </div>
    </ul>
  </el-tab-pane>
  <el-tab-pane label="我关注的" name="second">
    <ul v-infinite-scroll="loadFollow" style="width: 80%">
      <div v-for="fan in folls" :key="fan">
        <div class="div-between">
          <router-link :to="'/user/' + fan.userId" style="color: black">
            <span>{{fan.userNickname}}</span>
          </router-link>
          <el-button type="danger" @click="click(fan.userId)" plain>取消关注</el-button>
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
      fans: [],
      pagefl: {
        page: 1,
        total: 21
      },
      folls: []
    }
  },
  methods: {
    loadFollow(){
      if(this.pagefl.page*20>this.pagefl.total)return
      this.$axios({
        method: 'get',
        url: '/user/findFollowers',
        params: {
          limit: 20,
          offset: this.pagefl.page,
          userId: sessionStorage.getItem('userId')
        }
      }).then(res => {
        this.pagefl.total = res.data.data.total
        this.folls = this.folls.concat(res.data.data.rows)
      })
      this.pagefl.page += 1
    },
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
        this.fans = this.fans.concat(res.data.data.rows)
      })
      this.pagef.page += 1
    },
    click (id) {
      // this.$message(JSON.stringify(id))
      this.$axios({
        method: 'post',
        url: '/user/follow',
        params: {
          followerId: sessionStorage.getItem('userId'),
          userId: id
        }
      }).then(res => {
        if(res.data.data == false){
          this.folls = []
          this.pagefl.page = 1
          this.pagefl.total = 21
          this.loadFollow()
          this.$message.success('你已成功取消关注')
        }
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
</style>
