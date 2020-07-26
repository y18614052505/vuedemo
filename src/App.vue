<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
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
      userId:null
    };
  },
  components: {
    MainTabBar
  },
  mounted() {
    // this.$bus.on("HomeTabBarF",()=>{
    //   this.isTabBar = false
    // })
    // this.$bus.on("HomeTabBarT",()=>{
    //   this.isTabBar = false
    // })
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
