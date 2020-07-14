<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">&lt;</div>
      <div slot="center">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div slot="right">登录</div>
    </nav-bar>
    <hr />
    <!-- 轮播图 -->
    <home-rotation :cbanners="banners"></home-rotation>
    <hr>
    <!-- 功能视图 -->
    <home-feature :cfeature="feature" ></home-feature>
    
    <table-a></table-a>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeRotation from "./childComp/HomeRotation"
import HomeFeature from './childComp/HomeFeature'
import tableA from './childComp/table'
import * as base from "network/home"
// import {getHomeBanner} from "network/home"
export default {
  name: "Home",
  data() {
    return {
      banners: null,
      feature: [],
      aaa:100.1111,
      input: ''
    };
  },
  components: {
    NavBar,
    HomeRotation,
    HomeFeature,
    tableA
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner();
    //获取功能视图数据
    this.getFeature()
    // var arr = [1,2,3,4,5]
    // this.filterFeatrue(100)
  },
  methods: {
    //去banner的数据
    getHomeBanner() {
      base.getHomeBanner().then(res => {
        // console.log(res);
        this.banners = res;
        // this.banners = {...res}//解构赋值
      });
    },
    //定义功能视图的数据
    getFeature(){
      let that = this
      base.getFeature().then(res=>{
        console.log(res)
        let arr = res
        for(let i = 0; i < arr.length/10 ; i++){
          that.feature.push([])
          // arr.map((item,index)=>{
          //   parseInt(index/10) == i ? that.feature[i].push(item):""
          // })
          arr.forEach((item,index)=>{
            parseInt(index/10) == i ? that.feature[i].push(item):""
          })
        }
        console.log(this.feature);
      })
    }
  },
  // filter:{
  //   // filterFeatrue(data,i){
  //   //   console.log(data);
  //   //   console.log(i);
  //   //   return data;
  //   // }
  //   num(data){
  //     return "$"+data
  //   }
  // }
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
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
</style>
