<template>
  <div id="id">

  </div>
  <h2 v-if="loading">Chargement...</h2>
  <router-view v-else></router-view>
</template>

<script>

import axios from "axios"


export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    if (localStorage.token) {
      axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.token}`;
      axios.get("http://localhost:3000/api/user/me")
        .then((res) => {
          this.$store.commit("userData", {
            user: res.data.user,
            token: localStorage.token
          })
          this.loading = false
        })
        .catch((error) => console.log(error))
    }
    else { this.loading = false }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: 'Jost', sans-serif;
  background: rgb(0, 71, 144);
  background: linear-gradient(0deg, rgba(26, 51, 168, 1) 0%, rgba(16, 116, 205, 1) 12%, rgba(163, 56, 255, 1) 49%, rgba(16, 116, 205, 1) 76%, rgba(26, 51, 168, 1) 94%) no-repeat;
}
</style>
