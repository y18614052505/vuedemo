<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
    <main-tab-bar v-if="isTabBar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/contents/MainTabbar/MainTabbar";
export default {
  name: "app",
  data() {
    return {
      isTabBar: true
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
