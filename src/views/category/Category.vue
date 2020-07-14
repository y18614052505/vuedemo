<template>
  <div>
    <h2>分类</h2>
    <category-feature :cfeature="feature"></category-feature>
  </div>
</template>

<script>
import CategoryFeature from "./childComp/CategoryFeature";
import * as base from "network/home";
export default {
  name: "Category",
  data(){
    return {
      feature:[]
    }
  },
  components: {
    CategoryFeature
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getFeature();
  },
  methods: {
    //定义功能视图的数据
    getFeature() {
      let that = this;
      base.getFeature().then(res => {
        console.log(res);
        let arr = res;
        for (let i = 0; i < arr.length / 10; i++) {
          that.feature.push([]);
          // arr.map((item,index)=>{
          //   parseInt(index/10) == i ? that.feature[i].push(item):""
          // })
          arr.forEach((item, index) => {
            parseInt(index / 10) == i ? that.feature[i].push(item) : "";
          });
        }
        console.log(this.feature);
      });
    }
  }
};
</script>
<style scoped>
</style>
