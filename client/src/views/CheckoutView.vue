<template>
  <div>
    <!-- Topbar Start -->
    <TopBarVue></TopBarVue>
    <!-- Topbar End -->
    <!-- Navigation Start -->
    <NavigationVue></NavigationVue>
    <!-- Navigation End -->
    
    <!-- Footer Start -->
    <FooterVue></FooterVue>
    <!-- Footer End -->
  </div>
</template>

<script>
import TopBarVue from "../components/TopBarVue.vue"
import NavigationVue from "../components/NavigationVue.vue"
import FooterVue from "../components/FooterVue.vue"
import { mapGetters } from 'vuex'

export default {
  name: "CartView",
  components: {
    TopBarVue,
    NavigationVue,
    FooterVue,
  },
  computed: {
    ...mapGetters(['user']),
    cartItems() {
      return this.$store.state.cartItems;
    },
    totalPrice() {
      let price = 0;
      this.$store.state.cartItems.map(el => {
        price += el['quantity'] * el['price']
      });
      return price;
    }
  },
  
}
</script>

<style scoped>

</style>