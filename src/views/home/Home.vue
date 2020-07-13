<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">&lt;</div>
      <div slot="center"><input type="search" placeholder="衣服"></div>
      <div slot="right">登录</div>
    </nav-bar>
    <hr>
    <!-- <ul class="banner">
      <li v-for="(item,index) in banners"  :key="index">
        <img :src="path+bannerSrc+item.crs" alt="">
      </li>
    </ul> -->
    <home-rotation :cbanners="banners"></home-rotation>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeRotation from './childComp/HomeRotation'
import * as base from "network/home"
// import {getHomeBanner} from "network/home"
export default {
  name:"Home",
  data(){
    return {
      banners:null,
    }
  },
  components:{
    NavBar,
    HomeRotation
  },
  created(){//vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner()
  },
  methods:{
    getHomeBanner(){
      base.getHomeBanner().then(res=>{
        console.log(res);
        this.banners = res
        // this.banners = {...res}//解构赋值
      })
    }
  }
}

</script>
<style scoped>
  #home{
    padding-top:44px;
    height:100vh;
  }
  .home-nav-bar{
    background-color:#e43130;
    color:white;
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index: 100;
  }
</style>
