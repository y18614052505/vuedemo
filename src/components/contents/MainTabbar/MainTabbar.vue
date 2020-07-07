<template>
  <tab-bar>
      <tab-bar-item path ="/home">
        <img slot='item-icon' src="../../../assets/img/tabbar/home.svg" />
        <img slot='item-icon-active' src="../../../assets/img/tabbar/home_active.svg" />
        <div slot='item-text' >首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot='item-icon' src="../../../assets/img/tabbar/category.svg" />
        <img slot='item-icon-active' src="../../../assets/img/tabbar/category_active.svg" />
        <div slot='item-text'>分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot='item-icon' src="../../../assets/img/tabbar/shopcart.svg" />
        <img slot='item-icon-active' src="../../../assets/img/tabbar/shopcart_active.svg" />
        <div slot='item-text' >购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot='item-icon' src="../../../assets/img/tabbar/profile.svg" />
        <img slot='item-icon-active' src="../../../assets/img/tabbar/profile_active.svg" />
        <div slot='item-text' >我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
//TabBar 组件组件
// localhost:8081/src/components/tabbar/Tabbar
// import TabBar from "../tabbar/TabBar";
//调用了 webpack.base.conf.js 中的 resolve("src")函数
// components  webpack的别名中配置的名字
import TabBar from "../../common/tabbar/TabBar.vue";
// TabBarItem  插槽组件
import TabBarItem from '../../common/tabbar/TabBarItem.vue'
export default {
  name:"MainTabbar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
