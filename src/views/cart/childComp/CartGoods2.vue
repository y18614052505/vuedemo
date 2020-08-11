<template>
  <div class="shop-cart-details" ref="shop_cart_details">
    <div element-loading-text v-for="(item,index) in goods" :key="index">
      <el-checkbox-group v-model="indexArr" @change="handleCheckedCitiesChange">
        <el-checkbox :label="item.goods_id" ></el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- {{goods_idd}} -->
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
      indexArr:[]
    };
  },
  computed: {
    name() {
      return this.shopName;
    },
    goods() {
      return this.$store.state.shopCart[this.name];
    },
    indexArraaa(){
      return this.$store.state.indexArr[this.name]
    }
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
    num(obj, operation) {
      if (operation == "-") {
        obj.num--;
      }
      if (operation == "+") {
        obj.num++;
      }
    },
    handleCheckedCitiesChange(val){
      console.log(val);
      if(val.length == this.goods.length){
        console.log(this.$parent.$parent.checkedCities);
        this.$parent.$parent.checkedCities.push(this.name)
      }else{
        let a = this.$parent.$parent.checkedCities.indexOf(this.name);
        if(a != -1){
          this.$parent.$parent.checkedCities.splice(a,1)
        }
        
      }
      // let e = e || event;
      // console.log(e.target);
    }
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
