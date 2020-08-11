<template>
  <div id="login">
    <nav-bar>
      <div slot="left">
        <router-link to="/home" class="el-icon-arrow-left" tag="i"></router-link>
      </div>
      <div slot="center">京东登录注册</div>
    </nav-bar>

    <div class="bigBox">
      <div v-if="isPhoneLogin">
        <div class="inputBox">
          <span :v-model="region" @click="changeRegion">
            {{region}}
            <span class="el-icon-arrow-down"></span>
          </span>
          <el-input placeholder="请输入手机号" :oninput="changeValue()" v-model="phone" clearable></el-input>
        </div>
        <div class="inputBox">
          <el-input
            placeholder="请输入收到的验证码"
            maxlength="6"
            :oninput="changeValue()"
            v-model="code"
            clearable
          ></el-input>|
          <el-button :disabled="isCodeDisable">获取验证码</el-button>
        </div>
        <el-button type="danger"  :disabled="isDisable">登录</el-button>
      </div>
      <div v-else>
        <div class="inputBox">
          <el-input placeholder="用户名/邮箱/手机号" v-model="phoneName" clearable></el-input>
        </div>
        <div class="inputBox">
          <el-input placeholder="请输入密码" show-password v-model="password" clearable></el-input>|
          <el-button>忘记密码</el-button>
        </div>
        <el-button type="danger" @click="userClick" v-if="phoneName && password">登录</el-button>
        <el-button type="danger" v-else disabled>登录</el-button>
      </div>
      <el-button type="danger" plain @click="popUpBox('暂不支持!','使用此功能，请安装最新版京东APP','warning')">一键登录</el-button>
      <p>
        <span class="left" @click="isPhoneLogin = !isPhoneLogin">
          {{isPhoneLogin?'账号密码登录':'短信验证码登录'}}
        </span>
        <router-link  class="right" to="/home" tag="span">手机快速注册</router-link>
      </p>
      <div class="striping">
        <h4>其他方式</h4>
      </div>
      <p class="other">
        <a>
          <i class="el-icon-potato-strips"></i>
          <div>QQ</div>
        </a>
        <a>
          <i class="el-icon-ice-drink"></i>
          <div>微信</div>
        </a>
      </p>
      <p>
        <span v-if="isPhoneLogin">未注册的手机号验证后将自动创建京东账号, 登录即代表您已同意</span>
        <span v-else>登录即代表您已同意</span>
        <a href="http://106.12.85.17:8090/app/help/private_policy.html">京东隐私政策</a>
      </p>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
// import {phone_code} from 'network/login'
export default {
  name: "Login",
  data() {
    return {
      region: "+86",
      phone: "",
      code: "",
      phoneName: "",
      password: "",
      isPhoneLogin: true,
      isCodeDisable: true,
      isDisable: true,
    };
  },
  components: {
    navBar,
  },
  computed: {},
  created() {
    // phone_code('13212345678')
  },
  mounted() {},
  methods: {
    changeRegion() {
      alert("aaa");
    },
    changeValue() {
      let res = /^1[3|4|5|7|8][0-9]{9}$/;
      if (this.phone && this.phone.length == 11 && res.test(this.phone)) {
        this.isCodeDisable = false;
      } else {
        this.isCodeDisable = true;
      }
      if (!this.isCodeDisable && this.code) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    // 一键登录点击事件
    popUpBox(t, m, ty) {
      this.$notify({
        title: t,
        message: m,
        type: ty,
      });
    },
  },
};
</script>
<style lang='less' scoped>
#login {
  background-color: #fff;
  padding-top: 50px;
  height: calc(100vh - 50px);
  .bigBox {
    width: 90%;
    margin: 0 auto;
    .inputBox {
      display: flex;
      line-height: 56px;
      border-bottom: 1px solid rgb(223, 223, 223);
      color: black;
      span {
        flex: 1;
      }
      .el-input {
        flex: 4;
      }
      .el-button {
        height: auto;
        color: #e2231a;
        border: none;
        flex: 1;
      }
      .el-button.is-disabled {
        color: #c0c4cc;
      }
    }
    p {
      min-height: 40px;
      line-height: 24px;
      color: rgb(172, 172, 172);
    }
    .striping {
      margin-top: 20%;
      border-top: 1px solid rgb(182, 182, 182);
      h4 {
        color: rgba(0, 0, 0, 0.2);
        width: 36%;
        margin: -0.6rem auto 0;
        background: #fff;
        text-align: center;
      }
    }
    .other a {
      display: inline-block;
      width: 30%;
      i {
        font-size: 26px;
        padding: 10%;
        background-color: rgb(238, 251, 255);
        color: rgb(78, 19, 187);
        border-radius: 50px;
        margin-bottom: 3%;
      }
    }
  }
}
</style>

<style lang='less'>
.el-notification {
  width: 92%;
  background-color: black;
  .el-notification__title {
    text-align: left;
    color: white;
  }
  .el-notification__content {
    color: white;
  }
}
.el-input {
  width: 72%;
  .el-input__inner {
    border: 1px solid transparent;
    padding-left: 0;
  }
}
.el-button {
  width: 100%;
  border-radius: 50px;
  margin: 3% 0;
  height: 50px;
}
.el-button--danger.is-plain {
  margin-left: 0;
  background-color: #fff;
  border-color: rgb(224, 60, 60);
}
</style>