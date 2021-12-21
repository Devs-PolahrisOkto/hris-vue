<template>
  <main-layout>
    <div class="py-4">
      <div class="columns is-flex is-justify-content-center mt-5">
        <div class="column is-6-desktop is-8-tablet is-12-mobile p-5">
          <div
            class="card is-flex
            is-justify-content-space-between
            is-align-items-center
            is-flex-direction-column p-4"
          >
            <h5 class="is-size-5 has-text-weight-semibold">
              PAGE NOT FOUND
            </h5>
            <div class="card-content p-5">
              <not-found-illustration></not-found-illustration>
            </div>
            <b-button
              icon-left="chevron-left"
              size="is-small"
              tag="router-link"
              to="/dashboard"
            >
              Go to Dashboard
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    NotFoundIllustration: () => import('@/components/Illustrations/NotFoundIllustration.vue'),
  },
};
</script>

<style lang="scss" scoped>
.is-fullheight {
  height: 100vh;
  background-color: #fff;
}
</style>
