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
              :data="scheduleList"
              placeholder="Search schedule name"
              icon="magnify"
              clearable
              @select="option => selectedSchedule = option">
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field>
        </div>
        <b-table
          :data="meta.isEmpty ? [] : filteredSchedules"
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
            v-slot="props" field="status"
            label="Status"
            centered
            sortable
          >
            <span
              class="tag"
              :class="{
                'is-success': props.row.status,
                'is-danger': !props.row.status,
              }"
            >{{ props.row.status ? 'Active' : 'Inactive' }}</span>
          </b-table-column>

          <template #empty>
            <no-record></no-record>
          </template>
        </b-table>
      </div>
    </div>
    <!-- Schedules Table -->
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
      selectedSchedule: null,
      schedule: '',
    };
  },

  computed: {
    ...mapGetters({
      columns: 'schedule/table/columns',
      list: 'schedule/table/list',
      meta: 'schedule/table/meta',
      scheduleList: 'schedule/scheduleList',
    }),
    filteredSchedules () {
      return this.list.filter(schedule => schedule
        .scheduleName
        .toLowerCase()
        .includes((this.selectedSchedule && this.selectedSchedule.toLowerCase()) || ''));
    },
  },
};
</script>
