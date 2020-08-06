<template>
  <div id="home">
    <nav-bar class="home-nav-bar" >
      <div slot="left" v-on:click="toCategory">分类</div>
      <div slot="center">
        <el-input v-model="input" placeholder="请输入内容" v-on:focus="toKeywords"></el-input>
      </div>
      <div slot="right">登录</div>
    </nav-bar>
    <hr />
    <scroll
      class="homeContent"
      :probeType="3"
      @parentScroll="HomeScroll"
      ref="homeScrollCom"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-rotation :cbanners="banners"></home-rotation>
      <hr />
      <!-- 功能视图 -->
      <home-feature :cfeature="feature" @cfeatureAll='toFeatureAll'></home-feature>
      <hr />
      <div>
        <button style="width:100%" @click="changeDirection">改变商品数据排列</button>
      </div>
      <div class="tabContent">
        <div class="tabTitle">
          <button @click="tabClick('recommend')">recommend</button>
          <button @click="tabClick('news')">news</button>
        </div>
        <goods-list
          :cgoods="showGoodsList"
          :cpath="path"
          :cisDirection="parentDirection"
          :bus="bus"
        ></goods-list>
      </div>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop"></a>
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
import { debounce } from "common/utils";
//引入其他文件
//引入网络请求模块部分组件/方法
import { getHomeBanner, getFeature} from "network/home";
//取商品数据
import { getGoods} from "network/goods";
export default {
  name: "Home",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      banners: null,
      feature: [],
      input: "",
      num: 500,
      isShowBackTop: false,
      //接收商品的obj
      goods: {
        recommend: {
          page: 0,
          list: [],
        },
        news: {
          page: 10,
          list: [],
        },
      },
      tabCurrentType: "recommend", //当前被选中tab按钮的类型
      parentDirection: true, // goods展示的时候是否切换横向/纵向展示
      isLoadmore: true, //是否加载更多
      bus: "homeImageLoad",
      saveY: 0, //保存滚动条y的值
      postData: {
        like: "", //模糊查询
        order: {
          // c2_id: "UtoD",
          // money_now: "DtoU", 
        },
        minMoney: 0,
        maxMoney: 0, 
        exact: {//精确查找
        },
      },
    };
  },
  components: {
    NavBar,
    Scroll,
    GoodsList,
    HomeRotation,
    HomeFeature,
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner();
    //获取功能视图数据
    this.getFeature(1);
    this.getGoodsMax("recommend");
    this.getGoodsMax("news");
    this.getShopCart(this.$store.state.userInfo);
  },
  activated() {
    //在组件激活的时候，调整滚动条的位置。
    this.$refs.homeScrollCom.scroll.scrollTo(0 , this.saveY , 0);
    this.$refs.homeScrollCom.scrollTo1(0, this.saveY, 0);
    this.$refs.homeScrollCom.refreshScroll();
  },
  deactivated() {
    //在组件离开的时候，记录滚动条的位置
    this.saveY = this.$refs.homeScrollCom.scroll.y;
    // console.log(this.saveY);
  },
  computed: {
    //显示的goods是哪一个
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    },
  },
  methods: {
    //取banner的数据
    getHomeBanner() {
      getHomeBanner().then((res) => {
        this.banners = res.data;
      });
    },
    //定义功能视图的数据
    getFeature() {
      getFeature().then((res) => {
        console.log(res);
        //if (res.code != 200) return console.log("getFeature没有请求到数据");
        let arr = res.data;
        for (let i = 0; i < arr.length / 10; i++) {
          this.feature.push([]);
          arr.forEach((item, index) => {
            parseInt(index / 10) == i ? this.feature[i].push(item) : "";
          });
        }
      });
    },
    //获取滚动条滚动的值
    HomeScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    },
    //回到顶部
    toTop() {
      this.$refs.homeScrollCom.scrollTo1(0, 0, 300);
    },
    //取出home页现实的goods数据
    getGoodsMax(type) {
      // let page = this.goods[type].page + 1;
      let data = {
        page:this.goods[type].page + 1,
        pagesize:10
      }
      getGoods(data).then((res) => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.homeScrollCom.finishpullup();
        this.isLoadmore = true; //获取到一次数据后isLoadmore 才变为true，才能进行下一次请求
      });
    },
    //加载更多数据
    loadMore() {
      if (!this.isLoadmore) return; //如果this.isLoadmore 则代表上一次请求没完成。不能下一次请求
      this.isLoadmore = false;
      this.getGoodsMax(this.tabCurrentType);
    },
    //点击切换
    tabClick(type) {
      this.tabCurrentType = type;
    },
    //跳转category页面
    toCategory() {
      this.$router.push("/category");
    },
    //跳转关键字页面
    toKeywords() {
      this.$router.push("/keywords");
    },
    //点击功能视图的全部，执行的跳转事件
    toFeatureAll(){
      this.$router.push('/home/feature')
    },
    //切换功能视图横纵向展示事件
    changeDirection() {
      this.parentDirection = !this.parentDirection;
    },
    //获取购物车数据，调用vuex中actions的数据
    getShopCart(data) {
      if(data != "" && data != null && data != undefined){
        this.$store.dispatch("getShopCart", data);
      }  
    },
  },
  mounted() {
    // 使用防抖方法，放置图片刷新被多次循环调用，在指定事件内，如果没有图片加载完成，我们在刷新scroll高度
    const refresh = debounce(this.$refs.homeScrollCom.refreshScroll, 50);
    this.$bus.$on(this.bus, () => {
      //当图片加载完成 在GoodsListItem中通过$bus总线 执行 当前方法 goodsImageLoad ,
      //然后对BScroll  进行重新计算高度
      // this.$refs.homeScrollCom.refresh(); // this.$refs.homeScrollCom   =>> 没找到 refresh方法()
      refresh();
    });
  },
  filters: {
    changePrice: (data, str) => {
      return str + data;
    },
  },
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
  /* height:calc(100vh - 93px); */
  overflow: hidden;
}
.toTop {
  position: absolute;
  bottom: 100px;
  right: 5px;
  /* background-color: red; */
  background-image: url(~assets/img/common/top.png);
  display: block;
  width: 40px;
  height: 40px;
  background-size: 100%;
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
