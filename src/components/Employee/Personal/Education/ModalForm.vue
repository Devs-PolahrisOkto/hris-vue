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
            v-model="form.school"
            label="School"
            rules="required"
            mode="eager"
            field-class="pb-3"
          ></text-field>
          <text-field
            v-model="form.degree"
            label="Degree"
            rules="required"
            mode="eager"
            field-class="pb-3"
          ></text-field>
          <text-field
            v-model="form.description"
            label="Description"
            rules="required"
            mode="eager"
            field-class="pb-3"
          ></text-field>
          <div class="columns pt-4">
            <div class="column">
              <date-picker-field
                v-model="form.start_at"
                label="Start at"
                rules="required"
                mode="eager"
              ></date-picker-field>
            </div>
            <div class="column">
              <date-picker-field
                v-model="form.end_at"
                label="End at"
                rules="required"
                mode="eager"
              ></date-picker-field>
            </div>
          </div>
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
import EducationRepresentation from '@/api/representations/EducationRepresentation';

export default {
  props: {
    title: {
      type: String,
      default: 'Education',
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      educationForm: 'education/form',
    }),
    form: {
      get () {
        const form = isEmpty(this.formData) ? this.educationForm : this.formData;
        return new EducationRepresentation(form);
      },
      set (value) {
        return value;
      },
    },
  },

  methods: {
    ...mapActions({
      save: 'education/save',
      update: 'education/update',
    }),
    submit () {
      ((this.form.asPayload.id) ? this.update(this.form.asPayload) : this.save(this.form.asPayload)).then(this.$emit('close'));
    },
  },
};
</script>
