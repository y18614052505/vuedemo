<template>
  <div id="app">
    <router-view/>
    <main-tab-bar></main-tab-bar>
    
  </div>
  
</template>

<script>
  import MainTabBar from 'components/contents/MainTabbar/MainTabbar'
  export default {
    name:"app",
    components:{
      MainTabBar
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
