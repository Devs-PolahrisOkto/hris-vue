<template>
<ValidationProvider 
    :name="label" 
    :rules="rules" 
    :mode="mode"
    v-slot="{ errors, valid }"
>
    <b-field 
        :label="label"
        :label-position="labelPosition" 
        :type="{ 'is-danger': errors[0], 'is-success': valid }" 
        :message="errors"
    >
        <b-datepicker 
            :value="value"
            @input.native="$emit('input', $event.target.value)"
        ></b-datepicker>
    </b-field>
</ValidationProvider>
</template>

<script>
export default {
    props: {
        label: String,
        value: Object,
        labelPosition: String,
        mode: String,
        rules: String,
    },
}
</script>

