<template>
  <div>
    登录页面  {{$store.state.city}}
    <!-- <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <el-button :plain="true" @click="regSuccess">成功</el-button>
    <el-button :plain="true" @click="regError">错误</el-button>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {
    this.$root.$children[0].is_jd_TabBar = false // 也可以在页面渲染的时候 改变is_jd_TabBar的值
  },
  mounted() {},
  methods: {
    // onSubmit(formName) {
    //   // 为表单绑定验证功能
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
    //       this.$router.push("/Prlfile");
    //     } else {
    //       this.dialogVisible = true;
    //       return false;
    //     }
    //   });
    // },
    // handleClose() {
    //   return
    // },
    // regSuccess() {
    //   this.$message({
    //     message: '恭喜你，这是一条成功消息',
    //     type: 'success'
    //   });
    // },
    // regUser() {
    //   alert("aaaaa");
    // },
    // regError() {
    //   // this.$message({
    //   //   message: '恭喜你，这是一条成功消息',
    //   //   type: 'success'
    //   // }
    //   this.$message.error("错了哦，这是一条错误消息");
    // }
  },
  beforeRouteLeave(to,from,next){
    //组件导航离开，调用的守卫
    this.$root.$children[0].is_jd_TabBar = true
    next()
  },
};
</script>
<style scoped>
/* .login-box {
  width: 80vw;
  padding: 10vw;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
} */
</style>
