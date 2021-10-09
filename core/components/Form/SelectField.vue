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
        <b-select 
            :value="value"
            @input.native="$emit('input', $event.target.value)"
            expanded
        >
            <option value="">Select one</option>
            <template v-for="(option,index) in options">
                <option 
                    :value="option.value" 
                    v-text="option.text" 
                    :key="index"
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
        value: String,
        labelPosition: String,
        mode: String,
        rules: String,
        options: {
            type: Array,
            default: ()=> [],
        }
    },
}
</script>

