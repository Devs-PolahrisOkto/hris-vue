<template>
  <div class="sidebar" :class="{'mini': (sidebarMiniState || isMobile), 'close': sidebarState }">
    <div class="logo-details">
      <salary-icon class="logo_icon"></salary-icon>
      <span class="logo_name">POLAHRIS</span>
    </div>
    <ul class="nav-links">
      <li>
        <router-link to="/dashboard">
          <i class="mdi mdi-chart-bar link_icon"></i>
          <span class="link_name">Dashboard</span>
        </router-link>
        <ul class="sub-menu blank">
          <li><router-link to="/dashboard" class="link_name">Dashboard</router-link></li>
        </ul>
      </li>
      <li :class="{'showMenu': isDropdownActive('employees')}">
        <div class="icon-link">
          <a>
            <i class="mdi mdi-account-group link_icon"></i>
            <span class="link_name">Employee</span>
          </a>
          <i class="mdi mdi-chevron-down arrow" @click="toggleDropdown"></i>
        </div>
        <ul class="sub-menu">
          <li><router-link to="/employees" class="link_name">Employee</router-link></li>
          <li><router-link to="/employees">All Employees</router-link></li>
          <li><router-link to="/employees/register">Register Employees</router-link></li>
          <li><router-link to="/employees/import">Import Employees</router-link></li>
        </ul>
      </li>
      <li :class="{'showMenu': isDropdownActive('timekeeping')}">
        <div class="icon-link">
          <a>
            <i class="mdi mdi-calendar-clock link_icon"></i>
            <span class="link_name">Timekeeping</span>
          </a>
          <i class="mdi mdi-chevron-down arrow" @click="toggleDropdown"></i>
        </div>
        <ul class="sub-menu">
            <li>
              <router-link to="/timekeeping/timerecord" class="link_name">Timekeeping</router-link>
            </li>
            <li><router-link to="/timekeeping/timerecord">Time In/Out</router-link></li>
            <li><router-link to="/timekeeping/schedules">Schedules</router-link></li>
            <li><router-link to="/timekeeping/workshifts">Work Shifts</router-link></li>
            <li><router-link to="/timekeeping/overtime">Overtime</router-link></li>
            <li><router-link to="/timekeeping/leaves">Leaves</router-link></li>
        </ul>
      </li>
      <li>
        <div class="icon-link">
          <a>
            <i class="mdi mdi-cash-multiple link_icon"></i>
            <span class="link_name">Payroll</span>
          </a>
          <i class="mdi mdi-chevron-down arrow" @click="toggleDropdown"></i>
        </div>
        <ul class="sub-menu">
          <li><router-link to="/" class="link_name">Payroll</router-link></li>
          <li><router-link to="/">Payroll Summary</router-link></li>
          <li><router-link to="/">Compensations</router-link></li>
          <li><router-link to="/">Deductions</router-link></li>
          <li><router-link to="/">Loans</router-link></li>
        </ul>
      </li>
      <li :class="{'showMenu': isDropdownActive('settings')}">
        <div class="icon-link">
          <a>
            <i class="mdi mdi-cog link_icon"></i>
            <span class="link_name">Settings</span>
          </a>
          <i class="mdi mdi-chevron-down arrow" @click="toggleDropdown"></i>
        </div>
        <ul class="sub-menu">
          <li><router-link to="/settings/companies" class="link_name">Settings</router-link></li>
          <li><router-link to="/settings/companies">Company</router-link></li>
          <li><router-link to="/settings/branches">Branches</router-link></li>
          <li><router-link to="/settings/departments">Departments</router-link></li>
          <li><router-link to="/settings/positions">Positions</router-link></li>
          <li><router-link to="/settings/employment-types">Employment Types</router-link></li>
          <li><router-link to="/settings/address-types">Address Types</router-link></li>
          <li><router-link to="/settings/document-types">Document Types</router-link></li>
          <li><router-link to="/settings/banks">Banks</router-link></li>
          <li><router-link to="/settings/civil-statuses">Civil Status</router-link></li>
          <li><router-link to="/settings/genders">Gender</router-link></li>
        </ul>
      </li>
      <li>
        <div class="profile-details" @click="toggleSidebarMini">
          <div class="profile-content">
            <img class="is-rounded" :src="authUserAvatar" alt="Profile">
          </div>
          <div class="name-job">
            <div class="profile_name">{{ authUserName }}</div>
          </div>
          <a class="collapse"><i class="mdi mdi-chevron-double-left"></i></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breakpoints from '@/mixins/breakpoints';

export default {
  components: {
    SalaryIcon: () => import('@/components/Icons/SalaryIcon.vue'),
  },

  mixins: [ Breakpoints ],

  computed: {
    ...mapGetters({
      authUserObj: 'authentication/authUserObj',
      authUserName: 'authentication/authUserName',
      authUserAvatar: 'authentication/authUserAvatar',
      authUserEmail: 'authentication/authUserEmail',
      sidebarState: 'navigation/sidebarState',
      sidebarMiniState: 'navigation/sidebarMiniState',
    }),
  },

  methods: {
    ...mapActions({
      logout: 'authentication/logout',
      toggleSidebarMini: 'navigation/toggleSidebarMini',
    }),
    toggleDropdown (e) {
      const arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle('showMenu');
    },
    isDropdownActive (parent) {
      return this.$router.currentRoute.meta.parent === parent;
    },
    async handleLogout () {
      await this.logout();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
