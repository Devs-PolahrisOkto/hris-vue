<template>
  <b-notification
    type="is-danger"
    has-icon
    :closable="false"
    role="alert"
  >
    <h6 class="has-text-weight-bold mb-2">{{ 'Upload Failed' }}</h6>
    <div
      v-for="(error, i) in errors"
      :key="i"
    >
      <h6
        class="is-size-7 is-capitalized"
      >{{ `Row ${error.row} - ${error.attribute}` }}</h6>
      <p
        v-for="(message, j) in error.errors"
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
      type: Array,
      default: () => {},
    },
  },
};
</script>
