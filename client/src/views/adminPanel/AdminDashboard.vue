<template>
    <div>
        <!-- Page Wrapper -->
        <div id="wrapper">
            <!-- Sidebar -->
            <SideBar></SideBar>
            <!-- End of Sidebar -->
            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">
                <!-- Main Content -->
                <div id="content">
                    <!-- Topbar -->
                    <NavBar></NavBar>
                    <!-- End of Topbar -->
                    <router-view/>
                    <!-- <router-view name="user"/> -->

                    <!-- <router-view name="user"/> -->

                    <!-- Begin Page Content -->
                    
                    <!-- End of Page Content -->
                </div>
                <!-- End of Main Content -->
                <!-- Footer -->
                <!-- <FooterComponent></FooterComponent> -->
                <!-- End of Footer -->
            </div>
            <!-- End of Content Wrapper -->
        </div>
        <!-- End of Page Wrapper -->
        <!-- Logout Modal-->
        <LogOut></LogOut>
    </div>
</template>

<script>
import axios from 'axios'
import AuthService from "../../services/AuthService"
import NavBar from '../../components/dashboard/NavBar'
import SideBar from '../../components/dashboard/SideBar'
import LogOut from '../../components/dashboard/LogOut'

import { mapGetters } from 'vuex'

export default {
    name: "AdminDashboard",
    components: {
        NavBar,
        SideBar,
        LogOut
    },
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

<style src = "../../../public/css/dashboard.css">


</style>