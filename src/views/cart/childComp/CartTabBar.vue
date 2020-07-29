<template>
  <div id="DetailsTabBar">
    <tab-bar class='bar'>
        <tab-bar-item>
            <img slot="item-icon" src="" />
            <div slot="item-text">客服</div>
        </tab-bar-item>
        <tab-bar-item>
            <img slot="item-icon" src="" />
            <div slot="item-text">店铺</div>
        </tab-bar-item>
        <tab-bar-item>
            <img slot="item-icon" src="" />
            <div slot="item-text">购物车</div>
        </tab-bar-item>
    </tab-bar>
    <div class='btn'>
      <router-link tag='button' to='payload' class='payload'>
        <span >立即支付</span>
      </router-link >
    </div>
  </div>
</template>

<script>
import TabBar  from 'components/common/tabbar/TabBar'
import TabBarItem  from 'components/common/tabbar/TabBarItem'
export default {
  name: "DetailsTabBar",
  data() {
    return {};
  },
  components: {
    //组件
    TabBar,
    TabBarItem
  },
  computed: {
    //计算
  },
  created() {
    //创建
  },
  activated() {
    //激活
  },
  deactivated() {
    //未激活
  },
  mounted() {
    //渲染
  },
  methods: {
    //事件
  },
  watch: {
    //监听
  },
};
</script>
<style lang='less' scoped>
#DetailsTabBar{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    height:49px;
    background-color:#fff;
    box-shadow: 0 -1px 1 #dedede;
    display: flex;
    div.bar{
        position:static;
        min-width: 70vw;
        display: flex;
    }
    div.btn{
        max-width:30vw;
        min-width: 30vw;
        display: flex;
        button{
            flex:1;
            margin:0 3px;
            height:40px;
            border-radius:20px;
            font-size:14px;
            padding:0 13px;
            color:#fff;
            background:red;
            outline: none;
            border:none;
            span{
                display: block;
                min-width: 14px;
                overflow: hidden;
                height:14px;
            }
        }
        button.payload{
            background:yellow;
            color:#000;
        }
    }
}
</style>
