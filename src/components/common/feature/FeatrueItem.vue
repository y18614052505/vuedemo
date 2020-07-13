<template>
  <ul class="featureItem">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "FeatureItem"
};
</script>
<style scoped>
.featureItem {
  width: 100vw;
  flex-shrink: 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.featureItem li {
  width: 20vw;
  justify-content: center;
  flex-shrink: 0;
}
</style>