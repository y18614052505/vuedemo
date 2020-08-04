<template>
  <div class="shop-cart-details">
    <div class="shop_shopItem">
      <div class="shop_name">
        <input type="checkbox" />
        {{shopName}}
      </div>
      <div v-for="(obj,index) in goods" :key="index" class="shopItem" :title="obj.goods_id">
        <div class="radio">
          <input type="checkbox" />
        </div>
        <div class="shop">
          <div class="left">
            <img :src="$store.state.urlPath+'/goods/'+obj.img_cover" alt="图片" />
          </div>
          <div class="right">
            <p class="title">title：{{obj.goods_name}}</p>

            <p class>规格：{{obj.norm}}</p>

            <p class="price">价格：{{obj.money_now}}</p>
            <div>数量：{{obj.num}}</div>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
    shopName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  components: {
    //组件
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
@line-heigh: 20px;
.shop-cart-details {
  margin-top: 10px;
  border-radius: 10px;
  background-color: #fff;
  div.shop_shopItem {
    border-bottom: 1px solid #d5d5d5;
    margin-bottom: 5px;
    margin: 0 15px;
    .shopItem {
      display: flex;
      margin-bottom: 20px;
      .shop_name {
        font-size: 20px;
        font-weight: bold;
        input {
          width: 16px;
          height: 16px;
        }
      }
      .radio {
        align-items: center;
        display: flex;
        width: 40px;
        justify-content: center;
        input {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
      .shop {
        display: flex;
        flex: 1;
        .left {
          flex: 3;
          overflow: hidden;
          display: flex;
          align-items: center;
          img {
            width: 100%;
          }
        }
        .right {
          line-height: @line-heigh;
          padding: 5px;
          flex: 7;
          text-align: left;
          .title {
            height: @line-heigh * 2;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
  div.shop_name {
    text-align: left;
    line-height: 30px;
    input {
      margin-right: 20px;
    }
  }
  dd {
    img {
      width: 35%;
      height: inherit;
    }
    p.title {
    }
    p.price {
      color: red;
    }
  }
}
</style>
