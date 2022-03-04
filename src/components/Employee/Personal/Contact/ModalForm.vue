<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
    <form @submit.prevent="passes(submit)">
      <div class="modal-card">
        <header class="modal-card-head is-flex is-justify-content-space-between">
          <h6 class="is-size-6 has-text-weight-bold">{{ title }}</h6>
          <button
            type="button"
            class="delete"
            @click="$emit('close')"
          ></button>
        </header>
        <section class="modal-card-body py-5">
          <text-field
            v-model="form.name"
            label="Contact No."
            rules="required"
            mode="eager"
            field-class="pb-3"
          ></text-field>
          <text-field
            v-model="form.description"
            label="Contact Name"
            rules="required"
            mode="eager"
            field-class="pb-3"
          ></text-field>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-end">
          <b-button
            label="Cancel"
            @click="$emit('close')"
          />
          <b-button
            :disabled="invalid"
            native-type="submit"
            label="Save"
            type="is-primary"
          />
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from 'lodash';

export default {
  props: {
    title: {
      type: String,
      default: 'Contact',
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      contactForm: 'contact/form',
    }),
    form: {
      get () {
        return isEmpty(this.formData) ? this.contactForm : this.formData;
      },
      set (value) {
        return value;
      },
    },
  },

  methods: {
    ...mapActions({
      save: 'contact/save',
      update: 'contact/update',
    }),
    submit () {
      ((this.form.id) ? this.update(this.form) : this.save(this.form)).then(this.$emit('close'));
    },
  },
};
</script>
