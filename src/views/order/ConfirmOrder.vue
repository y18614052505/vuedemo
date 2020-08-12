<template>
  <div class=''>
      <h1>确认订单</h1>
        <!-- 
            注意问题：在确认订单页面是可以更改商品数量    
            如果有修改数据。记得去找修改购物车数据接口去修改
        -->

        <button @click="confirm_order">确认订单-跳转支付页面-也可以打开一个模态框 进行支付</button>
  </div>
</template>

<script>
// import {create_order} from 'network/order'
export default {
  name: 'ConfirmOrder',
  components: {//组件
  },
  data(){
    return {
        orderData:{
            user_id:'',
            shopcarts_id:[]
        },
    }
  },
  methods: {//事件
  },
  computed: {//计算
  },
  created(){//创建
    this.shop = JSON.parse(this.$route.params.shop)
  },
  activated(){//激活
  },
  deactivated(){//未激活
  },
  mounted(){//渲染
  },
}
</script>
<style lang="less" scoped>
</style>
