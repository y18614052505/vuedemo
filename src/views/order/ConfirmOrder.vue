<template>
  <div class=''>
      <h1>确认订单</h1>
        {{shop}}
        <button @click='payment'>确认订单-跳转支付页面-也可以打开一个模态框 进行支付</button>
  </div>
</template>

<script>
import {create_order} from 'network/order'
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
    payment(){
      //获取要提交的数据
      this.orderData.user_id = this.$store.state.userInfo

      this.shop.forEach(item=>{
        this.orderData.shopcarts_id.push(item.id)
      })
      if(window.confirm('是否确认提交订单')){
        create_order(this.orderData).then(res=>{

          if(res.code != 200){
            //失败的话 给用于一个提示。当用户点击确认的时候。跳转页面
            this.$router.push('/profile')
            return
          }
          this.$router.push('/payment/'+res.data.order_id)

        })
      }
    }
  },
  computed: {//计算
  },
  created(){//创建
    //JSON.stringify()  // 把数组/对象类型的数据转换成JSON类型的字符串数据
    // JSON.parse() 方法把字符串数据转换成原来的类型
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
