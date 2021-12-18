import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
});

// Route Guard
router.beforeEach((to, from, next) => {
  if (to.meta.forAuth) {
    const authToken = window.localStorage.getItem('authToken');
    const authUser = JSON.parse(window.localStorage.getItem('authUser'));
    if (authToken && authUser) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (to.meta.forVisitors) {
    const authToken = window.localStorage.getItem('authToken');
    const authUser = JSON.parse(window.localStorage.getItem('authUser'));
    if (!authToken || !authUser) {
      next();
    } else {
      next({ name: 'Dashboard' });
    }
  } else {
    next();
  }
});

export default router;
