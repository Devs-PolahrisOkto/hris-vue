export default {
  employees: [],
  selectedEmployee: {},
  table: {
    columns: [
      { title: 'Name', field: 'employeeName', visible: true },
      { title: 'Position', field: 'positionName', visible: true },
      { title: 'Employment Type', field: 'employmentTypeName', visible: true },
    ],
    list: [],
    meta: {
      isEmpty: false,
      isStriped: false,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: true,
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      defaultSortColumn: 'name',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,
    },
  },
};
