<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <h6 class="is-size-6 has-text-weight-light px-3">Educational Background</h6>
      <b-button
        size="is-small"
        icon-right="plus"
        @click="addEducationModal = true"
      />
    </header>
    <!-- Employee Educational Background -->
    <b-table
      :data="isEmpty ? [] : education"
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
      default-sort="school"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        v-slot="props" field="school"
        label="School"
        sortable
      >
        {{ props.row.school }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="degree"
        label="Degree"
        sortable
      >
        {{ props.row.degree }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="start_at"
        label="Inclusive Dates"
        sortable width="240"
      >
        {{ `${formatDateToString(props.row.start_at)} - ${formatDateToString(props.row.end_at)}` }}
      </b-table-column>

      <template #empty>
        <no-record :width="160" :height="160"></no-record>
      </template>
    </b-table>
    <!-- Employee Educational Background -->
    <!-- Start Modals -->
    <add-modal
      :active="addEducationModal"
      @close="addEducationModal = !addEducationModal"
    ></add-modal>
    <!-- End Modals -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import date from '@/mixins/date';

export default {
  mixins: [ date ],

  components: {
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
    AddModal: () => import('@/components/Employee/Personal/Education/AddModal.vue'),
  },

  data () {
    return {
      isEmpty: false,
      isStriped: true,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: false,
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,
      addEducationModal: false,
    };
  },

  computed: {
    ...mapGetters({
      education: 'employee/selected/education',
    }),
  },
};
</script>

<style lang="scss" scoped>
/deep/ .table td,
/deep/ .table th {
    border: none;
}

/deep/ .pagination {
    padding-bottom: 10px;
    padding-right: 10px;
}
</style>
