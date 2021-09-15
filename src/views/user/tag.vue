<template>
<el-card>
  <el-table :data="tags" height="600" style="width: 100%" border>
      <el-table-column prop="tagName" label="标签名" width="180"/>
      <el-table-column prop="blogSummary" label="描述" width="180"/>
      
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
  </el-table>
  
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
      </el-pagination></div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      tags: [{
        tagName: ''
      }]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
