<template>
  <b-modal
    v-model="active"
    :width="800"
    :can-cancel="['x']"
    :trap-focus="false"
  >
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(submit)">
        <div class="modal-card">
          <header class="modal-card-head is-flex is-justify-content-space-between">
            <h6 class="is-size-6 has-text-weight-bold">
              Add Time Record
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body py-6" style="height: 600px;">
            <b-field label="Employee" class="pb-4">
              <b-autocomplete
                v-model="employee"
                :data="filteredEmployees"
                placeholder="Search employee name"
                icon="magnify"
                clearable
                @select="option => selectedEmployee = option">
                <template #empty>No results found</template>
              </b-autocomplete>
            </b-field>
            <h5 class="is-size-6 mb-3">Time In & Time Out</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  rules="required"
                  mode="eager"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  rules="required"
                  mode="eager"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
            <h5 class="is-size-6 mb-3">Morning Break Time</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
            <h5 class="is-size-6 mb-3">Lunch Break Time</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
            <h5 class="is-size-6 mb-3">Afternoon Break Time</h5>
            <div class="columns">
              <div class="column">
                <clock-picker-field
                  placeholder="From"
                  label-position="on-border"
                  label="From"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  placeholder="To"
                  label-position="on-border"
                  label="To"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot is-flex is-justify-content-flex-end">
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
export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  data () {
    return {
      form: {
        user: null,
        time_in: null,
        time_out: null,
        break_in: null,
        break_out: null,
      },
      employees: [
        'Lebron James',
        'Stephen Curry',
        'Kevin Durant',
        'James Harden',
        'Kyrie Irving',
        'Luca Doncic',
        'Donovan Mitchell',
        'Trae Young',
      ],
      // Selected option
      selectedEmployee: null,
      // Input Value
      employee: '',
    };
  },

  computed: {
    filteredEmployees () {
      return this.filteredDataArray(this.employees, this.employee);
    },
  },

  methods: {
    filteredDataArray (dataArray, query) {
      return dataArray.filter(option => option
        .toString()
        .toLowerCase()
        .indexOf(query.toLowerCase()) >= 0);
    },
  },
};
</script>
