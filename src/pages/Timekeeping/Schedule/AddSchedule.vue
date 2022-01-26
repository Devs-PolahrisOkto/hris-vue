<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li><a href="#">Schedules</a></li>
        <li class="is-active"><a href="#" aria-current="page">Add Schedule</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->
    <!-- Add Work Shift Form -->
    <div class="container is-fluid my-5">
      <div class="card p-2">
        <header class="is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
          <h6 class="has-text-weight-medium is-flex is-align-items-center">
            <b-icon icon="calendar-clock-outline"></b-icon>
            <h6 class="is-size-6 has-text-weight-semibold px-3">Add Schedule</h6>
          </h6>
        </header>
        <div
          class="has-background-light is-flex
          is-justify-content-space-between
          is-align-items-start px-3 pt-5"
        >
          <b-input placeholder="Schedule Name" class="mb-5"></b-input>
        </div>
        <div class="card-content">
          <b-table
            :data="meta.isEmpty ? [] : newSchedule"
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
              {{ props.row.timeIn | formatTimeToString }} -
              {{ props.row.timeOut | formatTimeToString }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="morningBreak"
              label="Morning Break Time"
              centered
            >
              {{ props.row.morningBreakIn | formatTimeToString }} -
              {{ props.row.morningBreakOut | formatTimeToString }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="lunchBreak"
              label="Lunch Break Time"
              centered
            >
              {{ props.row.lunchBreakIn | formatTimeToString }} -
              {{ props.row.lunchBreakOut | formatTimeToString }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="afternoonBreak"
              label="Afternoon Break Time"
              centered
            >
              {{ props.row.afternoonBreakIn | formatTimeToString }} -
              {{ props.row.afternoonBreakOut | formatTimeToString }}
            </b-table-column>

            <b-table-column
              v-slot="props" field="edit"
              label=""
              centered
            >
              <b-button
                icon-right="pencil"
                class="px-4"
                rounded
                @click="editSchedule(props.row)"
              />
            </b-table-column>
          </b-table>
        </div>
        <div
          class="is-flex is-justify-content-end p-3"
        >
          <b-button
            native-type="submit"
            class="is-primary mt-6 mr-auto"
          >
            <span class="has-text-weight-bold px-6">Save Schedule</span>
          </b-button>
        </div>
      </div>
    </div>
    <!-- Add Work Shift Form -->
    <!-- Start Modals -->
    <add-modal
      :active="addModal"
      :schedule="selectedSchedule"
      @close="addModal = !addModal"
      @submit="updateSchedule"
    ></add-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import date from '@/mixins/date';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    AddModal: () => import('@/components/Timekeeping/Schedule/AddModal.vue'),
  },

  data () {
    return {
      addModal: false,
      selectedSchedule: {},
    };
  },

  mixins: [ date ],

  computed: {
    ...mapGetters({
      columns: 'schedule/addSchedule/table/columns',
      list: 'schedule/addSchedule/table/list',
      meta: 'schedule/addSchedule/table/meta',
    }),
    newSchedule: {
      get () {
        return [ ...this.list ];
      },
      set (value) {
        return value;
      },
    },
  },

  methods: {
    editSchedule (schedule) {
      this.selectedSchedule = { ...schedule };
      this.addModal = true;
    },
    updateSchedule (schedule) {
      const index = this.newSchedule.findIndex(obj => obj.day === schedule.day);
      this.$set(this.newSchedule, index, schedule);
    },
  },
};
</script>
