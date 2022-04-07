<template>
  <!-- Topbar Start -->
  <TopBarVue></TopBarVue>
  <!-- Topbar End -->
  <!-- Navigation Start -->
  <NavigationVue></NavigationVue>
  <!-- Navigation End -->

  <!-- Contact Start -->
  <div class="container-fluid pt-5">
    <div class="text-center mb-4">
      <h2 class="section-title px-5">
        <span class="px-2">Update Product</span>
      </h2>
    </div>
    <div class="row px-xl-5">
      <div class="col-lg-8 offset-lg-2 mb-5">
        <div v-if="!submitted">
          <div class="contact-form">
            <div id="success"></div>
            <form
              id="contactForm"
              novalidate="novalidate"
              method="POST"
              v-on:submit.prevent="updateProduct"
            >
              <div class="control-group">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Product Name"
                  required="required"
                  data-validation-required-message="Please enter product name"
                  v-model="product.name"
                />
                <p class="help-block text-danger"></p>
              </div>
              <div class="control-group">
                <textarea
                  class="form-control"
                  rows="6"
                  id="description"
                  placeholder="Product Description"
                  required="required"
                  data-validation-required-message="Please enter product description"
                  v-model="product.description"
                ></textarea>
                <p class="help-block text-danger"></p>
              </div>
              <div class="control-group">
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  min="0"
                  placeholder="Product Price"
                  required="required"
                  data-validation-required-message="Please enter a price"
                  v-model="product.price"
                />
                <p class="help-block text-danger"></p>
              </div>
              <div class="control-group">
                <select
                  class="form-control"
                  id="category"
                  required="required"
                  data-validation-required-message="Please select a category"
                  v-model="product.category"
                >
                  <option disabled selected hidden value>Product Category</option>
                  <option value="shoe">Shoe</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="computer">Computer</option>
                  <option value="book">Book</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="mobile">Mobile</option>
                  <option value="car">Car</option>
                  <option value="television">Television</option>
                  <option value="movie">Movie</option>
                  <option value="game">Game</option>
                </select>
                <p class="help-block text-danger"></p>
              </div>
              <div class="control-group">
                <input @change="selectImage" class="form-control" type="file" ref="file" multiple />
                <img :src="'http://localhost:8080/' + product.image" width="120" alt />
                <p class="help-block text-danger"></p>
              </div>
              <div>
                <button
                  class="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
                >Update Product</button>
              </div>
            </form>
          </div>
        </div>
        <div v-else>
          <div>
            <h4>Product updated successfully!</h4>
            <button
              class="btn btn-primary py-2 px-4"
              type="submit"
              id="sendMessageButton"
            >Update Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Contact End -->

  <!-- Footer Start -->
  <FooterVue></FooterVue>
  <!-- Footer End -->
</template>

<script>
// @ is an alias to /src
import ProductService from "../services/ProductService"
import TopBarVue from "../components/TopBarVue.vue"
import NavigationVue from "../components/NavigationVue.vue"
import FooterVue from "../components/FooterVue.vue"
import { mapGetters } from 'vuex'

export default {
  name: 'EditProductView',
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
      product: {
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
      },
      submitted: false,
      image: ''
    }
  },
  methods: {
    selectImage() {
      const file = this.$refs.file.files[0];
      console.log(file)

      this.image = file
    },
    async updateProduct() {
      // let data = {
      //   name: this.product.name,
      //   description: this.product.description,
      //   price: this.product.price,
      //   category: this.product.category
      // };
      // await ProductService.updateProduct(this.$route.params.id, data).then(() => {
      //   this.$router.push({ name: 'home' })
      // }).catch(err => {
      //   console.log(err);
      // })
      // console.log(data);
      const formData = new FormData();
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('price', this.product.price)
      formData.append('category', this.product.category)
      formData.append('image', this.image)
      formData.append('oldImage', this.product.image)
      await ProductService.updateProduct(this.$route.params.id, formData).then(() => {
        this.submitted = true
      }).catch(err => {
        console.log(err);
      })
      console.log(formData);
    },
  },
  async created() {
    const response = await ProductService.getProduct(this.$route.params.id)
    this.product = response
  }
}
</script>
