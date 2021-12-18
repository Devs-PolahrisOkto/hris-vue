<template>
  <div class="is-fullheight py-4">
    <div class="columns is-flex is-justify-content-center mt-5">
      <div class="column is-6-desktop is-8-tablet is-12-mobile p-5">
        <div class="card">
          <header class="card-header is-flex is-justify-content-space-between p-4">
            <h5 class="is-size-5 has-text-weight-semibold">
              <b-icon icon="alert"></b-icon> Page not found
            </h5>
            <b-button
              icon-left="chevron-left"
              size="is-small"
              @click="$router.go(-1)"
            >
              Go back
            </b-button>
          </header>
          <div class="card-content">
            <img
              src="./../../assets/not_found.svg"
              alt="not_found"
              class="p-4"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.is-fullheight {
  height: 100vh;
  background-color: #fff;
}
</style>
