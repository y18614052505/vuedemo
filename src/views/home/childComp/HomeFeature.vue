<template>
  <feature class="home-feature">
    <feature-item v-for="(item,index) in cfeature" :key="index">
      <li v-for="i in item" :key="i.id">
          {{i.id}}
      </li>
      <li v-if="index == cfeature.length-1 && cfeature.length%10 != 0">
          全部
      </li>
    </feature-item>
  </feature>
</template>

<script>
import { Feature, FeatureItem } from "components/common/feature";
export default {
  name: "HomeFeature",
  props: {
    cfeature: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    console.log(this.cfeatrue);
  },
  components: {
    Feature,
    FeatureItem
  }
};
</script>
<style scoped>
</style>