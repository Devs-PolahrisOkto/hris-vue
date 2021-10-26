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
  { 
    path: '/employees/:id', 
    name: 'EmployeeProfile', 
    component: () => import(/* webpackChunkName: "EmployeeProfile" */ '@/pages/Employee/Employee.vue'),
    meta: { forAuth: true }
  },
  { 
    path: '/companies', 
    name: 'Company', 
    component: () => import(/* webpackChunkName: "EmployeeProfile" */ '@/pages/Settings/Company.vue'),
    meta: { forAuth: true }
  },
  { 
    path: '/employment-types', 
    name: 'EmploymentType', 
    component: () => import(/* webpackChunkName: "EmploymentType" */ '@/pages/Settings/EmploymentType.vue'),
    meta: { forAuth: true }
  },
  { 
    path: '/positions', 
    name: 'Position', 
    component: () => import(/* webpackChunkName: "Position" */ '@/pages/Settings/Position.vue'),
    meta: { forAuth: true }
  },
  { 
    path: '/departments', 
    name: 'Department', 
    component: () => import(/* webpackChunkName: "Department" */ '@/pages/Settings/Department.vue'),
    meta: { forAuth: true }
  },
  { 
    path: '/address-types', 
    name: 'AddressType', 
    component: () => import(/* webpackChunkName: "AddressType" */ '@/pages/Settings/AddressType.vue'),
    meta: { forAuth: true }
  },
  { 
    path: '/document-types', 
    name: 'DocumentType', 
    component: () => import(/* webpackChunkName: "DocumentType" */ '@/pages/Settings/DocumentType.vue'),
    meta: { forAuth: true }
  },
  { 
    path: '/banks', 
    name: 'Bank', 
    component: () => import(/* webpackChunkName: "Bank" */ '@/pages/Settings/Bank.vue'),
    meta: { forAuth: true }
  },
];

export default routes;