const routes = [
    { path: '/', name: 'Welcome', component: () => import(/* webpackChunkName: "login" */ '@/pages/Welcome/Welcome.vue') },
    { path: '*', name: 'NotFound', component: () => import(/* webpackChunkName: "login" */ '@/pages/NotFound/NotFound.vue') },
    { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "login" */ '@/pages/Auth/Login.vue') },
    { path: '/dashboard', name: 'Dashboard', component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/Dashboard/Dashboard.vue') },
];

export default routes;