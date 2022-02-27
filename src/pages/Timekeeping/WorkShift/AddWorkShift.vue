<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li><a href="#">Work Shifts</a></li>
        <li class="is-active"><a href="#" aria-current="page">Add Work Shift</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->
    <!-- Add Work Shift Form -->
    <div class="container is-fluid my-5">
      <div class="card p-2">
        <header class="is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
          <h6 class="has-text-weight-medium is-flex is-align-items-center">
            <b-icon icon="calendar-clock-outline"></b-icon>
            <h6 class="is-size-6 has-text-weight-semibold px-3">Add Work Shift</h6>
          </h6>
          <div>
            <b-tooltip
              v-if="hasWorkShifts"
              label="Add"
            >
              <b-button
                size="is-small"
                icon-right="plus"
                @click="addModal = true"
              />
            </b-tooltip>
          </div>
        </header>
        <div
          class="has-background-light is-flex
          is-justify-content-space-between
          is-align-items-start px-3 pt-5"
        >
          <b-field class="mb-5">
            <b-taginput
              v-model="employees"
              :data="filteredEmployees"
              autocomplete
              :open-on-focus="true"
              field="user.first_name"
              icon="account-circle"
              placeholder="Select employees"
              @typing="getFilteredTags">
            </b-taginput>
          </b-field>
        </div>
        <div class="card-content">
          <b-table
            v-if="hasWorkShifts"
            :data="meta.isEmpty ? [] : filteredWorkShifts"
            :striped="meta.isStriped"
            :hoverable="meta.isHoverable"
            :mobile-cards="meta.hasMobileCards"
            :paginated="meta.isPaginated"
            :per-page="meta.perPage"
            :current-page.sync="meta.currentPage"
            :pagination-simple="meta.isPaginationSimple"
            :pagination-position="meta.paginationPosition"
            :default-sort-direction="meta.defaultSortDirection"
            :pagination-rounded="meta.isPaginationRounded"
            :sort-icon="meta.sortIcon"
            :sort-icon-size="meta.sortIconSize"
            :default-sort="meta.defaultSortColumn"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
            <template v-for="(column, index) in columns">
              <b-table-column
                v-if="!column.custom"
                :key="index"
                v-slot="props"
                :label="column.title"
                :field="column.field"
                :visible="column.visible"
                :centered="column.centered"
                :sortable="column.sortable"
              >
                {{ props.row[column.field] }}
              </b-table-column>
            </template>

            <b-table-column
              v-slot="props" field="timeIn"
              label="Time In & Time Out"
              centered
            >
              {{ `${props.row.timeIn} - ${props.row.timeOut}` }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="morningBreak"
              label="Morning Break Time"
              centered
            >
              {{ `${props.row.morningBreakIn} - ${props.row.morningBreakOut}` }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="lunchBreak"
              label="Lunch Break Time"
              centered
            >
              {{ `${props.row.lunchBreakIn} - ${props.row.lunchBreakOut}` }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="afternoonBreak"
              label="Afternoon Break Time"
              centered
            >
              {{ `${props.row.afternoonBreakIn} - ${props.row.afternoonBreakOut}` }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="remove"
              label=""
              centered
            >
              <b-button
                type="is-danger"
                icon-right="delete"
                class="px-4"
                rounded
                @click="removeWorkShift(props.row)"
              />
            </b-table-column>
          </b-table>
          <div v-else>
            <div
              class="is-flex is-justify-content-center
              is-align-items-center is-flex-direction-column m-5 p-5"
            >
              <add-file-illustration width="250" height="250"></add-file-illustration>
              <b-button
                native-type="submit"
                class="is-primary mt-6 mr-auto"
                outlined
                @click="addModal = true"
              >
                <span class="has-text-weight-bold px-6">Add Work Shift</span>
              </b-button>
            </div>
          </div>
        </div>
        <div
          v-if="hasWorkShifts"
          class="is-flex is-justify-content-end p-3"
        >
          <b-button
            native-type="submit"
            class="is-primary mt-6 mr-auto"
          >
            <span class="has-text-weight-bold px-6">Save Work Shifts</span>
          </b-button>
        </div>
      </div>
    </div>
    <!-- Add Work Shift Form -->
    <!-- Start Modals -->
    <add-modal
      :active="addModal"
      @close="addModal = !addModal"
      @submit="addWorkShift"
    ></add-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniqueId } from 'lodash';
import { formatTimeToString } from '@/filters/date';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    AddModal: () => import('@/components/Timekeeping/WorkShift/AddModal.vue'),
    AddFileIllustration: () => import('@/components/Illustrations/AddFileIllustration.vue'),
  },

  data () {
    return {
      addModal: false,
      selectedEmployee: null,
      employees: [],
      workShifts: [],
      filteredEmployeesTag: [],
    };
  },

  filters: {
    formatTimeToString,
  },

  computed: {
    ...mapGetters({
      columns: 'workshift/addWorkShift/table/columns',
      meta: 'workshift/addWorkShift/table/meta',
      employeeList: 'workshift/employeeList',
    }),
    filteredWorkShifts () {
      return this.workShifts.map(shift => ({
        id: shift.id,
        date: this.formatDateToString(shift.date),
        timeIn: this.formatTimeToString(shift.timeIn),
        timeOut: this.formatTimeToString(shift.timeOut),
        morningBreakIn: this.formatTimeToString(shift.morningBreakIn),
        morningBreakOut: this.formatTimeToString(shift.morningBreakOut),
        lunchBreakIn: this.formatTimeToString(shift.lunchBreakIn),
        lunchBreakOut: this.formatTimeToString(shift.lunchBreakOut),
        afternoonBreakIn: this.formatTimeToString(shift.afternoonBreakIn),
        afternoonBreakOut: this.formatTimeToString(shift.afternoonBreakOut),
      }));
    },
    hasWorkShifts () {
      return this.filteredWorkShifts.length > 0;
    },
    filteredEmployees: {
      get () {
        return this.filteredEmployeesTag;
      },
      set (value) {
        return value;
      },
    },
  },

  methods: {
    getFilteredTags (text) {
      this.filteredEmployeesTag = [ ...this.employeeList.filter(option => option
        .toString()
        .toLowerCase()
        .includes(text.toLowerCase() || '')) ];
    },
    addWorkShift (form) {
      this.workShifts.push({ ...form, id: uniqueId() });
    },
    removeWorkShift (workshift) {
      const index = this.workShifts.findIndex(item => item.id === workshift.id);
      this.workShifts.splice(index, 1);
    },
  },
};
</script>
