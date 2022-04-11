<template>
  <div>
    <!-- Topbar Start -->
    <TopBarVue></TopBarVue>
    <!-- Topbar End -->
    <!-- Navigation Start -->
    <NavigationVue></NavigationVue>
    <!-- Navigation End -->
    <!-- Shop Detail Start -->
    <div class="container-fluid py-5">
      <div class="row px-xl-5">
        <div class="col-lg-5 pb-5">
          <div id="product-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner border">
              <div class="carousel-item active">
                <img
                  class="w-100 h-100"
                  :src="'http://localhost:8080/' + product.image"
                  alt="Image"
                />
              </div>
            </div>
            <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
              <i class="fa fa-2x fa-angle-left text-dark"></i>
            </a>
            <a class="carousel-control-next" href="#product-carousel" data-slide="next">
              <i class="fa fa-2x fa-angle-right text-dark"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-7 pb-5">
          <div class="d-flex flex-column align-items-start">
            <div class="p-2">
              <h3 class="font-weight-semi-bold">{{ product.name }}</h3>
            </div>
            <div class="p-2">
              <h3 class="font-weight-semi-bold mb-4">${{ product.price }}</h3>
            </div>
            <div class="p-2">
              <p class="mb-4">{{ product.description }}</p>
            </div>
          </div>

          <div class="d-flex align-items-center mb-4 pt-2">
            <button class="btn btn-success px-3" v-on:click="addToCart()">
              <i class="fas fa-edit mr-1"></i>
              <span>Add Item</span>
            </button>
            <router-link to="/cart" class="btn btn-primary px-3">
              <i class="fas fa-edit mr-1"></i>
              <span>Go to Cart</span>
            </router-link>
            <button class="btn btn-danger px-3" v-on:click="removeItem">
              <i class="fas fa-edit mr-1"></i>
              <span>Remove Item</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Shop Detail End -->
    <!-- Footer Start -->
    <FooterVue></FooterVue>
    <!-- Footer End -->
  </div>
</template>

<script>
import ProductService from "../services/ProductService"
import TopBarVue from "../components/TopBarVue.vue"
import NavigationVue from "../components/NavigationVue.vue"
import FooterVue from "../components/FooterVue.vue"
import { mapGetters } from 'vuex'

export default {
  name: "ProductDetailView",
  components: {
    TopBarVue,
    NavigationVue,
    FooterVue,
  },
  computed: {
    ...mapGetters(['user'])
  }, data() {
    return {
      product: [],
      products: [],
    };
  },
  async created() {
    const response = await ProductService.getProduct(this.$route.params.id)
    this.product = response
  },
  methods: {
    addToCart() {
      // this.$store.commit('addToCart')
      this.$store.dispatch('addToCart', this.product)
    },
    removeItem() {
      this.$store.dispatch('removeItem', this.product)

    }
  }
}
</script>

<style lang="scss" scoped>
</style>