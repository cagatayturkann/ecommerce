import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import EditProductView from '../views/EditProductView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import SearchResultView from '../views/SearchResultView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import AdminDashboard from '../views/adminPanel/AdminDashboard.vue';
import User from '../views/adminPanel/User.vue';
import Home from '../views/adminPanel/Home.vue';
import Product from '../views/adminPanel/Product.vue';
import AddProduct from '../views/adminPanel/AddProduct.vue';
import AuthService from '../services/AuthService';
import CartView from '../views/CartView.vue'

import NavBar from '../components/dashboard/NavBar.vue';
import LogOut from '../components/dashboard/SideBar.vue';
import SideBar from '../components/dashboard/NavBar.vue';
import { store } from '../vuex';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'about',
		component: AboutView,
	},
	{
		path: '/contact',
		name: 'contact',
		component: ContactView,
	},
	{
		path: '/products',
		name: 'products',
		component: ProductView,
	},
	{
		path: '/products/:id',
		name: 'productDetail',
		component: ProductDetailView,
	},
	{
		path: '/results',
		name: 'results',
		props: true,
		component: SearchResultView,
	},
	{
		path: '/cart',
		name: 'cart',
		props: true,
		component: CartView,
	},
	{
		path: '/register',
		name: 'register',
		component: RegisterView,
		beforeEnter: async (to, from, next) => {
			const loggedIn = localStorage.getItem('token');
			if (loggedIn) {
				return next('/dashboard');
			}
			next();
		},
	},
	{
		path: '/signin',
		name: 'signin',
		component: LoginView,
		beforeEnter: async (to, from, next) => {
			const loggedIn = localStorage.getItem('token');
			if (loggedIn) {
				return next('/dashboard');
			}
			next();
		},
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: AdminDashboard,
		children: [
			{
				path: '',
				component: Home,
			},
			{
				path: 'users',
				component: User,
			},
			{
				path: 'products',
				component: Product,
			},
			{
				path: 'addproduct',
				component: AddProduct,
			},
		],
		meta: {
			requiresAuth: true,
		},
		beforeEnter: async (to, from, next) => {
			let token = '';
			token = localStorage.getItem('token');
			await AuthService.getUser(token).then((response) => {
				store.dispatch('user', response.data.user);
			});
			const userRole = store.getters.user.role
			if (userRole === 'admin') {
				next()
			} else {
				next('/')
			}
			console.log(`router ${store.getters.user.role}`);

			next();
		},
	},
	{
		path: '/profile',
		name: 'Profile',
		component: DashboardView,
	},
];

// console.log(`router ${JSON.stringify(store)}`)

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
export default router;
