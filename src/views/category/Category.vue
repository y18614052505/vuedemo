<template>
  <h2>分类</h2>
</template>

<script>
import vue from 'vue'
import axios from "axios";
function request(){
    const instance = new axios.create({
        baseURL:"http://106.12.85.17:9091"
    })
    return instance
}
vue.prototype.axios = request();
export default {
  name: "Category",
  created(){
    this.aaa()
  },
  methods: {
    aaa() {
      this.axios.get('/vuedemo/banner').then(res=>{
        console.log(res);
      })
    }
  }
};
</script>
<style scoped>
</style>
