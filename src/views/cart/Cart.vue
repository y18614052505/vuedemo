<template>
  <div>
    <scroll id="cartScroll">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">购物车</div>
          <p class="address">配送至:{{$store.state.ShippingAddress}}</p>
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
        <div class="cart_empty" v-if="!$store.state.shopCartLength">
          <img :src="$store.state.urlPath+'/routine/cart_empty.png'" alt />
          <p>您的购物车还没有任何数据，请添加商品</p>
        </div>
        <div v-else class="shop-cart-details">
          <dl v-for="(item,key) in $store.state.shopCart" :key="key">
            <dt>
              <input type="radio" />
              {{key}}
            </dt>
            <dd v-for="(obj,index) in item" :key="index">
              <img :src="$store.state.urlPath+'/goods/'+obj.img_cover" alt="图片" />
              <p>
                title：{{obj.goods_name}}
                <br />
              </p>

              <p>
                规格：{{obj.norm}}
                <br />
              </p>

              <p>
                价格：{{obj.money_now}}
                <br />
              </p>
              数量：{{obj.num}}
              <br />
            </dd>
          </dl>
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
export default {
  name: "Cart",
  created() {
    //如果用户存在。则网络请求shopCart数据
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
  background-color: mediumaquamarine;
  .cartNavBar {
    background-color: #fff;
    .title {
      font-size: 16px;
      line-height: 24px;
    }
    .address {
      font-size: 10px;
      line-height: 20px;
      margin: 0 auto;
      max-width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .shop-cart-details {
    margin-top: 10px;
    border-radius: 10px;
    background-color: #fff;
    dl {
      border-bottom: 1px solid #d5d5d5;
      margin-bottom: 5px;
      margin-left: 20px;
    }
    dt {
      text-align: left;
      line-height: 30px;
      input {
        margin-right: 20px;
      }
    }
    dd {
      img {
        width: 35%;
        height: inherit;
      }
      p.title {
      }
      p.price {
        color: red;
      }
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
