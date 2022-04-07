import http from '../api/api';
export default class ProductService {
	//to get all the user from the database
	static async getAllUsers() {
		const res = await http.get('/users');
		console.log(res.data);
		return res.data;
	} 
	//to update user 
	static async updateUser(id, user) {
		const res = await http.put(`/users/${id}`, user);
		return res.data;
	}
	//to delete a user
	static async deleteUser(id) {
		const res = await http.delete(`/users/${id}`);
		return res.data;
	}
}
