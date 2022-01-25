<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Schedules</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->
    <!-- Schedules Table -->
    <div class="container is-fluid my-5">
      <div class="card p-2">
        <header class="is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
          <h6 class="has-text-weight-medium is-flex is-align-items-center">
            <b-icon icon="calendar-clock-outline"></b-icon>
            <h6 class="is-size-6 has-text-weight-semibold px-3">Schedules</h6>
          </h6>
          <div>
            <b-tooltip label="Add">
              <b-button
                size="is-small"
                icon-right="plus"
                tag="router-link"
                to="/timekeeping/schedules/add"
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
            <b-autocomplete
              v-model="schedule"
              :data="filteredSchedules"
              placeholder="Search schedule name"
              icon="magnify"
              clearable
              @select="option => selectedSchedule = option">
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field>
        </div>

        <b-table
          :data="isEmpty ? [] : schedules"
          :striped="isStriped"
          :hoverable="isHoverable"
          :mobile-cards="hasMobileCards"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :pagination-position="paginationPosition"
          :default-sort-direction="defaultSortDirection"
          :pagination-rounded="isPaginationRounded"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          default-sort="user.first_name"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            v-slot="props" field="day"
            label="Day"
            sortable
          >
            {{ props.row.day }}
          </b-table-column>

          <b-table-column
            v-slot="props" field="timein"
            label="Time In"
          >
            {{ props.row.timein }}
          </b-table-column>

          <b-table-column
            v-slot="props" field="timeout"
            label="Time Out"
          >
            {{ props.row.timeout }}
          </b-table-column>

          <b-table-column
            v-slot="props" field="breakin"
            label="Break In"
          >
            {{ props.row.breakin }}
          </b-table-column>

          <b-table-column
            v-slot="props" field="breakout"
            label="Break Out"
          >
            {{ props.row.breakout }}
          </b-table-column>

          <template #empty>
              <div class="has-text-centered">No records</div>
          </template>
        </b-table>
      </div>
    </div>
    <!-- Schedules Table -->
    <!-- Start Modals -->
    <add-modal
      :active="addModal"
      @close="addModal = !addModal"
    ></add-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    AddModal: () => import('@/components/Timekeeping/Schedule/AddModal.vue'),
  },

  data () {
    return {
      addModal: false,
      uploadModal: false,
      isEmpty: false,
      isStriped: true,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: true,
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,
      schedules: [
        {
          id: 1, day: 'Monday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 2, day: 'Tuesday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 3, day: 'Wednesday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 4, day: 'Thursday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 5, day: 'Friday', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:00 PM', breakout: '1:00 PM',
        },
        {
          id: 6, day: 'Saturday', timein: '-', timeout: '-', breakin: '-', breakout: '-',
        },
        {
          id: 7, day: 'Sunday', timein: '-', timeout: '-', breakin: '-', breakout: '-',
        },
      ],
      scheduleList: [
        'IT Dept Schedule',
        'HR Dept Schedule',
        'Accounting Dept Schedule',
        'Standard Schedule',
        'Company Schedule',
        'Partimer Schedule',
        'Fulltimer Schedule',
      ],
      // Selected option
      selectedSchedule: null,
      // Input Value
      schedule: '',
    };
  },

  computed: {
    filteredSchedules () {
      return this.filteredDataArray(this.scheduleList, this.schedule);
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
