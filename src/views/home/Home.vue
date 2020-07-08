<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">&lt;</div>
      <div slot="center"><input type="search" placeholder="衣服"></div>
      <div slot="right">登录</div>
    </nav-bar>
    aaaaa
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:"Home",
  components:{
    NavBar
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
