<template>
  <div class="shop-cart-details" ref="shop_cart_details">
    <div class="shop_shopItem">
      <div class="shop_name">
        <input type="checkbox" v-on:click="shopCheckAll" />
        {{shopName}}
      </div>
      <div v-for="(obj,index) in goods" :key="index" class="shopItem" :title="obj.goods_id">
        <div class="radio">
          <input type="checkbox" v-on:click="checkObj(index)" :checked="obj.ischeck == 1" />{{index}}
        </div>
        <div class="shop">
          <div class="left">
            <img :src="$store.state.urlPath+'/goods/'+obj.img_cover" alt="图片" />
          </div>
          <div class="right" v-on:click="toDetails('/details/'+obj.goods_id)">
            <p class="title">title：{{obj.goods_name}}</p>

            <div class="norm-box" @click.stop="checkNorm(obj)">
              <p class="norm">
                <em>{{obj.goods_name}}</em>
                <span>
                  , 选服务
                  <i class="el-icon-arrow-down"></i>
                </span>
              </p>
            </div>

            <p class="price">价格：{{obj.money_now}}</p>
            <div>
              <button @click.stop="num(obj,'-')">-</button>
              {{obj.num}}
              <button @click.stop="num(obj,'+')">+</button>
            </div>
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
    shopName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      ischeck: true,
    };
  },
  computed: {
    name() {
      return this.shopName;
    },
    goods() {
      return this.$store.state.shopCart[this.name];
    },
  },
  components: {
    //组件
  },
  methods: {
    toDetails(path) {
      alert(path);
      this.$router.push(path);
    },
    checkNorm(obj) {
      console.log(obj);
      this.$emit("checknorm", obj);
    },
    // 商品的复选按钮被点击
    checkObj(index) {
      var e = e || event;
      console.log(index);
      console.log(this.goods)
      let num = 1;
      if(!e.target.checked){
        num = -1;
      }
      this.$store.state.totalPayment += this.goods[index].money_now * this.goods[index].num * num
      this.$store.state.totalNum += num;
      this.goods[index].ischeck = Number(e.target.checked).toString();
      // console.log(e.target.checked, obj);
      this.$emit('checkGoods','item')
    },
    // 店铺的复选按钮被点击
    shopCheckAll() {
      let e = e || event;
      // console.log(e.target.checked);
      let box = this.$refs.shop_cart_details;
      let btnAll = box.querySelectorAll(".radio input[type='checkbox']");
      let temp = 1;
      if (!e.target.checked) {
        temp = -1;
      }
      for (let i = 0; i < btnAll.length; i++) {
        if(this.goods[i].ischeck == '1' && e.target.checked){
          continue
        } 
        this.goods[i].ischeck = Number(e.target.checked).toString();
        this.$store.state.totalPayment +=
          this.goods[i].money_now * this.goods[i].num * temp;
        this.$store.state.totalNum += temp;
        btnAll[i].checked = e.target.checked;
        this.$emit('checkGoods','shop_name')
      }
      console.log(this.goods)
    },
    num(obj, operation) {
      if (operation == "-") {
        obj.num--;
      }
      if (operation == "+") {
        obj.num++;
      }
    },
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
        width: 20px;
        justify-content: center;
        margin-right: 10px;
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
          flex: 2.5;
          overflow: hidden;
          display: flex;
          align-items: center;
          img {
            width: 100%;
          }
        }
        .right {
          line-height: @line-heigh;
          padding: 0 15px;
          flex: 7;
          text-align: left;
          .title {
            // height: @line-heigh * 2;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
            -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。*/
            -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
            margin-bottom: 10px;
          }
          .norm-box {
            display: inline-block;
            max-width: 100%;
            margin-bottom: 10px;
            .norm {
              border-radius: 20px;
              padding: 3px 10px;
              background-color: #f2f2f2;
              display: flex;
              max-width: 100%;
              width: auto;
              vertical-align: middle;
              em {
                display: inline-block;
                max-width: 60%;
                font-style: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              span {
                min-width: 74px;
                margin-left: 5px;
              }
            }
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
}
</style>
