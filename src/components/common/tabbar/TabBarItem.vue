<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 用来插入图片 -->
    <div v-if="!isActive"><slot name='item-icon'></slot></div>

    <!-- 用来插入选中后的图片 -->
    <div v-else><slot name='item-icon-active'></slot></div>

    <!-- 文本 -->
    <div :class="{active:isActive}"><slot name='item-text'></slot></div>
  </div>
</template>

<script>
export default {
  name:"TabBarItem",
  props:{//接收父组件传递的path值
    path:{
      type:String
    }
  },
  data(){
    return {
      // isActive:false //false 显示黑色图  true 显示粉色图
    }
  },
  computed:{
    //通过计算属性来让tabbar的active效果改变
    isActive(){
      //this.$route.path
      return this.$route.path.indexOf(this.path) !== -1
    }
  },
  methods:{
    itemClick(){
      //路由跳转
      this.$router.replace(this.path)//category
      console.log(this.$route.path);
    }
  }
}
</script>


<style scoped>
  .tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: crimson;
}
</style>
