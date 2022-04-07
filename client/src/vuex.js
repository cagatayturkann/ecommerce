import { createStore } from 'vuex';

export const store = createStore({
	state() {
		return {
			user: null,
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
	}, //a way to change mutation
	mutations: {
		user(state, user) {
			state.user = user;
		},
	}, // this mutation will change the state
});

// const state = {
// 	user: null,
// };

// const store = new Vuex.Store({
// 	state,
// 	getters: {
// 		user: (state) => {
// 			return state.user;
// 		},
// 	}, //this getter will get the state.user
// 	actions: {
// 		user(context, user) {
// 			context.commit('user', user);
// 		},
// 	}, //a way to change mutation
// 	mutations: {
// 		user(state, user) {
// 			state.user = user;
// 		},
// 	}, // this mutation will change the state
// });

