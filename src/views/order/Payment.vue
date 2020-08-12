<template>
  <div class='Payment'>支付页面</div>
</template>

<script>
export default {
  name: 'Payment',
  data(){
    return {}
  },
  components: {//组件
  },
  computed: {//计算
    shopCart(){
      return this.$store.state.shopCart
    }
  },
  created(){//创建
    console.log(this.shopCart);
  },
  activated(){//激活
  },
  deactivated(){//未激活
  },
  mounted(){//渲染
  },
  methods: {//事件
  },
  watch: {//监听
  },
}
</script>
<style lang="less" scoped>
</style>
