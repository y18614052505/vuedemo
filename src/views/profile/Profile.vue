<template>
  <div>我的</div>
</template>
<script>
export default {
  name: "Profile",
  beforeRouteEnter(to, from, next) {
    //组件创建前调用的守卫
    next();
  },
  data() {
    return {};
  },
  created(){
    if(!this.$root.$children[0].userId) this.$router.push('/login')
  }
};
</script>

<style scoped>
</style>
