<template>
  <div id="app">
    <!-- 
      缓存中会存有数据记录，所以在使用过的时候，会出现数据不进行替换。 
      正常使用中，如果不使用keep-alive,组件在离开的时候会被销毁
    -->
    <keep-alive :exclude="$store.state.keepExclude" :include="$store.state.keepInclude">
      <router-view />
    </keep-alive>
    <jd-main-tab-bar v-if="$store.state.TabBar.is_jd_TabBar"></jd-main-tab-bar>
    <jx-main-tab-bar v-if="$store.state.TabBar.is_jx_TabBar"></jx-main-tab-bar>
  </div>
</template>

<script>
import JdMainTabBar from "components/contents/MainTabbar/JdMainTabbar";
import JxMainTabBar from "components/contents/MainTabbar/JxMainTabbar";
export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {
    JdMainTabBar,
    JxMainTabBar
  },
  mounted() {
  },
  created(){
    console.log(this.$store.state.userInfo);
  }
};
</script>

<style>
@import "assets/css/base.css";
#app{
  height:100vh;
}
</style>
