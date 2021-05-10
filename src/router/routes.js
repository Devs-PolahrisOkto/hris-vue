const routes = [
    { path: '/', name: 'Welcome', component: () => import(/* webpackChunkName: "Welcome" */ '@/pages/Welcome/Welcome.vue') },
    { path: '*', name: 'NotFound', component: () => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound/NotFound.vue') },
    { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "Login" */ '@/pages/Auth/Login.vue') },
    { path: '/dashboard', name: 'Dashboard', component: () => import(/* webpackChunkName: "Dashboard" */ '@/pages/Dashboard/Dashboard.vue') },
];

export default routes;