<template>
  <div>
    <scroll id="cartScroll">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">购物车</div>
        <div slot="right" class="right">
          <!-- el-icon-more -->
          <el-dropdown trigger="click" @command="pushRouter">
            <span class="el-dropdown-link">
              <i class="el-icon-more-outline el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home">首页</el-dropdown-item>
              <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/profile">我的京东</el-dropdown-item>
              <el-dropdown-item command="/profile" disabled>浏览记录</el-dropdown-item>
              <el-dropdown-item command="/profile" divided>我的关注</el-dropdown-item>
              <el-dropdown-item command="/profile" divided>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>
      <div v-if="!$store.state.userInfo" class="shopcart_login_bar">
        登录可以同步账号下的购物车信息
        <router-link tag="a" to="/login">登录</router-link>
      </div>
      <div v-else class="shopDetails">这个是购物车显示的数据</div>
      <div class="shopBox">aaaa</div>
    </scroll>
    <cart-tab-bar></cart-tab-bar>
  </div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
//内部子组件
import CartTabBar from "./childComp/CartTabBar";
export default {
  name: "Cart",
  created() {
    if (this.$store.state.userInfo) {
      this.getShopCart();
    }
  },
  components: {
    NavBar,
    Scroll,
    CartTabBar,
  },
  methods: {
    pushRouter(path) {
      console.log(path);
      this.$router.push(path);
    },
    //获取购物车数据，调用vuex中actions的数据
    getShopCart() {
      this.$store.dispatch("getShopCart", this.$store.state.userInfo);
    },
  },
};
</script>
<style lang='less' scoped>
#cartScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  .shopDetails {
    height: 300px;
    background-color: red;
  }
  .shopBox {
    height: 5000px;
    background-image: -webkit-linear-gradient(to top, red, pink);
    background-image: -moz-linear-gradient(to top, red, pink);
    background-image: -ms-linear-gradient(to top, red, pink);
    background-image: linear-gradient(to top, red, pink);
  }
}
body {
  margin: 0;
}
</style>
