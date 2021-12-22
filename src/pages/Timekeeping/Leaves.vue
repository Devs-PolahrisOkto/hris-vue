<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Leaves</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <h1>Leaves</h1>
  </main-layout>
</template>

<script>
export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
  },
};
</script>
