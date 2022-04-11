<template>
  <div>
    <!-- Topbar Start -->
    <div class="container-fluid">
      <div class="row bg-secondary py-2 px-xl-5">
        <!-- <div class="col-lg-6 d-none d-lg-block">
          <div class="d-inline-flex align-items-center">
            <a class="text-dark" href>FAQs</a>
            <span class="text-muted px-2">|</span>
            <a class="text-dark" href>Help</a>
            <span class="text-muted px-2">|</span>
            <a class="text-dark" href>Support</a>
          </div>
        </div>-->
        <div class="col-lg-12 text-center">
          <div class="d-inline-flex align-items-center">
            <a class="text-dark" href="https://linkedin.com/in/cagatayturkann" target="_blank">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a class="text-dark pl-2" href="https://github.com/cagatayturkann" target="_blank">
              <i class="fab fa-github"></i>
            </a>
            <a class="text-dark px-2" href="https://instagram.com/cagatayturkann" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="row align-items-center py-3 px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
          <a href class="text-decoration-none">
            <h1 class="m-0 display-5 font-weight-semi-bold">
              <span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
            </h1>
          </a>
        </div>
        <div class="col-lg-6 col-6 text-left">
          <form v-on:submit.prevent="searchProduct">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search for products"
                v-model="search"
              />
              <div class="input-group-append">
                <span class="input-group-text bg-transparent text-primary">
                  <i class="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-3 col-6 text-right">
          <!-- <a href class="btn border">
            <i class="fas fa-heart text-primary"></i>
            <span class="badge">0</span>
          </a>-->
          <router-link to="/cart" class="btn border">
            <i class="fas fa-shopping-cart text-primary"></i>
            <span class="badge">{{ count }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Topbar End -->
  </div>
</template>

<script>
import ProductService from "../services/ProductService"

export default {
  name: "TopBarVue",
  data() {
    return {
      search: '',
    }
  },
  methods: {
    searchProduct() {
      // console.log(this.search);
      this.$router.push({ path: '/results', query: { search: this.search } });
    }
  },
  computed: {
    count() {
      return this.$store.state.cartItemCount
    }
  }
}

</script>

<style lang="scss" scoped>
</style>