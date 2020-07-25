<template>
  <div class="scroll" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true, //
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // console.log(this.scroll);
    if (this.probeType == 2 || this.probeType == 3) {
      // console.log("被执行");
      this.scroll.on("scroll", position => {
        // console.log(position);
        //调用以下父组件中绑定的事件，并传递参数
        this.$emit("parentScroll", position);
      });
    }
    //当父组件允许加载更多时，才能监听滚动条是否滚动到页面底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("滚动到页面底部了");
        this.$emit('pullingUp') 
      });
    }
  },
  methods: {
    //定义跳转页面指定位置事件
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  }
};
</script>
<style scoped>
</style>
