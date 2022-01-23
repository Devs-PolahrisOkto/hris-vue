export default {
  employeeList: [
    'John Doe Smith',
    'Jane Doe Smith',
    'John Smith',
    'James Smith',
    'James Harden',
    'Kevin Durant',
    'Lebron James',
    'Stephen Curry',
  ],
  selectedEmployee: {},
  table: {
    columns: [
      {
        title: 'Application Code', field: 'applicationCode', visible: true, centered: false, sortable: true, custom: false,
      },
      {
        title: 'Application No.', field: 'applicationNo', visible: true, centered: false, sortable: true, custom: false,
      },
      {
        title: 'Application Date', field: 'applicationDate', visible: true, centered: true, sortable: true, custom: false,
      },
      {
        title: 'Employee', field: 'employee', visible: true, centered: false, sortable: true, custom: false,
      },
      {
        title: 'Approval Status', field: 'approved', visible: true, centered: true, sortable: true, custom: true,
      },
      {
        title: 'Status', field: 'active', visible: true, centered: true, sortable: true, custom: true,
      },
    ],
    list: [
      {
        id: 1,
        applicationCode: 'WS001',
        applicationNo: '1',
        applicationDate: '01-22-2022',
        employee: 'John Doe Smith',
        approved: true,
        active: true,
      },
      {
        id: 2,
        applicationCode: 'WS002',
        applicationNo: '2',
        applicationDate: '01-22-2022',
        employee: 'Jane Doe Smith',
        approved: false,
        active: true,
      },
      {
        id: 3,
        applicationCode: 'WS003',
        applicationNo: '3',
        applicationDate: '01-22-2022',
        employee: 'John Smith',
        approved: false,
        active: true,
      },
      {
        id: 4,
        applicationCode: 'WS004',
        applicationNo: '4',
        applicationDate: '01-23-2022',
        employee: 'James Smith',
        approved: false,
        active: false,
      },
      {
        id: 5,
        applicationCode: 'WS005',
        applicationNo: '5',
        applicationDate: '01-23-2022',
        employee: 'James Harden',
        approved: true,
        active: true,
      },
      {
        id: 6,
        applicationCode: 'WS006',
        applicationNo: '6',
        applicationDate: '01-23-2022',
        employee: 'Kevin Durant',
        approved: true,
        active: true,
      },
      {
        id: 7,
        applicationCode: 'WS007',
        applicationNo: '7',
        applicationDate: '01-23-2022',
        employee: 'Lebron James',
        approved: false,
        active: false,
      },
      {
        id: 8,
        applicationCode: 'WS008',
        applicationNo: '8',
        applicationDate: '01-23-2022',
        employee: 'Stephen Curry',
        approved: false,
        active: true,
      },
    ],
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
  addWorkShift: {
    columns: [
      {
        title: 'Date', field: 'date', visible: true, centered: true, sortable: false, custom: false,
      },
      {
        title: 'Time In & Time Out', field: 'timeIn', visible: true, centered: true, sortable: false, custom: true,
      },
      {
        title: 'Morning Break Time', field: 'morningBreak', visible: true, centered: true, sortable: false, custom: true,
      },
      {
        title: 'Lunch Break Time', field: 'lunchBreak', visible: true, centered: true, sortable: false, custom: true,
      },
      {
        title: 'Afternoon Break Time', field: 'afternoonBreak', visible: true, centered: true, sortable: false, custom: true,
      },
    ],
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
};
