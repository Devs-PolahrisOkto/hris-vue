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
      <b-select
        :value="value"
        expanded
        @input.native="$emit('input', $event.target.value)"
      >
        <option value="">Select one</option>
        <template v-for="(option,index) in options">
          <option
            :key="index"
            :value="option.value"
            v-text="option.text"
          ></option>
        </template>
      </b-select>
    </b-field>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    label: String,
    value: [ String, Number ],
    labelPosition: String,
    mode: String,
    rules: String,
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
