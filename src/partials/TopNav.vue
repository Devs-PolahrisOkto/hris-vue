<template>
  <header 
    class="topbar" 
    id="header"
  >
    <div class="topbar__toggle" @click="toggleSidebarMini">
      <i id="topbar-toggle" class="mdi mdi-menu-open" v-show="!sidebarMiniState"></i>
      <i id="topbar-toggle" class="mdi mdi-backburger" v-show="sidebarMiniState"></i>
    </div>
    <div class="topbar__menu"></div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      sidebarMiniState: 'navigation/sidebarMiniState',
    }),
  },

  methods: {
    ...mapActions({
      toggleSidebarMini: 'navigation/toggleSidebarMini',
    }),
  }
}
</script>