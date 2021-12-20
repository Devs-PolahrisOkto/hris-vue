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
        :value="dateValue"
        @input="$emit('input', $moment($event).format('L'))"
      ></b-datepicker>
    </b-field>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    labelPosition: String,
    mode: String,
    rules: String,
  },
  computed: {
    dateValue: {
      // eslint-disable-next-line max-len
      get () { return this.value ? this.$moment(this.value, this.$moment.defaultFormat).toDate() : null; },
    },
  },
};
</script>
