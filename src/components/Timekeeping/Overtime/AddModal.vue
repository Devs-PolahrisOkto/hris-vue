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
              Add Overtime
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body py-6">
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
            <date-picker-field
              v-model="form.date"
              label="Date"
              rules="required"
              mode="eager"
            ></date-picker-field>
            <div class="columns my-4">
              <div class="column">
                <clock-picker-field
                  v-model="form.from"
                  placeholder="From"
                  label="From"
                  rules="required"
                  mode="eager"
                  icon="clock"
                ></clock-picker-field>
              </div>
              <div class="column">
                <clock-picker-field
                  v-model="form.to"
                  placeholder="To"
                  label="To"
                  rules="required"
                  mode="eager"
                  icon="clock"
                ></clock-picker-field>
              </div>
            </div>
            <b-field label="Reason" class="mt-3">
              <b-input maxlength="40" type="textarea"></b-input>
            </b-field>
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
        date: null,
        from: null,
        to: null,
        reason: '',
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
