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
              Add Leave
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
            <b-field label="Dates" class="pb-4">
              <b-datepicker
                v-model="form.dates"
                placeholder="Select dates"
                multiple>
              </b-datepicker>
            </b-field>
            <b-field label="Leave Type">
              <b-select placeholder="Select leave type" expanded>
                <option value="vl">VL</option>
                <option value="sl">SL</option>
              </b-select>
            </b-field>
            <b-field label="Reason" class="pt-4">
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
        dates: [],
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
