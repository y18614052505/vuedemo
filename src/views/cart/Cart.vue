<template>
  <h2>购物车</h2>
</template>

<script>
export default {
  name:"Cart",
  created(){
    if(!this.$root.$children[0].userId) this.$router.push('/login')
  }
}
</script>
<style scoped>
body{
  margin:0; 
}
</style>
