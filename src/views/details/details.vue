<template>
  <div id="details">
    <nav-bar class="detailsNavBar" ref="detailsNavBar">
      <div slot="left" class="left" v-on:click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <el-tabs
        slot="center"
        ref="tabCenter"
        class="tabCenter"
        v-model="currentIndex"
        @tab-click="tabCenterClick"
      >
        <el-tab-pane
          v-for="(item,index) in titleArr"
          v-bind:key="index"
          v-bind:label="item"
          v-bind:name="item"
        ></el-tab-pane>
      </el-tabs>
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
    <scroll class="detailsScroll" ref="DetailsScroll" @parentScroll="getScrollY" :probeType="3">
      <div style="height:800px;">
        <details-rotation :dfeature="goodsImg"></details-rotation>
      </div>
      <div style="height:800px;">评价组件</div>
      <div style="height:800px;">详情组件</div>
      <div style="height:800px;">推荐组件</div>
    </scroll>
    <!-- 手动轮播 -->
    <details-tab-bar></details-tab-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import Scroll from "components/contents/scroll/Scroll";
//引入当前组件的子组件
import DetailsRotation from "./childComp/DetailsRotation";
import DetailsTabBar from "./childComp/DetailsTabBar";
//引入商品数据网络请求
// import {getgoods,getGoods_id} from 'network/goods'
import { getGoodsId } from "network/goods";
export default {
  name: "Details",
  props: {},
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      detailsGoods: {},
      titleArr: ["商品", "评价", "详情", "推荐"],
      goodsImg: null,
      // currentIndex: 0,
      currentIndex: "商品",
      saveY: 0,
      tabCenter: null,
    };
  },
  components: {
    NavBar,
    Scroll,
    DetailsRotation,
    DetailsTabBar,
  },
  beforeRouteEnter(to, from, next) {
    alert("进入details");
    //这是守卫是在组件创建创建之前调用的。所以不能获取实例 this
    //因为当当前守卫执行的时候，组件实例还没有被创建
    next()
  },
  beforeRouteUpdate(to, from, next) {
    alert("details被复用");
    //当路由被改变，且当前组件被复用时调用
    //例如: 有路由/main/:id,   从/main/1 到/main/2之间进行跳转
    //由于渲染main组件,因此组件实例会被复用，此时该守卫会被调用
    //可以访问实例`this`
    next()
  },
  beforeRouteLeave(to, from, next) {
    //导航离开该组件对应的路由时调用
    //可以访问实例`this`
    console.log(from.path,"离开details",to.path);
    next()
  },
  computed: {},
  created() {
    // console.log(this.$router);
    //在keep-alive状态下，created()方法只执行1此，因为当前组件不会被销毁
    // console.log("details被创建");
    this.detailsId = this.$route.params.id;
    this.getGoods(this.detailsId);
  },
  activated() {},
  mounted() {
    console.log("details 被渲染");

    this.$bus.$on("toDE", (path) => {
      this.isShow = true;
      this.$refs.DetailsScroll.scroll.scrollTo(0, -path * 800, 200);
      this.currentIndex = this.titleArr[path];
    });
    // console.log(this.$refs.center);
    // this.tabCenter = this.$refs.center.$el;
    this.tabCenter = this.$refs.tabCenter.$el;
  },
  watch: {
    //监听数据改变。做一些数据变化的事情。。。。
  },
  methods: {
    //通过id获取商品的方法
    getGoods(data) {
      getGoodsId(data).then((res) => {
        if (res.code != 200) return;
        this.detailsGoods = { ...res.data.goodsData };
        this.goodsImg = res.data.goodsData.img_detalis_list;
        console.log(this.goodsImg);
      });
    },
    back() {
      this.$router.go(-1);
    },
    pushRouter(path) {
      console.log(path);
      this.$router.push(path);
    },
    //在滚动的时候计算 tabCenter的显示，以及tanCenter的显示
    getScrollY(position) {
      if (-position.y <= 0) return;
      // if (!this.$refs.center) return;
      // this.tabCenter = this.$refs.center;
      // if (-position.y < 100 && -position.y > 0 && this.tabCenter) {
      //   this.tabCenter.style.opacity = `${-position.y / 100}`;
      //   this.tabCenter.style.filter = `opacity(${-position.y})`;
      // } else if (-position.y > 100) {
      //   this.tabCenter.style.opacity = `1`;
      //   this.tabCenter.style.filter = `opacity(100)`;
      // }

      if (-position.y < 0) this.tabCenter.style.display = "none";
      else this.tabCenter.style.display = "flex";

      this.$refs.detailsNavBar.$el.style.background = `rgba(255,255,255,${
        -position.y / 100
      })`;
      this.tabCenter.style.opacity = `${-position.y / 100}`;
      this.tabCenter.style.filter = `opacity(${-position.y})`;
      this.tabCenter.style.opacity = `1`;
      this.tabCenter.style.filter = `opacity(100)`;
      this.currentIndex = this.titleArr[parseInt(-position.y / 800)];
    },
    //tabCenter 点击后跳转滚动条位置
    tabCenterClick(val) {
      console.log(val);
      var num = 0;
      if (val.constructor == Number || (val.constructor == Number) == String) {
        num = val;
        this.currentIndex = this.titleArr[val - 1];
      } else {
        let arr = val.$el.id.split("-");
        let data = arr[arr.length - 1];
        this.currentIndex = data;
        num = 0;
        this.titleArr.forEach((item, index) => {
          if (item == data) {
            num = index;
          }
        });
      }
      this.$refs.DetailsScroll.scroll.scrollTo(
        0,
        num == 0 ? 0 : -num * 800,
        200
      );
    },
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    },
  },
};
</script>
<style lang='less'>
#details {
  /* tabbar导航的数量*/
  /* @tabbar_length : 4;*/
  width: 100vw;
  height: 100vh;
  .detailsNavBar {
    position: absolute;
    // width:100vw;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    z-index: 100;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0);
    .left i {
      background-color: rgba(59, 59, 59, 1);
      padding: 9px;
      border-radius: 50%;
      color: #fff;
    }
    .tabCenter {
      display: none;
      opacity: 0;
      .tab-bar-center-item {
        flex: 1;
      }
      div.el-tabs__header.is-top,
      div.el-tabs__nav {
        margin: 0 !important;
        width: 100%;
        display: flex;
      }
      .el-tabs__nav-wrap {
        width: 100%;
      }
      .el-tabs__active-bar {
        width: calc(100% / 4) !important;
      }
      .el-tabs__item {
        flex: 1;
        padding: 0;
      }
      .el-tabs__nav-wrap::after {
        background-color: transparent !important;
      }
    }
    .right i {
      background-color: rgba(59, 59, 59, 1);
      padding: 9px;
      border-radius: 50%;
      color: #fff;
    }
  }
  .detailsScroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
}
</style>
