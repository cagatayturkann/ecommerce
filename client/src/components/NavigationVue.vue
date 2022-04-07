<template>
  <div>
    <!-- Navbar Start -->
    <div class="container-fluid mb-5">
      <div class="row border-top px-xl-5">
        <div class="col-lg-12">
          <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <a href class="text-decoration-none d-block d-lg-none">
              <h1 class="m-0 display-5 font-weight-semi-bold">
                <span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
              </h1>
            </a>
            <button
              type="button"
              class="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div class="navbar-nav mr-auto py-0">
                <router-link to="/" class="nav-link nav-item">
                  <!--<i class="fas fa-fw fa-cog"></i>-->
                  <span>Home</span>
                </router-link>
                <router-link to="/about" class="nav-link nav-item">
                  <!--<i class="fas fa-fw fa-cog"></i>-->
                  <span>About</span>
                </router-link>
                <router-link to="/products" class="nav-link nav-item">
                  <!--<i class="fas fa-fw fa-cog"></i>-->
                  <span>Products</span>
                </router-link>
                <div class="nav-item dropdown">
                  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                  <div class="dropdown-menu rounded-0 m-0">
                    <a href="cart.html" class="dropdown-item">Shopping Cart</a>
                    <a href="checkout.html" class="dropdown-item">Checkout</a>
                  </div>
                </div>
                <router-link to="/contact" class="nav-link nav-item">
                  <!--<i class="fas fa-fw fa-cog"></i>-->
                  <span>Contact</span>
                </router-link>
              </div>
              <div class="navbar-nav ml-auto py-0" v-if="!user">
                <router-link to="/signin" class="nav-link nav-item">
                  <span>Login</span>
                </router-link>
                <router-link to="/register" class="nav-link nav-item">
                  <span>Register</span>
                </router-link>
              </div>
              <div class="navbar-nav ml-auto py-0" v-if="user">
                <a href="javascript:void(0)" v-on:click="signOut" class="nav-link nav-item">
                  <span>Logout</span>
                </a>
              </div>
            </div>
          </nav>
          <div v-if="this.$route.name === 'home'">
            <div id="header-carousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active" style="height: 410px;">
                  <img class="img-fluid" src="img/carousel-1.jpg" alt="Image" />
                  <div
                    class="carousel-caption d-flex flex-column align-items-center justify-content-center"
                  >
                    <div class="p-3" style="max-width: 700px;">
                      <h4
                        class="text-light text-uppercase font-weight-medium mb-3"
                      >10% Off Your First Order</h4>
                      <h3 class="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                      <a href class="btn btn-light py-2 px-3">Shop Now</a>
                    </div>
                  </div>
                </div>
                <div class="carousel-item" style="height: 410px;">
                  <img class="img-fluid" src="img/carousel-2.jpg" alt="Image" />
                  <div
                    class="carousel-caption d-flex flex-column align-items-center justify-content-center"
                  >
                    <div class="p-3" style="max-width: 700px;">
                      <h4
                        class="text-light text-uppercase font-weight-medium mb-3"
                      >10% Off Your First Order</h4>
                      <h3 class="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                      <a href class="btn btn-light py-2 px-3">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                <div class="btn btn-dark" style="width: 45px; height: 45px;">
                  <span class="carousel-control-prev-icon mb-n2"></span>
                </div>
              </a>
              <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                <div class="btn btn-dark" style="width: 45px; height: 45px;">
                  <span class="carousel-control-next-icon mb-n2"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Navbar End -->
    <div v-if="!((this.$route.name) === 'home')">
      <!-- Page Header Start -->
      <div class="container-fluid bg-secondary mb-5">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
          style="min-height: 300px"
        >
          <h1 class="font-weight-semi-bold text-uppercase mb-3">{{ this.$route.name.toUpperCase() }}</h1>
        </div>
      </div>
      <!-- Page Header End -->
    </div>
  </div>
</template>

<script>
import ProductService from '../services/ProductService'
import { mapGetters } from 'vuex'
import categories from '../assets/categories.json'


export default {
  name: "NavigationVue",
  data() {
    return {
      categories: categories
    };
  },
  async created() {
    // this.products = await ProductService.getAllProduct();
    console.log(this.$route)

  },
  methods: {
    async signOut() {
      localStorage.clear();
      this.$store.dispatch('user', null)
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['user'])
  }

}
</script>

<style lang="scss" scoped>
</style>