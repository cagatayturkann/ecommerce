import axios from 'axios';
// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });
const url = '/api/products';

export default class API {
	//to get all the product from the server
	static async getAllProduct() {
		const res = await axios.get(url);
		return res.data;
	}
	//to get single product by id
	static async getProduct(id) {
		const res = await axios.get(`${url}/${id}`);
		return res.data;
	}
	//to insert product into database
	static async addProduct(product) {
		const res = await axios.post(url, post);
		return res.data;
	}
	//to update product into database
	static async updateProduct(id, post) {
		const res = await axios.patch(`${url}/${id}`, product);
		return res.data;
	}
	//to delete a product
	static async deleteProduct(id) {
		const res = await axios.delete(`${url}/${id}`);
		return res.data;
	}
  //to delete a product
	static async deleteAllProduct() {
		const res = await axios.delete(`${url}`);
		return res.data;
	}  
}
