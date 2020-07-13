<template>
  <div id="featureBox">
    <div class="feature">
      <slot></slot>
    </div>
    <div>
        小圆点
    </div>
  </div>
</template>

<script>
export default {
  name: "Feature",
  props: {
    showIndicator:{
        type:Boolean,
        default:true
    }
  },
  data() {
    return {
      fLength: 0
    };
  },
  mounted() {
  },
  methods: {
    // handleDom() {
    //   //获取页面的rotation 元素
    //   let featureBox = document.querySelector("#featureBox");
    //   //获取页面的slide元素
    //   let featureEls = featureBox.querySelectorAll(".feature");
    //   //保存个数
    //   this.fLength = featureEls.length;
    //   //如果图片的数量>1 则操作图片
    //   if (this.fLength > 1) {
    //     //获取滚动的宽度
    //     this.totalWidth = featureBox.offsetWidth;
    //     // 对象赋值  两个对象用了同一个地址
    //     this.rotationStyle = featureBox.style;
    //     console.log(this.totalWidth);
    //   }
    //   this.setTransform(-this.totalWidth);
    // }
  }
};
</script>

<style scoped>
#featureBox{
    /* overflow: hidden; */
    position: relative;
}
.feature {
  display: flex;
  /* flex-shrink:0; */
  width: 100%;
}
</style>