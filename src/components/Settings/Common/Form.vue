<template>
<ValidationObserver ref="observer" v-slot="{ invalid, passes }">
    <form @submit.prevent="passes(submit)">
        <div class="modal-card">
            <header class="modal-card-head is-flex is-justify-content-space-between">
                <h6 class="is-size-6 has-text-weight-bold">
                    <slot name="header-title"></slot>
                </h6>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <text-field
                    v-model="form.name"
                    label="Name"
                    rules="required"
                    mode="eager"
                ></text-field>
                <text-field
                    v-model="form.description"
                    label="Description"
                    mode="eager"
                ></text-field>
            </section>
            <footer class="modal-card-foot">
                <b-button
                    label="Close"
                    @click="$emit('close')" />
                <b-button
                    :disabled="invalid"
                    native-type="submit"
                    label="Save"
                    type="is-primary" />
            </footer>
        </div>
    </form>
</ValidationObserver>
</template>

<script>
export default {
  props: {
    modalForm: {
      type: Object,
      default: () => {},
    },
  },

  data () {
    return {
      form: {},
    };
  },

  methods: {
    submit () {
      this.$emit('submit', this.form);
    },
  },

  mounted () {
    this.form = { ...this.modalForm };
  },
};
</script>
