import { createStore } from 'vuex';

let cartItems = window.localStorage.getItem('cartItems');
let cartItemCount = window.localStorage.getItem('cartItemCount');
export const store = createStore({
	state() {
		return {
			user: null,
			cartItems: cartItems ? JSON.parse(cartItems) : [],
			cartItemCount: cartItemCount ? parseInt(cartItemCount) : 0,
		};
	},
	getters: {
		user: (state) => {
			return state.user;
		},
	}, //this getter will get the state.user
	actions: {
		user(context, user) {
			context.commit('user', user);
		},
		addToCart: (context, payload) => {
			context.commit('addToCart', payload);
			context.commit('saveCart');
		},
		removeItem: (context, payload) => {
			context.commit('removeItem', payload);
			context.commit('saveCart');
		},
	}, //a way to change mutation
	mutations: {
		user(state, user) {
			state.user = user;
		},
		addToCart(state, payload) {
			let item = payload;
			item = { ...item, quantity: 1 };
			if (state.cartItems.length > 0) {
				let bool = state.cartItems.some((i) => i.id == item.id);
				if (bool) {
					let itemIndex = state.cartItems.findIndex((el) => el.id === item.id);
					state.cartItems[itemIndex]['quantity'] += 1;
				} else {
					state.cartItems.push(item);
				}
			} else {
				state.cartItems.push(item);
			}
			state.cartItemCount++;
		},
		removeItem(state, payload) {
			if (state.cartItems.length > 0) {
				let bool = state.cartItems.some((i) => i.id === payload.id);
				if (bool) {
					let index = state.cartItems.findIndex((el) => el.id === payload.id);
					if (state.cartItems[index]['quantity'] !== 0) {
						state.cartItems[index]['quantity'] -= 1;
						state.cartItemCount--;
					}
					if (state.cartItems[index]['quantity'] === 0) {
						state.cartItems.splice(index, 1);
					}
				}
			}
		},
		saveCart(state) {
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
			localStorage.setItem('cartItemCount', state.cartItemCount);
		},
	}, // this mutation will change the state
});
