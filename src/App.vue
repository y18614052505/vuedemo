<template>
  <div id="app">
    <!-- 
      缓存中会存有数据记录，所以在使用过的时候，会出现数据不进行替换。 
      正常使用中，如果不使用keep-alive,组件在离开的时候会被销毁
    -->
    <keep-alive :exclude="$store.state.keepExclude">
      <router-view />
    </keep-alive>
    <jd-main-tab-bar v-if="is_jd_tabbar"></jd-main-tab-bar>
    <jx-main-tab-bar v-if="is_jx_tabbar"></jx-main-tab-bar>
  </div>
</template>

<script>
import JdMainTabBar from "components/contents/MainTabbar/JdMainTabbar";
import JxMainTabBar from "components/contents/MainTabbar/JxMainTabbar";
export default {
  name: "app",
  components: {
    JdMainTabBar,
    JxMainTabBar,
  },
  computed: {//计算
    is_jd_tabbar(){
      return this.$store.state.TabBar.is_jd_TabBar
    },
    is_jx_tabbar(){
      return this.$store.state.TabBar.is_jx_TabBar
    }
  },
  watch: {
    is_jd_tabbar(newVal,oldVal){
      console.log(newVal,oldVal);
    }
  },
};
</script>

<style>
@import "assets/css/base.css";
#app {
  height: 100vh;
}
</style>
