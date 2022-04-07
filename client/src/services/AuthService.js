import http from '../api/api';
export default class ProductService {
	//to get all the product from the server
	static async signUp(newUser) {
		const res = await http.post('/signup', newUser);
		return res.data;
	}
	static async signIn(user) {
		const res = await http.post('/signin', user);
		return res;
	}
	static async getUser(token) {
		const res = await http.get('/user', { headers: { token: token } });
		return res;
	}
}
