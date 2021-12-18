<template>
  <div class="card">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
      <h6 class="has-text-weight-medium is-flex is-align-items-center">
        <b-icon icon="account-group-outline"></b-icon>
        <h6 class="is-size-6 has-text-weight-semibold px-3">Active Employees</h6>
      </h6>
      <b-button size="is-small" icon-right="refresh" />
    </header>

    <div
      class="has-background-light is-flex
      is-justify-content-space-between
      is-align-items-start px-3 pt-5"
    >
      <div class="buttons has-addons">
        <button class="button">Present</button>
        <button class="button">Absent</button>
        <button class="button">On Leave</button>
      </div>
      <b-input
        placeholder="Search..."
        type="search"
        icon="magnify"
      ></b-input>
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
      <b-table-column field="id" width="40">
        <figure class="image is-24x24">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/24x24.png">
        </figure>
      </b-table-column>

      <b-table-column
        v-slot="props" field="name"
        label="Name"
        sortable
      >
        {{ props.row.name }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="position"
        label="Position"
        sortable
      >
        {{ props.row.position }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="department"
        label="Department"
        sortable
      >
        {{ props.row.department }}
      </b-table-column>

      <b-table-column
        v-slot="props" field="status"
        label="Status"
        sortable
      >
        <b-tag type="is-info">{{ props.row.status }}</b-tag>
      </b-table-column>

      <b-table-column field="option">
          <b-button size="is-small" type="is-primary" icon-right="eye" />
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
    employees: {
      type: Array,
    },
  },

  data () {
    return {
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
    };
  },
};
</script>
