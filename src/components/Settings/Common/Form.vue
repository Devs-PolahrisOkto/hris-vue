<template>
<ValidationObserver ref="observer" v-slot="{ passes }">
    <form @submit.prevent="passes(submit)">
        <div class="modal-card">
            <header class="modal-card-head is-flex is-justify-content-space-between">
                <h6 class="is-size-6 has-text-weight-bold">
                    <slot name="header-title"></slot>
                </h6>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                <text-field
                    label="Name"
                    v-model="form.name"
                    rules="required"
                    mode="eager"
                ></text-field>
                <text-field
                    label="Description"
                    v-model="form.description"
                    mode="eager"
                ></text-field>
            </section>
            <footer class="modal-card-foot">
                <b-button
                    label="Close"
                    @click="$emit('close')" />
                <b-button
                    native-type="submit" 
                    label="Save"
                    type="is-primary" />
            </footer>
        </div>
    </form>
</ValidationObserver>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props: {
        company: Object,
    },

    data() {
        return {
            form: {}
        }
    },

    computed: {
        ...mapGetters({
            companyForm: 'company/companyForm'
        })
    },

    methods: {
        submit() {
            this.$emit('submit', this.form);
        },
    },

    mounted() {
        this.form = {...this.companyForm};
    }
}
</script>
