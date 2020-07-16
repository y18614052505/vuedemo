<template>
  <div id="category">
    <div class="one">
      <tab-control
        :controlId="tabControlId"
        :titleArr="jd_category_one"
        @tabClick="tabControlClick"
        ref="categoryControl"
      >
        <div @click="tabControlClick('hot')" :class="{active:controlIndex == 'hot'}">
          <span>热门推荐</span>
          --
          <span>0</span>
        </div>
      </tab-control>
    </div>
    <div class="two">
      <div v-if="controlIndex === 'hot'">
        <h1>热门商品</h1>
        <dl v-if="shophistory.length">
          <dt>
            浏览记录
            <el-button type="text" @click="rmHistory">清空</el-button>
          </dt>
          <dd></dd>
        </dl>
        <dl v-for="(item,key) in secMenuList" :key="key">
          <dt>热门分类</dt>
          <dd v-for="(item,key) in secMenuList" :key="key">
            <img :src="path + item.c3_img" alt />
            <span>{{item.c3_name}}</span>
          </dd>
        </dl>
      </div>
      <div v-if="controlIndex != 'hot'">
        <dl v-for="(list,index) in secMenuList" :key="index">
          <dt>{{index}}</dt>
          <dd v-for="(item,key) in list" :key="key">
            <a :href="'/details/'+item">
              <img :src="path + item.c3_img" alt />
              <span>{{item.c3_name}}</span>
            </a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import TabControl from "components/contents/tabControl/TabControl";
//引入网络模块的部分功能/方法
import {
  get_jd_category_one,
  get_jd_category_two,
  get_jd_category_three
} from "network/home";
export default {
  name: "Category",
  data() {
    return {
      //动态定义组件id名字
      tabControlId: "categoryControl",
      //正常数据
      jd_category_one: [],
      jd_category_two: [],
      jd_category_three: [],
      secMenuList: null, //可能是数组，也可能是对象
      controlIndex: "hot",
      path: "http://106.12.85.17:8090/public/image/jd_category/",
      shophistory: [1] // 已经浏览的记录  在发生页面跳转后，在路由守卫中记录当前请求的数据，并在页面跳转前，存储到shophistory中(把整个three中找到的那条数据存进来)
    };
  },
  components: {
    TabControl
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.get_jd_category_one();
    this.get_jd_category_two();
    this.get_jd_category_three();
  },
  methods: {
    //定义业务相关事件
    tabControlClick(index) {
      if (index === "hot") {
        this.secMenuList = [];
        //循环遍历 表3，去除c3_ishot == 1的值,存到 secMenuList中
        //filter本身会返回一个新数组
        this.secMenuList = [
          ...this.jd_category_three.filter(threeList => {
            if (threeList.c3_ishot == 1) {
              return true; // 条件成立 存到新数组
            }
            return false; //条件不成立，不村
          })
        ];
        // this.secMenuList = this.jd_category_three.filter(threeList => {
        //   if (threeList.c3_ishot == 1) {
        //     return true; // 条件成立 存到新数组
        //   }
        //   return false; //条件不成立，不村
        // });
        console.log(this.secMenuList);
      } else {
        this.secMenuList = {};

        this.jd_category_two.forEach(twoList => {
          if (twoList.c1_id == index) {
            this.secMenuList[twoList.c2_name] = {};
            this.jd_category_three.forEach(threeList => {
              if (threeList.c2_id == twoList.c2_id) {
                this.secMenuList[twoList.c2_name][
                  threeList.c3_name
                ] = threeList;
              }
            });
          }
        });
      }
      console.log(this.secMenuList);
      //传递进来的参数用于判断按钮是否被选中
      this.controlIndex = index;
      console.log(index);
      //回传数据给子组件 / 修改子组件的数据
      //(ref = categoryControl 的组件的值)
      this.$refs.categoryControl.itemIndex = index;
    },
    rmHistory(){
      let that = this;
      this.$confirm("是否删除浏览记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          that.shophistory = [];
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //网络请求
    get_jd_category_one() {
      get_jd_category_one().then(res => {
        console.log(res);
        if (res) this.jd_category_one.push(...res);
      });
    },
    get_jd_category_two() {
      get_jd_category_two().then(res => {
        console.log(res);
        if (res) this.jd_category_two.push(...res);
      });
    },
    get_jd_category_three() {
      get_jd_category_three().then(res => {
        console.log(res);
        if (res) this.jd_category_three.push(...res);
        this.tabControlClick(this.controlIndex);
      });
    }
  }
};
</script>
<style scoped>
#category {
  display: flex;
  font-size: 12px;
}
.one {
  flex: 1;
  background-color: #dcdcdc;
}
.one li {
  width: 100%;
}
.one li button {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid #555555;
}
@media screen and (max-width: 768px) {
  .two {
    flex: 3;
    padding: 20px;
    /* background-color: red; */
  }
}
@media screen and (min-width: 768px) {
  .two {
    flex: 6;
    /* background-color: green; */
    padding: 20px;
  }
}
.active {
  color: red;
}
.two dl {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.two dl dt {
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 15px;
}
.two dl dd {
  width: 33%;
  margin-bottom: 10px;
}
.two dl dd img {
  width: 80%;
  display: block;
  margin: 0 auto;
}
</style>
