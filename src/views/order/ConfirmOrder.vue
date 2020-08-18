<template>
  <div id="confirmOrder">
    <scroll class="scroll">
      <nav-bar>
        <div slot="left">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">确认订单</div>
        <div slot="right"></div>
      </nav-bar>
      <div class='address'>
        <div v-if='$store.state.userInfo.defaddr == null'>
          <button>+ 请添加地址</button>
        </div>
        <div v-else class='selectAddr'> defaddr
          <h2>{{'杨孝君'}} <span>{{'18614052505' | changeTel}}</span></h2>
          <div>
            北京市昌平区马池口镇被小营村xxxx
          </div> 
        </div>
      </div>
      {{shop}}
      <button @click="payment">确认订单-跳转支付页面-也可以打开一个模态框 进行支付</button>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import { create_order } from "network/order";
export default {
  name: "ConfirmOrder",
  components: {
    //组件
    NavBar,
    Scroll,
  },
  data() {
    return {
      orderData: {
        user_id: "",
        shopcarts_id: [],
      },
    };
  },
  methods: {
    //事件
    payment() {
      //获取要提交的数据
      this.orderData.user_id = this.$store.state.userInfo;

      this.shop.forEach((item) => {
        this.orderData.shopcarts_id.push(item.id);
      });
      if (window.confirm("是否确认提交订单")) {
        create_order(this.orderData).then((res) => {
          if (res.code != 200) {
            //失败的话 给用于一个提示。当用户点击确认的时候。跳转页面
            this.$router.push("/profile");
            return;
          }
          this.$router.push("/payment/" + res.data.order_id);
        });
      }
    },
  },
  computed: {
    //计算
  },
  created() {
    //创建
    //JSON.stringify()  // 把数组/对象类型的数据转换成JSON类型的字符串数据
    // JSON.parse() 方法把字符串数据转换成原来的类型
    this.shop = JSON.parse(this.$route.params.shop);
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
  filters:{
    changeTel(val){
      return val.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
    }
  }
};
</script>
<style lang="less" scoped>
#confirmOrder {
  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
    .address{
      border-bottom:1px solid baack;
      box-shadow: 0 1px 1px burlywood;
      margin-bottom:10px;
      padding:10px;
      .selectAddr{
        text-align: left;
        h2{
          margin-bottom:8px;
        }
      }
    }
  }
}
</style>


