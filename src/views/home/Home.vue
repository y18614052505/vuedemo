<template>
  <div id="home">
    <nav-bar class="home-nav-bar" @leftBarClick="toCategory">
      <div slot="left">分类</div>
      <div slot="center">
        <el-input v-model="input" placeholder="请输入内容" v-on:focus="toSearch"></el-input>
      </div>
      <div slot="right">登录</div>
    </nav-bar>
    <hr />
    <scroll
      class="homeContent"
      :probeType="3"
      @parentScroll="HomeScroll"
      ref="scrollCom"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-rotation :cbanners="banners"></home-rotation>
      <hr />
      <!-- 功能视图 -->
      <home-feature :cfeature="feature"></home-feature>
      <hr />

      <div>
        <button style="width:100%" @click="changeDirection">
          改变商品数据排列
        </button>
      </div>
      <div class="tabContent">
        <div class="tabTitle">
          <button @click="tabClick('recommend')">recommend</button>
          <button @click="tabClick('news')">news</button>
          
        </div>
        <!-- <div>
          {{showGoodsList}}
          <hr/>
        </div> -->

        <goods-list :cgoods='showGoodsList' :cpath="path" :cisDirection='parentDirection'></goods-list>
        <!-- <goods-list1 :cgoods='goods' :cpath="path"></goods-list1> -->










        <!-- <div v-for="(item,key) in goods" :key="key">
          <ul v-if='tabCurrentType == key'>
            <li v-for="(i,index) in item.list" :key="index">
              <a href="javascript:;">
                <img :src="path+i.c3_img"/>
                <span>{{i.c3_name}}</span>
              </a>
              <hr/>
            </li>
          </ul>
        </div>-->
      </div>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop">返回顶部</a>
  </div>
</template>

<script>
//引入公共组件
import NavBar from "components/common/navbar/NavBar";
//引入公共组件中跟项目....
import Scroll from "components/contents/scroll/Scroll";
import GoodsList from "components/contents/goods/GoodsList";
// import GoodsList1 from "components/contents/goods/GoodsList1";
//引入当前组件的子组件
import HomeRotation from "./childComp/HomeRotation";
import HomeFeature from "./childComp/HomeFeature";
// import {getHomeBanner} from "network/home"

//引入其他文件
//引入网络请求模块部分组件/方法
import { getHomeBanner, getFeature, get_jd_category_max } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      banners: null,
      feature: [],
      aaa: 100.1111,
      input: "",
      num: 500,
      isShowBackTop: false,
      //接收商品的obj
      goods: {
        recommend: {
          page: 0,
          list: []
        },
        news: {
          page: 10,
          list: []
        }
      },
      tabCurrentType: "recommend",
      parentDirection:true,
    };
  },
  components: {
    NavBar,
    Scroll,
    GoodsList,
    // GoodsList1,
    HomeRotation,
    HomeFeature
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner();
    //获取功能视图数据
    this.getFeature();
    // var arr = [1,2,3,4,5]
    // this.filterFeatrue(100)
    this.getGoodsMax("recommend");
    this.getGoodsMax('news');
  },
  computed:{
    showGoodsList(){
      return this.goods[this.tabCurrentType].list
    }
  },
  methods: {
    //去banner的数据
    getHomeBanner() {
      getHomeBanner().then(res => {
        // console.log(res);
        this.banners = res;
        // this.banners = {...res}//解构赋值
      });
    },
    //定义功能视图的数据
    getFeature() {
      let that = this;
      getFeature().then(res => {
        // console.log(res);
        let arr = res;
        for (let i = 0; i < arr.length / 10; i++) {
          that.feature.push([]);
          // arr.map((item,index)=>{
          //   parseInt(index/10) == i ? that.feature[i].push(item):""
          // })
          arr.forEach((item, index) => {
            parseInt(index / 10) == i ? that.feature[i].push(item) : "";
          });
        }
        // console.log(this.feature);
      });
    },
    HomeScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
      // console.log(this.isShowBackTop);
    },
    //回到顶部
    toTop() {
      // console.log("回到顶部");
      this.$refs.scrollCom.scrollTo(0, 0, 300);
    },
    //home页面的商品数据请求
    getGoodsMax(type) {
      let page = this.goods[type].page + 1;
      get_jd_category_max(page).then(res => {
        // console.log(res);
        this.goods[type].page += 1;
        this.goods[type].list.push(...res);
        this.$refs.scrollCom.scroll.finishPullUp();
      });
    },
    //加载更多数据
    loadMore() {
      this.getGoodsMax(this.tabCurrentType);
    },
    //点击切换
    tabClick(type) {
      this.tabCurrentType = type;
      // if (!this.goods[type].list.length) {
      //   this.getGoodsMax(type);
      // }
    },
    toCategory() {
      this.$router.push("/category");
    },
    toSearch() {
      console.log("focus");
      this.$router.push("/search");
    },
    changeDirection(){
      this.parentDirection = !this.parentDirection
    }
  }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: #e43130;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.homeContent {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.toTop {
  position: absolute;
  bottom: 100px;
  right: 5px;
  background-color: red;
}
.tabContent {
  display: flex;
  flex-wrap: wrap;
}
.tabContent .tabTitle {
  width: 100%;
  display: flex;
}
.tabContent .tabTitle button {
  width: 50%;
  height: 40px;
  flex: 1;
}
.tabContent div {
  width: 100%;
}
.tabContent div ul {
  width: 100;
}
.tabContent div ul li img {
  width: 30%;
}
</style>
