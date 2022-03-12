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
      <div class="card p-2">
        <!-- Header Options -->
        <div class="is-flex is-justify-content-space-between py-2">
          <b-input
            v-model="searchField"
            placeholder="Search name..."
            type="search"
            icon="magnify">
          </b-input>
          <div>
            <b-tooltip label="Filter">
              <b-button
                icon-right="filter"
                class="mr-1"
                @click="isFilterModalActive = !isFilterModalActive"
              />
            </b-tooltip>
            <b-tooltip label="Layout">
              <b-button
                icon-right="grid-large"
                class="mr-1"
                @click="isLayoutModalActive = !isLayoutModalActive"
              />
            </b-tooltip>
            <b-tooltip label="Columns">
              <b-button
                icon-right="table-column"
                @click="isColumnModalActive = !isColumnModalActive"
              />
            </b-tooltip>
          </div>
        </div>
        <!-- Header Options -->

        <!-- Table Layout -->
        <div v-show="layout === 'table'">
          <b-table
            :data="meta.isEmpty ? [] : list"
            :loading="loading"
            :paginated="meta.isPaginated"
            :backend-pagination="meta.backendPagination"
            :backend-sorting="meta.backendSorting"
            :total="meta.total"
            :per-page="meta.per_page"
            :striped="meta.isStriped"
            :hoverable="meta.isHoverable"
            :mobile-cards="meta.hasMobileCards"
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
            @page-change="onPageChange"
          >
            <b-table-column v-slot="props" field="avatar" width="40">
              <figure class="image is-24x24">
                <img class="is-rounded" :src="getProfileImageUrl(props.row)">
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

            <b-table-column
              v-slot="props"
              field="option"
            >
              <b-button
                size="is-small"
                type="is-primary"
                icon-right="eye"
                tag="router-link"
                :to="`/employees/${props.row.user.id}`"
              />
            </b-table-column>

            <template #empty>
              <no-record></no-record>
            </template>
          </b-table>
        </div>
        <!-- Table Layout -->

        <!-- Grid Layout -->
        <div v-show="layout === 'grid'">
          <div class="columns is-flex is-flex-wrap-wrap">
            <template v-for="(item, index) in list">
              <div :key="index" class="column is-6-desktop is-12-tablet is-12-mobile">
                <article class="media has-background-white p-4">
                  <figure class="media-left">
                    <p class="image is-128x128">
                      <img :src="item.avatar">
                    </p>
                  </figure>
                  <div class="media-content">
                    <h5 class="is-size-5 has-text-weight-semibold">{{ item.fullname }}</h5>
                    <h6 class="is-size-6 has-text-grey">{{ item.primaryPosition }}</h6>
                    <h6 class="is-size-6">{{ item.employmentType }}</h6>
                  </div>
                  <div class="media-right">
                    <b-button
                      size="is-small"
                      type="is-primary"
                      icon-right="eye"
                      tag="router-link"
                      :to="`/employees/${item.user.id}`"
                    />
                  </div>
                </article>
              </div>
            </template>
          </div>
        </div>
        <!-- Grid Layout -->
      </div>
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
import { debounce } from 'lodash';
import Avatar from '@/mixins/avatar';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    FilterModal: () => import('@/components/Employees/Modal/FilterModal.vue'),
    ColumnModal: () => import('@/components/Employees/Modal/ColumnModal.vue'),
    LayoutModal: () => import('@/components/Employees/Modal/LayoutModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      layout: 'table',
      searchField: '',
      isFilterModalActive: false,
      isColumnModalActive: false,
      isLayoutModalActive: false,
    };
  },

  mixins: [ Avatar ],

  computed: {
    ...mapGetters({
      columns: 'employee/table/columns',
      list: 'employee/table/list',
      loading: 'employee/table/list/loading',
      meta: 'employee/table/meta',
    }),
  },

  watch: {
    searchField: debounce(function (query) {
      this.getList({
        page: 1,
        size: 10,
        sort: '-created_at',
        filter: query,
      });
    }, 500),
  },

  created () {
    this.getList();
  },

  methods: {
    ...mapActions({
      setForm: 'employee/setForm',
      getList: 'employee/list',
    }),
    changeLayout (requestedLayout) {
      this.layout = requestedLayout;
    },
    onPageChange (page) {
      this.getList({
        page,
        size: 10,
        sort: '-created_at',
        filter: '',
      });
    },
  },
};
</script>
