<template>
<b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
>
    <modal-form 
        @submit="save"
        @close="$emit('close')"
    >
        <template v-slot:header-title>
            Add Company
        </template>
    </modal-form>
</b-modal>
</template>

<script>
export default {
    components: {
        ModalForm: () => import("@/components/Settings/Common/Form.vue"),
    },

    props: {
        active: {
            type: Boolean
        },
    },

    methods: {
        save(form) {
            console.log('save', form);
        }
    }
}
</script>
