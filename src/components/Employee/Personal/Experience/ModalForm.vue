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
          <div class="columns">
            <div class="column is-6">
                <text-field
                  v-model="form.company"
                  label="Company"
                  rules="required"
                  mode="eager"
                ></text-field>
            </div>
            <div class="column is-6">
              <text-field
                v-model="form.project_name"
                label="Project Name"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <text-field
                v-model="form.role"
                label="Role"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
            <div class="column is-6">
              <text-field
                v-model="form.salary"
                label="Salary"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <text-field
                v-model="form.description"
                label="Description"
                rules="required"
                mode="eager"
              ></text-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <date-picker-field
                v-model="form.start_at"
                label="Start at"
                rules="required"
                mode="eager"
              ></date-picker-field>
            </div>
            <div class="column is-6">
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
import ExperienceRepresentation from '@/api/representations/ExperienceRepresentation';

export default {
  props: {
    title: {
      type: String,
      default: 'Experience',
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      experienceForm: 'experience/form',
    }),
    form: {
      get () {
        const form = isEmpty(this.formData) ? this.experienceForm : this.formData;
        return new ExperienceRepresentation(form);
      },
      set (value) {
        return value;
      },
    },
  },

  methods: {
    ...mapActions({
      save: 'experience/save',
      update: 'experience/update',
    }),
    submit () {
      ((this.form.asPayload.id) ? this.update(this.form.asPayload) : this.save(this.form.asPayload)).then(this.$emit('close'));
    },
  },
};
</script>
