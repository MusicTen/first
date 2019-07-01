<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to pageA"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    console.log(this.URL);
  }
}
</script>
<style lang="scss" scoped>
.home {
  img {
    width: 200px;
    height: 200px;
  }
}
</style>

