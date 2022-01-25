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
          <b-field class="mb-5">

          </b-field>
        </div>
        <div class="card-content">
          <b-table
            :data="meta.isEmpty ? [] : list"
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
      </div>
    </div>
    <!-- Add Work Shift Form -->
    <!-- Start Modals -->
    <add-modal
      :active="addModal"
      @close="addModal = !addModal"
      @submit="updateSchedule"
    ></add-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    AddModal: () => import('@/components/Timekeeping/Schedule/AddModal.vue'),
  },

  data () {
    return {
      addModal: false,
      selectedEmployee: null,
      employee: '',
      workShifts: [],
    };
  },

  computed: {
    ...mapGetters({
      columns: 'schedule/addSchedule/table/columns',
      list: 'schedule/addSchedule/table/list',
      meta: 'schedule/addSchedule/table/meta',
    }),
  },

  methods: {
    editSchedule (schedule) {
      console.log(schedule);
    },
    updateSchedule (schedule) {
      console.log(schedule);
    },
  },
};
</script>
