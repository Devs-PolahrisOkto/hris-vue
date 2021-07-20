const routes = [
    { 
        path: '/', 
        name: 'Welcome', 
        component: () => import(/* webpackChunkName: "Welcome" */ '@/pages/Welcome/Welcome.vue'),
        meta: { forVisitors: true }
    },
    { 
        path: '/login', 
        name: 'Login', 
        component: () => import(/* webpackChunkName: "Login" */ '@/pages/Auth/Login.vue'),
        meta: { forVisitors: true }
    },
    { 
        path: '*', 
        name: 'NotFound', 
        component: () => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound/NotFound.vue'),
        meta: { forAuth: true }
    },
    { 
        path: '/dashboard', 
        name: 'Dashboard', 
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/pages/Dashboard/Dashboard.vue'),
        meta: { forAuth: true }
    },
    { 
        path: '/employees', 
        name: 'AllEmployees', 
        component: () => import(/* webpackChunkName: "AllEmployees" */ '@/pages/Employees/AllEmployees.vue'),
        meta: { forAuth: true }
    },
    { 
        path: '/employees/register', 
        name: 'RegisterEmployee', 
        component: () => import(/* webpackChunkName: "RegisterEmployee" */ '@/pages/Employees/RegisterEmployee.vue'),
        meta: { forAuth: true }
    },
    { 
        path: '/employees/import', 
        name: 'ImportEmployees', 
        component: () => import(/* webpackChunkName: "ImportEmployees" */ '@/pages/Employees/ImportEmployees.vue'),
        meta: { forAuth: true }
    },
];

export default routes;