<template>
    <!-- Contact Start -->
  <div class="container-fluid pt-5">
    <div class="text-center mb-4">
      <h2 class="section-title px-5">
        <span class="px-2">Add Product</span>
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
              v-on:submit.prevent="addProduct"
              enctype="multipart/form-data"
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
                <p class="help-block text-danger"></p>
              </div>
              <div>
                <button
                  class="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
                >Add Product</button>
              </div>
            </form>
          </div>
        </div>
        <div v-else>
          <div>
            <h4>Product added successfully!</h4>
            <button
              class="btn btn-primary py-2 px-4"
              type="submit"
              id="sendMessageButton"
              @click="newProduct"
            >Add Product</button>
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
import ProductService from "../../services/ProductService"
import { mapGetters } from 'vuex'


export default {
  name: 'AddProduct',
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
      image: '',
    }
  },
  methods: {
    selectImage() {
      const file = this.$refs.file.files[0];
      this.image = file
    },
    async addProduct() {
      // let data = {
      //   name: this.product.name,
      //   description: this.product.description,
      //   price: this.product.price,
      //   category: this.product.category,
      //   image: this.image
      // };
      //   await ProductService.addProduct(data).then(()=>{
      //     this.submitted = true
      //   }).catch(err=>{
      //     console.log(err);
      //   })
      //   console.log(data);
      const formData = new FormData();
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('price', this.product.price)
      formData.append('category', this.product.category)
      formData.append('image', this.image)
      await ProductService.addProduct(formData).then(() => {
        this.submitted = true
      }).catch(err => {
        console.log(err);
      })
      console.log(formData);
    },
    newProduct() {
      this.submitted = false;
      this.product = {}
    }
  }
}
</script>
