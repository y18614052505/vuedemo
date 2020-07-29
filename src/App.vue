<template>
  <div id="app">
    <!-- 
      缓存中会存有数据记录，所以在使用过的时候，会出现数据不进行替换。 
      正常使用中，如果不使用keep-alive,组件在离开的时候会被销毁
    -->
    <keep-alive :exclude="keepExclude" :include="keepInclude">
      <router-view />
    </keep-alive>
    <main-tab-bar v-if="is_jd_TabBar"></main-tab-bar>
    <main-tab-bar v-if="is_jx_TabBar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/contents/MainTabbar/MainTabbar";
export default {
  name: "app",
  data() {
    return {
      is_jd_TabBar: true,
      is_jx_TabBar:false,
      userId:null,
      keepExclude:'Details,Cart',
      keepInclude:''
    };
  },
  components: {
    MainTabBar
  },
  mounted() {
  }
};
</script>

<style>
@import "assets/css/base.css";
#app{
  height:100vh;
}
</style>
