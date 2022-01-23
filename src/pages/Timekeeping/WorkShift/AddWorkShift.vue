<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li><a href="#">Work Shifts</a></li>
        <li class="is-active"><a href="#" aria-current="page">Add</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->
    <!-- Add Work Shift Form -->
    <div class="container is-fluid my-5">
      <div class="card p-2">
        add workshift
      </div>
    </div>
    <!-- Add Work Shift Form -->
  </main-layout>
</template>

<script>
export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
  },
};
</script>
