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
              Edit Personal Details
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body py-5">
            <div class="columns">
              <div class="column">
                <text-field
                  v-model="selectedEmployee.user.firstname"
                  label="First Name"
                  rules="required"
                  mode="eager"
                ></text-field>
              </div>
              <div class="column">
                <text-field
                  v-model="selectedEmployee.user.middlename"
                  label="Middle Name"
                  mode="passive"
                ></text-field>
              </div>
              <div class="column">
                <text-field
                  v-model="selectedEmployee.user.lastname"
                  label="Last Name"
                  rules="required"
                  mode="eager"
                ></text-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <text-field
                  v-model="selectedEmployee.user.extension"
                  label="Extension"
                ></text-field>
              </div>
              <div class="column">
                <select-field
                  v-model="selectedEmployee.user.title"
                  label="Title"
                  :options="TITLES"
                ></select-field>
              </div>
              <div class="column">
                <text-field
                  v-model="selectedEmployee.user.nickname"
                  label="Nickname"
                ></text-field>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <select-field
                  v-model="selectedEmployee.user.gender_id"
                  label="Gender"
                  rules="required"
                  mode="eager"
                  :options="gendersState"
                ></select-field>
              </div>
              <div class="column">
                <select-field
                  v-model="selectedEmployee.user.civil_status_id"
                  label="Civil Status"
                  rules="required"
                  mode="eager"
                  :options="civilStatusesState"
                ></select-field>
              </div>
              <div class="column">
                <date-picker-field
                  v-model="selectedEmployee.user.birthDate"
                  label="Birthdate"
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
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { TITLES } from '@/constants';

export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  data () {
    return {
      TITLES,
    };
  },

  computed: {
    ...mapGetters({
      employee: 'employee/selected',
      civilStatusesState: 'setting/civilStatusesState',
      gendersState: 'setting/gendersState',
    }),
    selectedEmployee: {
      get () {
        return { ...this.employee };
      },
      set (value) {
        return value;
      },
    },
  },

  created () {
    this.getList();
  },

  methods: {
    ...mapActions({
      getList: 'setting/list',
      update: 'employee/update',
    }),
    submit () {
      this.update(this.selectedEmployee).then(this.$emit('close'));
    },
  },
};
</script>
