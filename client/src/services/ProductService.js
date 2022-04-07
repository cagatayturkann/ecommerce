import http from '../api/api';
export default class ProductService {
	//to get all the product from the server
	static async getAllProduct() {
		const res = await http.get('/products');
		console.log(res.data);
		return res.data;
	} //to get single product by id
	static async getProduct(id) {
		const res = await http.get(`/products/${id}`);
		return res.data;
		// console.log(res.data)
	}
	//to insert product into database
	static async addProduct(product) {
		const res = await http.post('/products', product);
		console.log(res);
		return res.data;
	}
	//to update product into database
	static async updateProduct(id, product) {
		const res = await http.put(`/products/${id}`, product);
		return res.data;
	}
	//to delete a product
	static async deleteProduct(id) {
		const res = await http.delete(`/products/${id}`);
		return res.data;
	}
	//to delete all product
	static async deleteAllProduct() {
		const res = await http.delete(`/products`);
		return res.data;
	}
	static async findProdutFromElastic(search) {
		return await http.get(`/products/search?product=${search}`);
	}
}
