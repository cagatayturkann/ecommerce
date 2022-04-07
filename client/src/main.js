import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { store } from './vuex';

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/dashboard'];
  const authRequired = publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/signin');
  }

  next();
})

createApp(App).use(router).use(store).mount('#app');
