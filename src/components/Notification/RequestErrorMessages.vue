<template>
  <b-notification
    type="is-danger"
    has-icon
    :closable="false"
    role="alert"
  >
    <h6 class="has-text-weight-bold mb-2">{{ errors.message }}</h6>
    <div
      v-for="([ key, value ], i) in Object.entries(errors.errors)"
      :key="i"
    >
      <h6 class="is-size-7 is-capitalized">{{ key }}</h6>
      <p
        v-for="(message, j) in value"
        :key="j"
        class="is-size-7"
      >* {{ message }}</p>
    </div>
  </b-notification>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
