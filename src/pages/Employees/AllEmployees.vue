<template>
  <main-layout>

  <!-- Start Breadcrumb -->
  <nav class="breadcrumb px-5" aria-label="breadcrumbs">
    <ul class="px-3 pt-3">
      <li><a href="#">Admin</a></li>
      <li class="is-active"><a href="#" aria-current="page">Employees</a></li>
    </ul>
  </nav>
  <!-- End Breadcrumb -->

  <!-- Start Active Employees -->
  <div class="container is-fluid my-5">
    <div class="is-flex is-justify-content-space-between py-2">
      <b-input
        v-model="searchField"
        placeholder="Search..."
        type="search"
        icon="magnify">
      </b-input>
      <div>
        <b-tooltip label="Filter">
          <b-button
            icon-right="filter"
            class="mr-1"
            @click="isFilterModalActive = !isFilterModalActive" />
        </b-tooltip>
        <b-tooltip label="Layout">
          <b-button
            icon-right="grid-large"
            class="mr-1"
            @click="isLayoutModalActive = !isLayoutModalActive" />
        </b-tooltip>
        <b-tooltip label="Columns">
          <b-button
            icon-right="table-column"
            @click="isColumnModalActive = !isColumnModalActive" />
        </b-tooltip>
      </div>
    </div>

    <!-- Table Layout -->
    <div v-show="layout === 'table'">
      <b-table
        :data="isEmpty ? [] : filteredEmployees"
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
        default-sort="name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column v-slot="props" field="avatar" width="40">
          <figure class="image is-24x24">
            <img class="is-rounded" :src="props.row.avatar">
          </figure>
        </b-table-column>

        <template v-for="(column, index) in columns">
          <b-table-column
            :key="index"
            v-slot="props"
            :label="column.title"
            :field="column.field"
            :visible="column.visible"
            sortable
          >
            {{ props.row[column.field] }}
          </b-table-column>
        </template>

        <b-table-column v-slot="props" field="option">
          <b-button
            size="is-small"
            type="is-primary"
            icon-right="eye"
            tag="router-link"
            :to="`/employees/${props.row.id}`"
          />
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">No records</div>
        </template>

      </b-table>
    </div>
    <!-- Table Layout -->

    <!-- Grid Layout -->
    <div v-show="layout === 'grid'">
      <div class="columns is-flex is-flex-wrap-wrap">
        <template v-for="(item, index) in employees">
          <div :key="index" class="column is-6-desktop is-12-tablet is-12-mobile">
            <article class="media has-background-white p-4">
              <figure class="media-left">
                <p class="image is-128x128">
                  <img :src="item.avatar">
                </p>
              </figure>
              <div class="media-content">
                <h5 class="is-size-5 has-text-weight-semibold">{{ item.employeeName }}</h5>
                <h6 class="is-size-6 has-text-grey">{{ item.position }}</h6>
                <h6 class="is-size-6">{{ item.employment_type }}</h6>
                <h6 class="is-size-6">{{ item.department }}</h6>
              </div>
              <div class="media-right">
                <b-button
                  size="is-small"
                  type="is-primary"
                  icon-right="eye"
                  tag="router-link"
                  :to="`/employees/${item.id}`"
                />
              </div>
            </article>
          </div>
        </template>
      </div>
    </div>
    <!-- Grid Layout -->

  </div>
  <!-- End Active Employees -->

  <!-- Start Modals -->
  <filter-modal
    :active="isFilterModalActive"
    @close="isFilterModalActive = !isFilterModalActive"
  ></filter-modal>

  <column-modal
    :active="isColumnModalActive"
    :columns="columns"
    @close="isColumnModalActive = !isColumnModalActive"
  ></column-modal>

  <layout-modal
    :active="isLayoutModalActive"
    :layout="layout"
    @change-layout="changeLayout"
    @close="isLayoutModalActive = !isLayoutModalActive"
  ></layout-modal>

  <!-- End Modals -->

  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    FilterModal: () => import('@/components/Employees/Modal/FilterModal.vue'),
    ColumnModal: () => import('@/components/Employees/Modal/ColumnModal.vue'),
    LayoutModal: () => import('@/components/Employees/Modal/LayoutModal.vue'),
  },

  data () {
    return {
      layout: 'table',
      columns: [
        { title: 'Name', field: 'employeeName', visible: true },
        { title: 'Position', field: 'position', visible: true },
        { title: 'Department', field: 'department', visible: true },
        { title: 'Employment Type', field: 'employment_type', visible: true },
      ],
      isEmpty: false,
      isStriped: false,
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
      isFilterModalActive: false,
      isColumnModalActive: false,
      isLayoutModalActive: false,
      searchField: '',
    };
  },

  computed: {
    ...mapGetters({
      employees: 'employee/list',
    }),
    filteredEmployees () {
      return this.employees.filter(employee => employee
        .employeeName
        .toLowerCase()
        .includes(this.searchField.toLowerCase()));
    },
  },

  methods: {
    ...mapActions({
      setForm: 'employee/setForm',
      getList: 'employee/list',
    }),
    changeLayout (requestedLayout) {
      this.layout = requestedLayout;
    },
  },

  created () {
    this.getList();
  },
};
</script>
