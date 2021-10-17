<template>
<b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
>
    <modal-form 
        @submit="update"
        @close="$emit('close')"
    >
        <template v-slot:header-title>
            Edit Company
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
        update(form) {
            console.log('update', form)
        }
    }
}
</script>
