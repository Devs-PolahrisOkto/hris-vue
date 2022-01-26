<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Work Shifts</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->
    <!-- Work Shifts Table -->
    <div class="container is-fluid my-5">
      <div class="card p-2">
        <header class="is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
          <h6 class="has-text-weight-medium is-flex is-align-items-center">
            <b-icon icon="calendar-clock-outline"></b-icon>
            <h6 class="is-size-6 has-text-weight-semibold px-3">Work Shifts</h6>
          </h6>
          <div>
            <b-tooltip label="Add">
              <b-button
                size="is-small"
                icon-right="plus"
                tag="router-link"
                to="/timekeeping/workshifts/add"
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
              :data="employeeList"
              placeholder="Search employee name"
              icon="magnify"
              clearable
              @select="option => selectedEmployee = option">
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field>
        </div>
        <b-table
          :data="meta.isEmpty ? [] : filteredWorkshifts"
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
            v-slot="props" field="approved"
            label="Approval Status"
            centered
            sortable
          >
            <span
              class="tag"
              :class="{
                'is-success': props.row.approved,
                'is-light' : !props.row.approved,
              }"
            >{{ props.row.approved ? 'Approved' : 'Pending' }}</span>
          </b-table-column>

          <b-table-column
            v-slot="props" field="active"
            label="Status"
            centered
            sortable
          >
            <span
              class="tag"
              :class="{
                'is-success': props.row.active,
                'is-danger': !props.row.active,
              }"
            >{{ props.row.active ? 'Active' : 'Inactive' }}</span>
          </b-table-column>

          <template #empty>
            <no-record></no-record>
          </template>
        </b-table>
      </div>
    </div>
    <!-- Work Shifts Table -->
  </main-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      selectedEmployee: null,
      employee: '',
    };
  },

  computed: {
    ...mapGetters({
      columns: 'workshift/table/columns',
      list: 'workshift/table/list',
      meta: 'workshift/table/meta',
      employeeList: 'workshift/employeeList',
    }),
    filteredWorkshifts () {
      return this.list.filter(shift => shift
        .employee
        .toLowerCase()
        .includes((this.selectedEmployee && this.selectedEmployee.toLowerCase()) || ''));
    },
  },
};
</script>
