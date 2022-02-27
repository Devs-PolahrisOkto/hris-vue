<template>
  <b-modal
    v-model="active"
    :width="800"
    :can-cancel="['x']"
  >
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(submit)">
        <div class="modal-card">
          <header class="modal-card-head is-flex is-justify-content-space-between">
            <h6 class="is-size-6 has-text-weight-bold">
              Add Education
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body py-5">
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
            <text-field
              v-model="form.description"
              label="Description"
              rules="required"
              mode="eager"
              field-class="pb-3"
            ></text-field>
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
              field-class="pb-6"
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
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EducationRepresentation from '@/api/representations/EducationRepresentation';

export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  computed: {
    ...mapGetters({
      employee: 'employee/selected',
      educationForm: 'education/form',
    }),
    form: {
      get () {
        return new EducationRepresentation(this.educationForm);
      },
      set (value) {
        return value;
      },
    },
  },

  methods: {
    ...mapActions({
      save: 'education/save',
    }),
    submit () {
      this.save(this.form.asPayload).then(this.$emit('close'));
    },
  },
};
</script>
