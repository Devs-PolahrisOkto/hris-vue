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
      :class="fieldClass"
    >
      <b-input
        :type="type"
        :value="value"
        :password-reveal="type ==='password'"
        :class="inputClass"
        @input.native="$emit('input', $event.target.value)"
      ></b-input>
    </b-field>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    value: String,
    labelPosition: String,
    mode: String,
    rules: String,
    fieldClass: String,
    inputClass: String,
  },
};
</script>
