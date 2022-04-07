<template>
    <div>
        <!-- Topbar Start -->
        <TopBarVue></TopBarVue>
        <!-- Topbar End -->
        <!-- Navigation Start -->
        <NavigationVue></NavigationVue>
        <!-- Navigation End -->
        <!-- Dashboard Content Start -->
        <!-- Dashboard Content End -->

        <button v-on:click="signOut">SignOut</button>
        <h1 v-if="user">Hello {{ user.name }}</h1>
        <h2 v-if="user">your email: {{ user.email }}</h2>
        <!-- Footer Start -->
        <FooterVue></FooterVue>
        <!-- Footer End -->
    </div>
</template>

<script>
import axios from 'axios'
import AuthService from "../services/AuthService"
import TopBarVue from "../components/TopBarVue.vue"
import NavigationVue from "../components/NavigationVue.vue"
import FooterVue from "../components/FooterVue.vue"
import { mapGetters } from 'vuex'

export default {
    name: "DashboardView",
    components: {
        TopBarVue,
        NavigationVue,
        FooterVue,
    },
    computed: {
        ...mapGetters(['user'])
    },
    async mounted() {
        let token = '';
        token = localStorage.getItem('token')
        await AuthService.getUser(token).then(response => {
            this.$store.dispatch('user', response.data.user)
            console.log(`dashboard ${response.data.user.role}`)
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

<style scoped>
</style>