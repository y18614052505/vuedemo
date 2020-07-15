<template>
  <div id="category">
    <div class="one">
      <tab-control ref='tabControl1' :titlesArr="jd_category_one" @tabClick="getSecMenuList">
        <div @click="getSecMenuList('0')" :class="{active:ListIndex === '0'}">
          <span>热门推荐</span>
        </div>
      </tab-control>
    </div>
    <div class="two">
      <div v-if="ListIndex === '0'">
        <div>热门</div>
        <dl v-if="hotRecommend.length">
          <dt>浏览记录</dt>
          <dd v-for="item in hotRecommend" :key="item">{{item}}</dd>
        </dl>
        <hr v-if="!ListIndex && hotRecommend.length" />
        <dl>
          <dt>热门分类</dt>
          <dd v-for="(item,index) in secMenuList" :key="index">
            <img :src="baseUrl+item.c3_img" />
            <p>{{item.c3_name}}</p>
          </dd>
        </dl>
      </div>
      <div v-if="ListIndex !== '0'">
        <div>哈哈哈</div>
        <dl v-for="(item,name) in secMenuList" :key="name">
          <dt>{{name}}</dt>
          <dd v-for="(list,index) in item" :key="index">
            <img :src="baseUrl+list.c3_img" />
            <p>{{list.c3_name}}</p>
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
      baseUrl: "http://106.12.85.17:8090/public/image/jd_category/",
      jd_category_one: [],
      jd_category_two: [],
      jd_category_three: [],
      secMenuList: null,
      ListIndex: "0",
      hotRecommend: [],
      jd_category_all: {},
      num: 0
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
  watch: {
    secMenuList(newVal) {
      if (this.ListIndex === "0") {
        return;
      }
      console.log(newVal);
    }
  },
  methods: {
    get_jd_category_one() {
      get_jd_category_one().then(res => {
        // console.log(res);
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
        // console.log(res);
        if (res) this.jd_category_three.push(...res);
        this.getSecMenuList(this.ListIndex);
      });
    },
    getSecMenuList(id) {
      console.log(id);
      if (id === "0") {
        this.secMenuList = this.jd_category_three.filter(item => {
          if (item.c3_ishot == 1) {
            return true;
          }
          return false;
        });
      } else {
        // this.secMenuList = this.jd_category_two.filter(item => {
        //   if (item.c1_id == id) {
        //     return true;
        //   }
        //   return false;
        // });
        this.secMenuList = {};
        this.jd_category_two.forEach(twoList => {
          if (twoList.c1_id == id) {
            // console.log(twoList.c1_id, 123);
            this.secMenuList[twoList.c2_name] = {};
            // console.log(this.secMenuList);
            this.jd_category_three.forEach(threeList => {
              if (twoList.c2_id == threeList.c2_id) {
                this.secMenuList[twoList.c2_name][
                  threeList.c3_name
                ] = threeList;
              }
            });
          }
        });
        console.log(this.secMenuList);
      }
      this.ListIndex = id;
      console.log(this.$refs.tabControl1.ListIndex);
      this.$refs.tabControl1.ListIndex = id;
    }
  }
};
</script>
<style lang='less' scoped>
#category {
  display: flex;
  font-size: 12px;
}
.one {
  flex: 1;
  width: 100%;
  div{
    border-bottom: 1px solid #dcdcdc;
    span {
      display: block;
      height: 40px;
      line-height: 40px;
      background-clip: content-box;
    }
  }
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
.two dl {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.two dt {
  width: 100%;
  text-align: left;
  line-height: 25px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
.two dd {
  width: 33%;
  margin-bottom: 10px;
}
.two dd img {
  width: 80%;
}
.active {
  background-color: red;
}
</style>
