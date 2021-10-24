<template>
  <header 
    class="topbar" 
    id="header"
  >
    <div class="topbar__toggle" @click="toggleSideNav">
      <i id="topbar-toggle" class="mdi mdi-menu-open" v-show="!toggleState"></i>
      <i id="topbar-toggle" class="mdi mdi-backburger" v-show="toggleState"></i>
    </div>
    <div class="topbar__menu"></div>
  </header>
</template>

<script>
export default {
  props: {
    toggleState: {
      type: Boolean
    }
  },

  methods: {
    toggleSideNav() {
      this.$emit('toggle-sidenav');
    },
  }
}
</script>