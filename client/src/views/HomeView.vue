<template>
  <!-- Topbar Start -->
  <TopBarVue></TopBarVue>
  <!-- Topbar End -->
  <!-- Navigation Start -->
  <NavigationVue></NavigationVue>
  <!-- <router-view/> -->

  <!-- <router-view /> -->

  <!-- Navigation End -->

  <!-- Featured Start -->
  <div class="container-fluid pt-5">
    <div class="row px-xl-5 pb-3">
      <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
          <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
          <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
          <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
          <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
          <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
          <h5 class="font-weight-semi-bold m-0">14-Day Return</h5>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
          <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
          <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
        </div>
      </div>
    </div>
  </div>
  <!-- Featured End -->

  <!-- Categories Start -->
  <div class="container-fluid categoriesContainer pt-5">
    <div class="row px-xl-5 pb-3" >
      <div class="col-lg-4 col-md-6 pb-1" v-for="category in categories">
        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px; height:500px">
          <p class="text-right">15 Products</p>
          <a href class="cat-img position-relative overflow-hidden mb-3">
            <img class="img-fluid" :src="category.img" alt />
          </a>
          <h5 class="font-weight-semi-bold m-0">{{category.name}}</h5>
        </div>
      </div>
      
    </div>
  </div>
  <!-- Categories End -->
  <!-- Footer Start -->
  <FooterVue></FooterVue>
  <!-- Footer End -->
</template>

<script>
// @ is an alias to /src
import API from "../api/api_"
import TopBarVue from "../components/TopBarVue.vue"
import NavigationVue from "../components/NavigationVue.vue"
import FooterVue from "../components/FooterVue.vue"
import { mapGetters } from 'vuex'
import categories from '../assets/categories.json'

export default {
  name: 'HomeView',
  components: {
    TopBarVue,
    NavigationVue,
    FooterVue,
  },
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      products: [],
      categories: categories
    };
  },
  async created() {
    this.products = await API.getAllProduct();
    console.log(products)
    if (localStorage.getItem('token') === null) {
      this.$router.push('/signin')
    }

  }
}
</script>
