 <template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        用户管理1
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        配置管理1
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        角色管理1
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">
        定时任务补偿1
      </el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%" id="aaa">
      <el-table-column prop="date" label="日期" width="120"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "table",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
#aaa table {
  width: 100% !important;
}
</style>