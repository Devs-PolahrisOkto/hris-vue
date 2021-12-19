<template>
  <header
    id="header"
    class="topbar"
  >
    <div class="topbar__toggle" @click="toggleSidebar">
      <i id="topbar-toggle" class="mdi mdi-menu"></i>
    </div>
    <div class="topbar__menu">
      <div class="dropdown is-right is-hoverable">
        <div class="dropdown-trigger">
          <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>{{ authUserEmail }}</span>
            <span class="icon is-small">
              <i class="mdi mdi-chevron-down"></i>
            </span>
          </button>
        </div>
        <div id="dropdown-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a class="dropdown-item">
              <i class="mdi mdi-account-circle pr-2"></i>
              Account Profile
            </a>
            <hr class="dropdown-divider">
            <a class="dropdown-item" @click="handleLogout">
              <i class="mdi mdi-logout pr-2"></i>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      sidebarMiniState: 'navigation/sidebarMiniState',
      authUserEmail: 'authentication/authUserEmail',
    }),
  },

  methods: {
    ...mapActions({
      toggleSidebar: 'navigation/toggleSidebar',
      toggleSidebarMini: 'navigation/toggleSidebarMini',
      logout: 'authentication/logout',
    }),
    async handleLogout () {
      await this.logout();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
