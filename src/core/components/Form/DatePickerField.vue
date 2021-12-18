<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="label"
    :rules="rules"
    :mode="mode"
  >
    <b-field
      :label="label"
      :label-position="labelPosition"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
    >
      <b-datepicker
        :value="value"
        @input="$emit('input', $event)"
      ></b-datepicker>
    </b-field>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    label: String,
    value: Date,
    labelPosition: String,
    mode: String,
    rules: String,
  },
};
</script>
