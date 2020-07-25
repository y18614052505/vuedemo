<template>
  <div class id="search">
    <nav-bar class="home-nav-bar">
      <div slot="left" @click="$router.go(-1)">&lt;</div>
      <div slot="center">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div slot="right" @click="toSearch">搜索</div>
    </nav-bar>
    <h1>keywords</h1>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "search",
  data() {
    return {
      input: ""
    };
  },
  components: {
    NavBar
  },
  computed: {},
  created() {
    //   isTabbar
  },
  mounted() {
    //当前组件的根组件的第一个子元素的 isTabBar
    this.$root.$children[0].isTabBar = false
  },
  beforeRouteLeave(to, from, next) {
    // console.log(this)
    // console.log(this.$root)
    // console.log(this.$root.$children[0])
    // console.log(this.$root.$children[0].isTabBar)
    this.$root.$children[0].isTabBar = true
    next()
  },
  methods: {
    toSearch() {
      this.$router.push("/search");
    }
  }
};
</script>
<style scoped>
/* #search {
  position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color:#fff;
    z-index: 10;
} */
</style>
