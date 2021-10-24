<template>
  <div>
    <side-nav
      :toggle-state="toggleState"
    ></side-nav>

    <div class="main-section">
      <top-nav
        :toggle-state="toggleState"
        @toggle-sidenav="toggleSideNav"
      ></top-nav>
      <div class="main-section__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    TopNav: () => import("@/partials/TopNav.vue"),
    SideNav: () => import("@/partials/SideNav.vue"),
  },

  data() {
    return {
      toggleState: false,
    }
  },

  methods: {
    toggleSideNav() {
      this.toggleState = !this.toggleState;      
    }
  }
}
</script>