<template>
  <div class="sidebar" :class="{'mini': (toggleState || isMobile) }">
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
      <li>
        <div class="icon-link">
          <a>
            <i class="mdi mdi-calendar-clock link_icon"></i>
            <span class="link_name">Timekeeping</span>
          </a>
          <i class="mdi mdi-chevron-down arrow" @click="toggleDropdown"></i>
        </div>
        <ul class="sub-menu">
            <li><router-link to="/" class="link_name">Timekeeping</router-link></li>
            <li><router-link to="/">Time In/Out</router-link></li>
            <li><router-link to="/">Schedules</router-link></li>
            <li><router-link to="/">Leaves</router-link></li>
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
          <li><router-link to="/settings/departments">Departments</router-link></li>
          <li><router-link to="/settings/positions">Positions</router-link></li>
          <li><router-link to="/settings/employment-types">Employment Types</router-link></li>
          <li><router-link to="/settings/address-types">Address Types</router-link></li>
          <li><router-link to="/settings/document-types">Document Types</router-link></li>
          <li><router-link to="/settings/banks">Banks</router-link></li>
          <li><router-link to="/settings/civil-statuses">Civil Status</router-link></li>
        </ul>
      </li>
      <li>
        <div class="profile-details">
          <div class="profile-content">
            <img class="is-rounded" src="https://bulma.io/images/placeholders/24x24.png" alt="Profile">
          </div>
          <div class="name-job">
            <div class="profile_name">John Doe</div>
            <div class="job">Web Developer</div>
          </div>
          <i class="mdi mdi-logout log-out"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Breakpoints from '@/mixins/breakpoints';

export default {
  components: {
    SalaryIcon: () => import("@/components/Icons/SalaryIcon.vue"),
  },

  mixins: [ Breakpoints ],

  props: {
    toggleState: {
      type: Boolean
    }
  },

  methods: {
    toggleDropdown(e) {
      let arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle("showMenu");
    },
    isDropdownActive(parent) {
      return this.$router.currentRoute.meta.parent === parent;
    }
  },
}
</script>