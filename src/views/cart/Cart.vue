<template>
  <div>
    <scroll id="cartScroll">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">购物车</div>
          <p class="address">配送至:{{address}}</p>
        </div>
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
      <div>
        <!-- 正常判断购物车数据 ShopCart 为空。。 -->
        <div class="cart_empty" v-if="!shopCartLength">
          <img :src="urlPath+'/routine/cart_empty.png'" alt />
          <p>您的购物车还没有任何数据，请添加商品</p>
        </div>
        <div v-else>
          <cart-goods
            v-for="(item,key) in shopCart"
            :key="key"
            :goods="item"
            :shopName="key"
            @checknorm="selectNorm"
          ></cart-goods>
        </div>
      </div>
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
import CartGoods from "./childComp/CartGoods";
export default {
  name: "Cart",
  created() {
    //如果用户存在。则网络请求shopCart数据
    if (this.$store.state.userInfo && this.shopCartLength == 0) {
      // this.getShopCart();
      this.$store.dispatch("getShopCart", this.$store.state.userInfo);
    }
  },
  components: {
    NavBar,
    Scroll,
    CartTabBar,
    CartGoods,
  },
  beforeRouteEnter(to, from, next) {
    alert("进入cart");
    //这是守卫是在组件创建创建之前调用的。所以不能获取实例 this
    //因为当当前守卫执行的时候，组件实例还没有被创建
    next();
  },
  beforeRouteLeave(to, from, next) {
    //导航离开该组件对应的路由时调用
    //可以访问实例`this`
    alert("离开cart");
    next();
  },
  computed: {
    shopCartLength() {
      return this.$store.state.shopCartLength;
    },
    urlPath() {
      return this.$store.state.urlPath;
    },
    address() {
      return this.$store.state.ShoppingAddress;
    },
    shopCart() {
      return this.$store.state.shopCart;
    },
  },
  watch: {
    shopCart(val) {
      console.log(val);
    },
  },
  methods: {
    pushRouter(path) {
      console.log(path);
      this.$router.push(path);
    },
    //获取购物车数据，调用vuex中actions的数据
    // getShopCart() {
    //   console.log(this.$store.state.userInfo);
      
    // },
    checkShopSelect() {},
    selectNorm(obj) {
      console.log(obj);
    },
  },
};
</script>
<style lang='less' scoped>
#cartScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  background-color: mediumaquamarine;
  .cartNavBar {
    background-color: #fff;
    .title {
      font-size: 18px;
      line-height: 24px;
    }
    .address {
      font-size: 14px;
      line-height: 20px;
      margin: 0 auto;
      max-width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .shopBox {
    margin-top: 15px;
    border-radius: 10px;
    background-color: #fff;
    height: 5000px;
  }
  .shop-cart {
  }
}
body {
  margin: 0;
}
</style>
