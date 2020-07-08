<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">&lt;</div>
      <div slot="center"><input type="search" placeholder="衣服"></div>
      <div slot="right">登录</div>
    </nav-bar>
    <ul class="banner">
      <li v-for="(item,index) in banners" :key="index">
        <img :src="path+bannerSrc+item.crs" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import * as base from "network/home"
// import {getHomeBanner} from "network/home"
export default {
  name:"Home",
  data(){
    return {
      banners:{},
      path:"http://106.12.85.17:9091/",
      bannerSrc:'public/image/banner/'
    }
  },
  components:{
    NavBar
  },
  created(){//vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner()
  },
  methods:{
    getHomeBanner(){
      base.getHomeBanner().then(res=>{
        console.log(res);
        this.banners = {...res}//解构赋值
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
  .banner{
    padding:0;
    margin:0;
    width:98vw;
    padding:0 1vw
  }
  .banner li{
    list-style: none;
  }
  .banner img{
    width:98vw
  }
</style>
