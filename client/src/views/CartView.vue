<template>
  <div>
    <!-- Topbar Start -->
    <TopBarVue></TopBarVue>
    <!-- Topbar End -->
    <!-- Navigation Start -->
    <NavigationVue></NavigationVue>
    <!-- Navigation End -->
    <!-- Cart Start -->
    <div class="container-fluid pt-5">
      <div class="row px-xl-5" v-if="totalPrice !== 0">
        <div class="col-lg-8 table-responsive mb-5">
          <table class="table table-bordered text-center mb-0">
            <thead class="bg-secondary text-dark">
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <!-- <th>Remove</th> -->
              </tr>
            </thead>
            <tbody class="align-middle" v-for="item in cartItems">
              <tr>
                <td class="align-middle">
                  <img :src="'http://localhost:8080/' + item.image" alt style="width: 50px;" />
                  {{ item.name }}
                </td>
                <td class="align-middle">${{ item.price }}</td>
                <td class="align-middle">
                  <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                      <button
                        class="btn btn-sm btn-primary btn-minus"
                        v-on:click="removeItem(item)"
                      >
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <span
                      class="text-center bg-secondary form-control form-control-sm"
                    >{{ item.quantity }}</span>
                    <!-- <input
                      type="text"
                      class="form-control form-control-sm bg-secondary text-center"
                      value="1"
                    />-->
                    <div class="input-group-btn">
                      <button class="btn btn-sm btn-primary btn-plus" v-on:click="addItem(item)">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="align-middle">${{ item.price * item.quantity }}</td>
                <!-- <td class="align-middle">
                  <button class="btn btn-sm btn-primary">
                    <i class="fa fa-times"></i>
                  </button>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-4">
          <div class="card border-secondary mb-5">
            <div class="card-header bg-secondary border-0">
              <h4 class="font-weight-semi-bold m-0">Cart Summary</h4>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-3 pt-1">
                <h6 class="font-weight-medium">Subtotal</h6>
                <h6 class="font-weight-medium">${{ totalPrice }}</h6>
              </div>
              <div class="d-flex justify-content-between">
                <h6 class="font-weight-medium">Shipping</h6>
                <h6 class="font-weight-medium">$10</h6>
              </div>
            </div>
            <div class="card-footer border-secondary bg-transparent">
              <div class="d-flex justify-content-between mt-2">
                <h5 class="font-weight-bold">Total</h5>
                <h5 class="font-weight-bold">${{ totalPrice + 10 }}</h5>
              </div>
              <router-link to="/checkout" class="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
                  <div class="col-sm-12 empty-cart-cls text-center">
                    <img
                      src="https://i.imgur.com/dCdflKN.png"
                      width="130"
                      height="130"
                      class="img-fluid mb-4 mr-3"
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <router-link to="/products" class="btn btn-primary cart-btn-transform m-3">Continue Shopping</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <!-- Cart End -->
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
  methods: {
    addItem(item) {
      this.$store.dispatch('addToCart', item)
    },
    removeItem(item) {
      this.$store.dispatch('removeItem', item)
    }
  }
}
</script>

<style scoped>
.mt-100 {
  margin-top: 100px;
}

.card {
  margin-bottom: 30px;
  border: 0;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 8px;
  -webkit-box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
  box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
}

.card .card-header {
  background-color: #fff;
  border-bottom: none;
  padding: 24px;
  border-bottom: 1px solid #f6f7fb;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card .card-body {
  padding: 30px;
  background-color: transparent;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  background-color: #4466f2 !important;
  border-color: #4466f2 !important;
}
</style>