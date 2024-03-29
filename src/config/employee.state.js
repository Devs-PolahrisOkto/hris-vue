export default {
  selectedEmployee: {},
  table: {
    loading: false,
    columns: [
      { title: 'Name', field: 'fullname', visible: true },
      { title: 'Position', field: 'primaryPosition', visible: true },
      { title: 'Employment Type', field: 'employmentType', visible: true },
    ],
    list: [],
    meta: {
      isPaginated: true,
      backendPagination: true,
      backendSorting: false,
      isEmpty: false,
      isStriped: false,
      isHoverable: true,
      hasMobileCards: true,
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      defaultSortColumn: 'name',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      current_page: 1,
      per_page: 10,
    },
  },
  import: {
    errors: [],
  },
};
