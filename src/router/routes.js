const routes = [
    { path: '/', name: 'Welcome', component: () => import(/* webpackChunkName: "Welcome" */ '@/pages/Welcome/Welcome.vue') },
    { path: '*', name: 'NotFound', component: () => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound/NotFound.vue') },
    { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "Login" */ '@/pages/Auth/Login.vue') },
    { path: '/dashboard', name: 'Dashboard', component: () => import(/* webpackChunkName: "Dashboard" */ '@/pages/Dashboard/Dashboard.vue') },

    { path: '/employees', name: 'AllEmployees', component: () => import(/* webpackChunkName: "AllEmployees" */ '@/pages/Employees/AllEmployees.vue') },
    { path: '/employees/register', name: 'RegisterEmployee', component: () => import(/* webpackChunkName: "RegisterEmployee" */ '@/pages/Employees/RegisterEmployee.vue') },
    { path: '/employees/import', name: 'ImportEmployees', component: () => import(/* webpackChunkName: "ImportEmployees" */ '@/pages/Employees/ImportEmployees.vue') },
];

export default routes;