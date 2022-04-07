<template>
  <div>
    <div class="container-fluid">
      <!-- Page Heading -->
      <h1 v-if="user">Hello {{ user.name }}</h1>
      <h2 v-if="user">your email: {{ user.email }}</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AuthService from "../../services/AuthService"


import { mapGetters } from 'vuex'

export default {
    name: "test",
    
    computed: {
        ...mapGetters(['user'])
    },
    async mounted() {
        let token = '';
        token = localStorage.getItem('token')
        await AuthService.getUser(token).then(response => {
            this.$store.dispatch('user', response.data.user)
            console.log(response.data.user)
            // this.user = response.data.user
            // this.name = response.data.user.name,
            //   this.email = response.data.user.email
        })
        //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/signin')
        }

    },


}
</script>

<style lang="scss" scoped>
</style>