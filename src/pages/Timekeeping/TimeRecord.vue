<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Time Record</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->
    <!-- Time Record Table -->
    <div class="container is-fluid my-5">
      <div class="card p-2">
        <header class="is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
          <h6 class="has-text-weight-medium is-flex is-align-items-center">
            <b-icon icon="calendar-clock-outline"></b-icon>
            <h6 class="is-size-6 has-text-weight-semibold px-3">Time Record Sheet</h6>
          </h6>
          <div>
            <b-tooltip label="Upload">
              <b-button
                size="is-small"
                icon-right="upload"
                class="mr-2"
                @click="uploadModal = true"
              />
            </b-tooltip>
            <b-tooltip label="Add">
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
            <b-autocomplete
              v-model="employee"
              :data="filteredEmployees"
              placeholder="Search employee name"
              icon="magnify"
              clearable
              @select="option => selectedPosition = option">
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field>
          <b-field>
            <b-datepicker
              placeholder="Date"
              icon="calendar-range-outline"
              clearable
              range
            ></b-datepicker>
          </b-field>
        </div>

        <b-table
          :data="isEmpty ? [] : employees"
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
          <!-- <b-table-column field="id" width="40">
            <figure class="image is-24x24">
              <img class="is-rounded" src="https://bulma.io/images/placeholders/24x24.png">
            </figure>
          </b-table-column> -->

          <b-table-column
            v-slot="props" field="name"
            label="Name"
            sortable
          >
            {{ props.row.name }}
          </b-table-column>

          <b-table-column
            v-slot="props" field="date"
            label="Date"
            sortable
            centered
          >
            {{ props.row.date }}
          </b-table-column>

          <b-table-column
            v-slot="props" field="timein"
            label="Time In & Time Out"
            sortable
            centered
          >
            {{ props.row.timein }} - {{ props.row.timeout }}
          </b-table-column>

          <b-table-column
            field="breakin"
            label="Morning Break Time"
            sortable
            centered
          >
            -
          </b-table-column>

          <b-table-column
            v-slot="props" field="breakin"
            label="Lunch Break Time"
            sortable
            centered
          >
            {{ props.row.breakin }} - {{ props.row.breakout }}
          </b-table-column>

          <b-table-column
            field="breakin"
            label="Afternoon Break Time"
            sortable
            centered
          >
            -
          </b-table-column>

          <!-- <b-table-column
            v-slot="props" field="status"
            label="Status"
            sortable
          >
            <b-tag type="is-info">{{ props.row.status }}</b-tag>
          </b-table-column> -->

          <!-- <b-table-column field="option" centered>
              <b-button size="is-small" type="is-primary" icon-right="eye" />
          </b-table-column> -->

          <template #empty>
              <div class="has-text-centered">No records</div>
          </template>
        </b-table>
      </div>
    </div>
    <!-- Time Record Table -->
    <!-- Start Modals -->
    <add-modal
      :active="addModal"
      @close="addModal = !addModal"
    ></add-modal>
    <upload-modal
      :active="uploadModal"
      @close="uploadModal = !uploadModal"
    ></upload-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    AddModal: () => import('@/components/Timekeeping/TimeRecord/AddModal.vue'),
    UploadModal: () => import('@/components/Timekeeping/TimeRecord/UploadModal.vue'),
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
      employees: [
        {
          id: 1, name: 'Jesse Simmons', status: 'Working', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 2, name: 'John Jacobs', status: 'Lunch Break', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 3, name: 'Tina Gilbert', status: 'Working', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 4, name: 'Clarence Flores', status: 'Working', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 5, name: 'Anne Lee', status: 'Early Out', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 6, name: 'Bill Gates', status: 'Working', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 7, name: 'Elon Musk', status: 'Working', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 8, name: 'Steve Jobs', status: 'Working', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 9, name: 'Warren Buffett', status: 'Lunch Break', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
        {
          id: 10, name: 'Jeff Bezos', status: 'Working', timein: '7:00AM', timeout: '5:00 PM', breakin: '12:10 PM', breakout: '1:00 PM', date: '12-23-2021',
        },
      ],
      employeeList: [
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
      return this.filteredDataArray(this.employeeList, this.employee);
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
