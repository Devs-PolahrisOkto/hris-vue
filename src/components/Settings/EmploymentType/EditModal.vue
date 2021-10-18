<template>
<b-modal 
    v-model="active" 
    :width="640"
    :can-cancel="['x']"
>
    <modal-form 
        :modal-form="employmentTypeForm"
        @submit="update"
        @close="$emit('close')"
    >
        <template v-slot:header-title>
            Edit Employment Type
        </template>
    </modal-form>
</b-modal>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    components: {
        ModalForm: () => import("@/components/Settings/Common/Form.vue"),
    },

    props: {
        active: {
            type: Boolean
        },
    },

    computed: {
        ...mapGetters({
            employmentTypeForm: 'employmentType/employmentTypeForm'
        })
    },

    methods: {
        update(form) {
            console.log('update', form)
        }
    }
}
</script>
