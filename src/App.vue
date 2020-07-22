<template>
  <div id="app">
    <router-view/>
    <main-tab-bar v-if='isTabBar'></main-tab-bar>
    
  </div> 
</template>

<script>
  import MainTabBar from 'components/contents/MainTabbar/MainTabbar'
  export default {
    name:"app",
    data(){
      return {
        isTabBar:true
      }
    },
    components:{
      MainTabBar
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
