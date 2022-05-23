<template>
  <div id="id">
    <UserConnect></UserConnect>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import UserConnect from './components/UserConnect.vue'

export default {
  name: 'App',
  components: {
    UserConnect
  }
}
</script>

<style lang="scss">
body{
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
</style>
