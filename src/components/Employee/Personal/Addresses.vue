<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <h6 class="is-size-6 has-text-weight-light px-3">Addresses</h6>
      <b-button size="is-small" icon-right="refresh" />
    </header>
    <b-table
      :data="isEmpty ? [] : addresses"
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
        v-slot="props" field="name"
        label="Name"
        sortable
      >
        {{ props.row.name }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="address1"
        label="Address 1"
        sortable
      >
        {{ props.row.address1 }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="address2"
        label="Address 2"
        sortable width="240"
      >
        {{ props.row.address2 }}
      </b-table-column>

      <template #empty>
        <no-record :width="160" :height="160"></no-record>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
    };
  },

  components: {
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  computed: {
    ...mapGetters({
      addresses: 'employee/selected/addresses',
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
