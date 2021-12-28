import BasicRepresentation from '@/api/representations/BasicRepresentation';

export default {
  table: {
    columns: [
      { title: 'Name', field: 'name', visible: true },
      { title: 'Description', field: 'description', visible: true },
    ],
    list: [],
    meta: {
      isEmpty: false,
      isStriped: false,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: false,
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
  form: new BasicRepresentation(),
};
