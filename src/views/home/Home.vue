<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">&lt;</div>
      <div slot="center">
        <input type="search" placeholder="衣服" />
      </div>
      <div slot="right">登录</div>
    </nav-bar>
    <hr />
    <!-- <ul class="banner">
      <li v-for="(item,index) in banners"  :key="index">
        <img :src="path+bannerSrc+item.crs" alt="">
      </li>
    </ul>-->
    <home-rotation :cbanners="banners"></home-rotation>
    <home-feature :cfeature="feature"></home-feature>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeRotation from "./childComp/HomeRotation"
import HomeFeature from "./childComp/HomeFeature"
import * as base from "network/home"
// import {getHomeBanner} from "network/home"
export default {
  name: "Home",
  data() {
    return {
      banners: null,
      feature: []
    };
  },
  components: {
    NavBar,
    HomeRotation,
    HomeFeature
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner();

    //请求feature数据
    this.getFeature()
  },
  methods: {
    getHomeBanner() {
      base.getHomeBanner().then(res => {
        // console.log(res);
        this.banners = res;
        // this.banners = {...res}//解构赋值
      });
    },
    getFeature() {
      //请求数据库 返回res数据
      // base.getFeature().then(res => {
      //   console.log(res);
      //   this.banners = res;
      //   // this.banners = {...res}//解构赋值
      // });
      //假设 arr 就是res返回的数据
      var arr = [
        { id: "1", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "2", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "3", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "4", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "5", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "6", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "7", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "8", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "9", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "10", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "11", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "12", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "13", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "14", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "15", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "16", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "17", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "18", img: "xxx", href: "xxx", metail: "xxx" },
        { id: "19", img: "xxx", href: "xxx", metail: "xxx" }
      ];
      for(let i = 0 ; i < arr.length/10; i++){
        this.feature.push([])
        for(let j = 0 ; j < arr.length ;j++){
          if(parseInt(j/10) == i){
            this.feature[i].push(arr[j])
          }
        }
      }
      console.log(this.feature);
    }
  }
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
