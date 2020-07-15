<template>
  <div :id="componentsId" class="TabControl">
    <div>
      <slot></slot>
    </div>
    <div v-for="item in titlesArr" :key="item.c1_id">
      <span
        @click="itemClick(item.c1_id)"
        :class="{active:ListIndex == item.c1_id}"
      >{{item.c1_name}}--{{item.c1_id}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    componentsId: {
      type: String,
      default: "TabControl"
    },
    titlesArr: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      ListIndex: 0
      //   currentIndex: 0
    };
  },
  components: {},
  created() {},
  mounted() {
    console.log(this.titlesArr);
  },
  methods: {
    itemClick(index) {
      //   console.log(index);
      //   this.ListIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>
<style lang='less' scoped>
.TabControl {
  width: 100%;
  font-size: 12px;
  div {
    border-bottom: 1px solid #dcdcdc;
    span {
      display: block;
      height: 40px;
      line-height: 40px;
      background-clip: content-box;
    }
  }
}
.active {
  background-color: red;
}
</style>
