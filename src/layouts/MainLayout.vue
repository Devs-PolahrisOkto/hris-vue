<template>
  <div>
    <side-nav></side-nav>
    <div class="main-section">
      <top-nav></top-nav>
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
}
</script>