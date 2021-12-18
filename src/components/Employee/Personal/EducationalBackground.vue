<template>
<div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
        <h6 class="is-size-6 has-text-weight-light px-3">Educational Background</h6>
        <b-button size="is-small" icon-right="refresh" />
    </header>
    <b-table
        :data="isEmpty ? [] : educationalBackground"
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
sortable>
            {{ props.row.school }}
        </b-table-column>

        <b-table-column
v-slot="props" field="degree"
label="Degree"
sortable>
            {{ props.row.degree }}
        </b-table-column>

        <b-table-column
v-slot="props" field="inclusiveDates"
label="Inclusive Dates"
sortable width="240">
            {{ props.row.inclusiveDates }}
        </b-table-column>

        <template #empty>
            <div class="has-text-centered">No records</div>
        </template>

    </b-table>
</div>
</template>

<script>
export default {
  props: {
    educationalBackground: {
      type: Array,
      default: () => [],
    },
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
    };
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
