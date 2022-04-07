<template>
  <div>
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="main-box clearfix">
            <div class="table-responsive">
              <table class="table user-list">
                <thead>
                  <tr>
                    <th>
                      <span>Product</span>
                    </th>
                    <th>
                      <span>Category</span>
                    </th>
                    <th class="text-center">
                      <span>Price</span>
                    </th>
                    <th>
                      <span>Description</span>
                    </th>
                    <th>
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody v-for="product in products" :key="product.id">
                  <tr>
                    <td>
                      <img :src="'http://localhost:8080/' + product.image" alt />
                      <a href="#" class="user-link">{{ product.name }}</a>
                      <span class="user-subhead">Product Id: {{ product.id }}</span>
                    </td>
                    <td>{{ product.category.charAt(0).toUpperCase() + product.category.slice(1) }}</td>
                    <td class="text-center">
                      <span class="label label-default">${{ product.price }}</span>
                    </td>
                    <td>
                      <span >{{ product.description }}</span>
                    </td>
                    <td style="width: 20%;">
                      <a class="table-link" v-on:click="editProduct(product)">
                        <span class="fa-stack">
                          <i class="fa fa-square fa-stack-2x"></i>
                          <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                      <a v-on:click="deleteProduct(product.id)" class="table-link danger">
                        <span class="fa-stack">
                          <i class="fa fa-square fa-stack-2x"></i>
                          <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <form name="sentMessage" id="contactForm" v-on:submit.prevent="updateProduct">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Name"
                    required="required"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="Description"
                    required="required"
                    v-model="description"
                  />
                </div>
                <div class="form-group">
                  <label for="price">Price</label>
                  <input
                    type="text"
                    class="form-control"
                    id="price"
                    placeholder="Price"
                    required="required"
                    v-model="price"
                  />
                </div>
                <div class="control-group">
                  <select
                    class="form-control"
                    id="category"
                    required="required"
                    placeholder="Category"
                    v-model="category"
                  >
                    <option disabled selected hidden value>Category</option>
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
                </div>
                <div class="control-group">
                  <input @change="selectImage" class="form-control" type="file" ref="file" multiple />
                  <img :src="'http://localhost:8080/' + image" width="120" alt />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "../../services/ProductService"
import { mapGetters } from 'vuex'


export default {
  name: "UsersComponent",
  data() {
    return {
      id: '',
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      products: [], //created empty array to fill data from an api
    }
  },
  methods: {
    selectImage() {
      const file = this.$refs.file.files[0];
      console.log(file)
      this.image = file
    },
    editProduct: function (product) {
      this.id = product.id
      this.name = product.name
      this.description = product.description,
        this.price = product.price,
        this.category = product.category,
        this.image = product.image
      $('#editProductModal').modal('show')
    },
    async updateProduct() {
      let newProduct = {
        id: this.id,
        name: this.name,
        description: this.description,
        price: this.price,
        category: this.category,
        image: this.image
      }
      await ProductService.updateProduct(newProduct.id, newProduct).then(() => {
        $('#editProductModal').modal('hide')
        this.$router.go()	// Refreshes page
      }).catch(err => {
        console.log(`Çaça ${err}`);
      })
    },
    async deleteProduct(id) {
      await ProductService.deleteProduct(id).then((response) => {
        this.$router.go()	// Refreshes page
      }).catch(err => {
        console.log(err);
      })
    }

  },
  async created() {
    this.products = await ProductService.getAllProduct();

  },
  computed: {
    ...mapGetters(['user'])
  },


}
</script>

<style scoped>
body {
  margin-top: 20px;
}

/* USER LIST TABLE */
.user-list tbody td > img {
  position: relative;
  max-width: 50px;
  float: left;
  margin-right: 15px;
}
.user-list tbody td .user-link {
  display: block;
  font-size: 1.25em;
  padding-top: 3px;
  margin-left: 60px;
}
.user-list tbody td .user-subhead {
  font-size: 0.875em;
  font-style: italic;
}

/* TABLES */
.table {
  border-collapse: separate;
}
.table-hover > tbody > tr:hover > td,
.table-hover > tbody > tr:hover > th {
  background-color: #eee;
}
.table thead > tr > th {
  border-bottom: 1px solid #c2c2c2;
  padding-bottom: 0;
}
.table tbody > tr > td {
  font-size: 0.875em;
  background: #f5f5f5;
  border-top: 10px solid #fff;
  vertical-align: middle;
  padding: 12px 8px;
}
.table tbody > tr > td:first-child,
.table thead > tr > th:first-child {
  padding-left: 20px;
}
.table thead > tr > th span {
  border-bottom: 2px solid #c2c2c2;
  display: inline-block;
  padding: 0 5px;
  padding-bottom: 5px;
  font-weight: normal;
}
.table thead > tr > th > a span {
  color: #344644;
}
.table thead > tr > th > a span:after {
  content: "\f0dc";
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  margin-left: 5px;
  font-size: 0.75em;
}
.table thead > tr > th > a.asc span:after {
  content: "\f0dd";
}
.table thead > tr > th > a.desc span:after {
  content: "\f0de";
}
.table thead > tr > th > a:hover span {
  text-decoration: none;
  color: #2bb6a3;
  border-color: #2bb6a3;
}
.table.table-hover tbody > tr > td {
  -webkit-transition: background-color 0.15s ease-in-out 0s;
  transition: background-color 0.15s ease-in-out 0s;
}
.table tbody tr td .call-type {
  display: block;
  font-size: 0.75em;
  text-align: center;
}
.table tbody tr td .first-line {
  line-height: 1.5;
  font-weight: 400;
  font-size: 1.125em;
}
.table tbody tr td .first-line span {
  font-size: 0.875em;
  color: #969696;
  font-weight: 300;
}
.table tbody tr td .second-line {
  font-size: 0.875em;
  line-height: 1.2;
}
.table a.table-link {
  margin: 0 5px;
  font-size: 1.125em;
}
.table a.table-link:hover {
  text-decoration: none;
  color: #2aa493;
}
.table a.table-link.danger {
  color: #fe635f;
}
.table a.table-link.danger:hover {
  color: #dd504c;
}

.table-products tbody > tr > td {
  background: none;
  border: none;
  border-bottom: 1px solid #ebebeb;
  -webkit-transition: background-color 0.15s ease-in-out 0s;
  transition: background-color 0.15s ease-in-out 0s;
  position: relative;
}
.table-products tbody > tr:hover > td {
  text-decoration: none;
  background-color: #f6f6f6;
}
.table-products .name {
  display: block;
  font-weight: 600;
  padding-bottom: 7px;
}
.table-products .price {
  display: block;
  text-decoration: none;
  width: 50%;
  float: left;
  font-size: 0.875em;
}
.table-products .price > i {
  color: #8dc859;
}
.table-products .warranty {
  display: block;
  text-decoration: none;
  width: 50%;
  float: left;
  font-size: 0.875em;
}
.table-products .warranty > i {
  color: #f1c40f;
}
.table tbody > tr.table-line-fb > td {
  background-color: #9daccb;
  color: #262525;
}
.table tbody > tr.table-line-twitter > td {
  background-color: #9fccff;
  color: #262525;
}
.table tbody > tr.table-line-plus > td {
  background-color: #eea59c;
  color: #262525;
}
.table-stats .status-social-icon {
  font-size: 1.9em;
  vertical-align: bottom;
}
.table-stats .table-line-fb .status-social-icon {
  color: #556484;
}
.table-stats .table-line-twitter .status-social-icon {
  color: #5885b8;
}
.table-stats .table-line-plus .status-social-icon {
  color: #a75d54;
}
</style>