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
        <b-input 
            :value="value"
            @input.native="$emit('input', $event.target.value)"
        ></b-input>
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
}
</script>

