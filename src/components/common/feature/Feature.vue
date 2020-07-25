<template>
  <div :id="divID">
    <!-- feature -->
    <div class="feature" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot>
        <!-- 被FeatureItem中的ul代替 -->
      </slot>
    </div>
    <!-- 小按钮 -->
    <div>小按钮</div>
  </div>
</template>

<script>
export default {
  name: "Feature",
  props: {
    divID: {
      type: String,
      default: "featureBox"
    },
    iscopy: {
      //是否允许复制
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0,
      itemLength: 0,
      featureWidth: 0,
      featureStyle: {},
      scrolling: false,
      startX: 0,
      distance: 0,
      animateDuration: 0.3,
      moveBase: 0.3
    };
  },
  methods: {
    handleDom(id) {
      // console.log(this.iscopy);
      // console.log(this.divID);
      // console.log(id);
      let divEl = document.querySelector(`#${id}`);
      divEl.style.position = "relative";
      divEl.style.overflow = "hidden";
      let featureEl = document.querySelector(`#${id} .feature`);
      let itemEls = featureEl.querySelectorAll(".feature-item");
      //根据传递的参数，判断是否需要复制子对象
      if (this.iscopy && itemEls.length > 1) {
        let cloneFirst = itemEls[0].cloneNode(true);
        //克隆最后一张图
        let cloneLast = itemEls[itemEls.length - 1].cloneNode(true);
        //吧克隆的第一张图插入图片的末尾  appendChild
        featureEl.appendChild(cloneFirst);
        //把恐龙的最后一张图插入到图片的最前端  insertBefore  在什么之前插入什么
        featureEl.insertBefore(cloneLast, itemEls[0]);
        this.currentIndex = 1;
      }
      this.itemLength = itemEls.length;
      this.featureWidth = featureEl.offsetWidth;
      // console.log(this.itemLength);
      // console.log(this.featureWidth);
      this.featureStyle = featureEl.style;
      this.setTransform(this.currentIndex  * - this.featureWidth);
    },
    setTransform(position) {
      // console.log(position, "--------------");
      this.featureStyle.transform = `translateX(${position}px)`;
      this.featureStyle["-webkit-transform"] = `translateX(${position}px)`;
      this.featureStyle["-ms-transform"] = `translateX(${position}px)`;
    },
    //移动正确位置
    scrollPosition(currenPosition) {
      this.scrolling = true;
      this.featureStyle.transition = "transform " + this.animateDuration + "ms";
      this.setTransform(currenPosition);
      if(this.iscopy) this.checkPosition();
      this.scrolling = false;
    },
    checkPosition() {
      setTimeout(() => {
        //把动画时间设置为0,瞬间转换图片
        this.featureStyle.transition = "0ms";
        if (this.currentIndex >= this.itemLength + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.featureWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.itemLength;
          this.setTransform(-this.currentIndex * this.featureWidth);
        }
      }, this.animateDuration);
    },
    touchStart(e) {
      // console.log("touchStart被执行");
      if (this.scrolling) return;
      //获取用户拖拽按下点的x坐标
      this.startX = e.touches[0].pageX;
      // console.log(this.startX);
    },
    touchMove(e) {
      this.currentX = e.touches[0].pageX;
      //获取移动前和移动后的距离差
      this.distance = this.currentX - this.startX;
      //防止过度的推拽
      if (!this.iscopy) {
        if (
          (this.distance > 0 && this.currentIndex == 0) ||
          this.distance <= -this.featureWidth
        ) {
          //第一页不能向右滑动了
          return;
        }
        if (
          (this.distance < 0 && this.currentIndex == 1) ||
          this.distance >= this.featureWidth
        ) {
          //第二页不能在向左滑动了
          return;
        }
      }
      //   this.distance =     402 - 433.3333435058594
      // console.log(this.currentX);
      //获取以下在手动移动前的 图片位置
      let currenPosition = -this.currentIndex * this.featureWidth;
      //获取 已经移动的距离
      let moveDistance = this.distance + currenPosition;

      //把当前移动后的值 设置给setTransform
      this.setTransform(moveDistance);
      //当设置结束后,停止移动时,执行下一步的过度
    },
    touchEnd() {
      let currentMove = Math.abs(this.distance);
      if (this.iscopy) {
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentMove > this.featureWidth * this.moveBase
        ) {
          this.currentIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.featureWidth * this.moveBase
        ) {
          this.currentIndex++;
        }
      } else {
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentMove > this.featureWidth * this.moveBase &&
          this.currentIndex == 1
        ) {
          //第一页不能向右滑动了
          this.currentIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.featureWidth * this.moveBase &&
          this.currentIndex == 0
        ) {
          //第二页不能在向左滑动了
          this.currentIndex++;
        }
      }
      this.scrollPosition(-this.currentIndex * this.featureWidth);
    }
  },
  mounted() {
    setTimeout(() => {
      this.handleDom(this.divID);
      // console.log(this.iscopy);
    }, 500);
  }
};
</script>

<style scoped>
.feature {
  display: flex;
  width: 100vw;
}
</style>