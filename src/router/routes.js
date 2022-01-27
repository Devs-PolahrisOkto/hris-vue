const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "Welcome" */ '@/pages/Welcome/Welcome.vue'),
    meta: { forVisitors: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/pages/Auth/Login.vue'),
    meta: { forVisitors: true },
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound/NotFound.vue'),
    meta: { forAuth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/pages/Dashboard/Dashboard.vue'),
    meta: { forAuth: true },
  },
  {
    path: '/employees',
    name: 'AllEmployees',
    component: () => import(/* webpackChunkName: "AllEmployees" */ '@/pages/Employees/AllEmployees.vue'),
    meta: {
      forAuth: true,
      parent: 'employees',
    },
  },
  {
    path: '/employees/register',
    name: 'RegisterEmployee',
    component: () => import(/* webpackChunkName: "RegisterEmployee" */ '@/pages/Employees/RegisterEmployee.vue'),
    meta: {
      forAuth: true,
      parent: 'employees',
    },
  },
  {
    path: '/employees/import',
    name: 'ImportEmployees',
    component: () => import(/* webpackChunkName: "ImportEmployees" */ '@/pages/Employees/ImportEmployees.vue'),
    meta: {
      forAuth: true,
      parent: 'employees',
    },
  },
  {
    path: '/employees/:id',
    name: 'EmployeeProfile',
    component: () => import(/* webpackChunkName: "EmployeeProfile" */ '@/pages/Employee/Employee.vue'),
    meta: {
      forAuth: true,
      parent: 'employees',
    },
  },
  {
    path: '/timekeeping/timerecord',
    name: 'TimeRecord',
    component: () => import(/* webpackChunkName: "TimeRecord" */ '@/pages/Timekeeping/TimeRecord.vue'),
    meta: {
      forAuth: true,
      parent: 'timekeeping',
    },
  },
  {
    path: '/timekeeping/schedules',
    name: 'Schedules',
    component: () => import(/* webpackChunkName: "Schedules" */ '@/pages/Timekeeping/Schedule/Schedules.vue'),
    meta: {
      forAuth: true,
      parent: 'timekeeping',
    },
  },
  {
    path: '/timekeeping/schedules/add',
    name: 'AddSchedule',
    component: () => import(/* webpackChunkName: "AddSchedule" */ '@/pages/Timekeeping/Schedule/AddSchedule.vue'),
    meta: {
      forAuth: true,
      parent: 'timekeeping',
    },
  },
  {
    path: '/timekeeping/workshifts',
    name: 'WorkShifts',
    component: () => import(/* webpackChunkName: "WorkShifts" */ '@/pages/Timekeeping/WorkShift/WorkShifts.vue'),
    meta: {
      forAuth: true,
      parent: 'timekeeping',
    },
  },
  {
    path: '/timekeeping/workshifts/add',
    name: 'AddWorkShift',
    component: () => import(/* webpackChunkName: "AddWorkShift" */ '@/pages/Timekeeping/WorkShift/AddWorkShift.vue'),
    meta: {
      forAuth: true,
      parent: 'timekeeping',
    },
  },
  {
    path: '/timekeeping/overtime',
    name: 'Overtime',
    component: () => import(/* webpackChunkName: "Overtime" */ '@/pages/Timekeeping/Overtime/Overtime.vue'),
    meta: {
      forAuth: true,
      parent: 'timekeeping',
    },
  },
  {
    path: '/timekeeping/leaves',
    name: 'Leaves',
    component: () => import(/* webpackChunkName: "Leaves" */ '@/pages/Timekeeping/Leaves.vue'),
    meta: {
      forAuth: true,
      parent: 'timekeeping',
    },
  },
  {
    path: '/settings/companies',
    name: 'Company',
    component: () => import(/* webpackChunkName: "EmployeeProfile" */ '@/pages/Settings/Company.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/employment-types',
    name: 'EmploymentType',
    component: () => import(/* webpackChunkName: "EmploymentType" */ '@/pages/Settings/EmploymentType.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/positions',
    name: 'Position',
    component: () => import(/* webpackChunkName: "Position" */ '@/pages/Settings/Position.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/departments',
    name: 'Department',
    component: () => import(/* webpackChunkName: "Department" */ '@/pages/Settings/Department.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/address-types',
    name: 'AddressType',
    component: () => import(/* webpackChunkName: "AddressType" */ '@/pages/Settings/AddressType.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/document-types',
    name: 'DocumentType',
    component: () => import(/* webpackChunkName: "DocumentType" */ '@/pages/Settings/DocumentType.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/banks',
    name: 'Bank',
    component: () => import(/* webpackChunkName: "Bank" */ '@/pages/Settings/Bank.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/civil-statuses',
    name: 'CivilStatus',
    component: () => import(/* webpackChunkName: "CivilStatus" */ '@/pages/Settings/CivilStatus.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
  {
    path: '/settings/genders',
    name: 'Gender',
    component: () => import(/* webpackChunkName: "Gender" */ '@/pages/Settings/Gender.vue'),
    meta: {
      forAuth: true,
      parent: 'settings',
    },
  },
];

export default routes;
