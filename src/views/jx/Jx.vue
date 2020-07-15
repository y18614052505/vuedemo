<template>
  <div id="jx">
    <nav-bar class="jx-nav-bar">
      <div slot="center">
        惊喜
      </div>
    </nav-bar>
    <hr />
    <!-- 轮播图 -->
    <jx-rotation :cbanners="banners"></jx-rotation>
    <hr>
    <!-- 功能视图 -->
    <jx-feature :cfeature="feature" :iscopy='iscopy'></jx-feature>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import JxRotation from "./childComp/JxRotation"
import JxFeature from './childComp/JxFeature'
// import {getHomeBanner} from "network/home"

//引入网络请求模块部分组件/方法
import {getHomeBanner,getFeature} from "network/home";

export default {
  name: "Jx",//惊喜 惊吓
  data() {
    return {
      banners: null,
      feature: [], 
      iscopy:true
    };
  },
  components: {
    NavBar,
    JxRotation,
    JxFeature,
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getJxBanner();
    //获取功能视图数据
    this.getFeature()
    // var arr = [1,2,3,4,5]
    // this.filterFeatrue(100)
  },
  methods: {
    //去banner的数据
    getJxBanner() {
      getHomeBanner().then(res => {
        // console.log(res);
        this.banners = res;
        // this.banners = {...res}//解构赋值
      });
    },
    //定义功能视图的数据
    getFeature(){
      let that = this
      getFeature().then(res=>{
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
};
</script>
<style scoped>
#jx {
  padding-top: 44px;
  height: 100vh;
}
.jx-nav-bar {
  background-color: #e43130;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
