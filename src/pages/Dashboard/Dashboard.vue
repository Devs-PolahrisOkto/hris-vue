<template>
<main-layout>

<!-- Start Breadcrumb -->
<nav class="breadcrumb px-5" aria-label="breadcrumbs">
  <ul class="px-3 pt-3">
    <li><a href="#">Admin</a></li>
    <li class="is-active"><a href="#" aria-current="page">Dashboard</a></li>
  </ul>
</nav>
<!-- End Breadcrumb -->

<!-- Start Active User -->
<section class="hero is-primary">
  <div class="hero-body is-flex is-align-items-center is-justify-content-space-between">
    <div class="is-flex is-align-items-center">
        <figure class="image is-128x128 mx-4">
            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <div>
            <h3 class="is-size-3 has-text-weight-bold">John Doe</h3>
            <h5 class="is-size-5 has-text-weight-light">
                Last login <span class="has-text-weight-semibold">
                12 mins ago</span> from
                <span class="has-text-weight-semibold">192.168.1.1</span>
            </h5>
            <h6 class="is-size-6 has-text-weight-light">
                You have <span class="has-text-weight-semibold">4 unread notifications</span> today.
            </h6>
        </div>
    </div>
    <b-button icon-left="account" type="is-light">
        Manage Profile
    </b-button>
  </div>
</section>
<!-- End Active User -->

<!-- Start Simple Widgets -->
<div class="container is-fluid my-5">
    <div class="columns is-flex is-flex-wrap-wrap is-justify-content-center">
        <template v-for="(widget, index) in widgets">
            <div :key="index" class="column is-3-desktop is-6-tablet is-12-mobile">
                <simple-widget :data="widget"></simple-widget>
            </div>
        </template>
    </div>
</div>
<!-- End Simple Widgets -->

<!-- Start Payroll Chart -->
<div class="container is-fluid my-5">
    <div class="card">
        <header class="is-flex is-justify-content-space-between is-align-items-center py-2 px-3">
            <h6 class="has-text-weight-medium is-flex is-align-items-center">
                <b-icon icon="chart-box-outline"></b-icon>
                <h6 class="is-size-6 has-text-weight-semibold px-3">Payroll</h6>
            </h6>
            <b-button size="is-small" icon-right="refresh" />
        </header>
        <div class="py-4 px-5">
            <div class="columns is-flex is-flex-wrap-wrap">
                <div class="column is-8-desktop is-12-tablet is-12-mobile">
                    <payroll-chart></payroll-chart>
                </div>
                <div class="column is-4-desktop is-12-tablet is-12-mobile">
                    <payroll-mini-chart></payroll-mini-chart>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Payroll Chart -->

<!-- Start Chart Widgets -->
<div class="container is-fluid my-5">
    <div class="columns is-flex is-flex-wrap-wrap is-justify-content-center">
        <div class="column is-4-desktop is-6-tablet is-12-mobile">
            <chart-widget-1></chart-widget-1>
        </div>
        <div class="column is-4-desktop is-6-tablet is-12-mobile">
            <chart-widget-2></chart-widget-2>
        </div>
        <div class="column is-4-desktop is-6-tablet is-12-mobile">
            <chart-widget-3></chart-widget-3>
        </div>
    </div>
</div>
<!-- End Chart Widgets -->

<!-- Start Active Employees -->
<div class="container is-fluid my-5">
    <active-employees :employees="employees"></active-employees>
</div>
<!-- End Active Employees -->

</main-layout>
</template>

<script>

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SimpleWidget: () => import('@/components/Dashboard/Widgets/SimpleWidget.vue'),
    ChartWidget1: () => import('@/components/Dashboard/Widgets/ChartWidget1.vue'),
    ChartWidget2: () => import('@/components/Dashboard/Widgets/ChartWidget2.vue'),
    ChartWidget3: () => import('@/components/Dashboard/Widgets/ChartWidget3.vue'),
    PayrollChart: () => import('@/components/Dashboard/Charts/PayrollChart.vue'),
    PayrollMiniChart: () => import('@/components/Dashboard/Charts/PayrollMiniChart.vue'),
    ActiveEmployees: () => import('@/components/Dashboard/Tables/ActiveEmployees.vue'),
  },

  data () {
    return {
      employees: [
        {
          id: 1, name: 'Jesse Simmons', position: 'IT Staff', department: 'IT Department', status: 'Working',
        },
        {
          id: 2, name: 'John Jacobs', position: 'Accounting Staff', department: 'Accounting Department', status: 'Lunch Break',
        },
        {
          id: 3, name: 'Tina Gilbert', position: 'Tax Specialist', department: 'Accounting Department', status: 'Working',
        },
        {
          id: 4, name: 'Clarence Flores', position: 'Accounts Payable', department: 'Accounting Department', status: 'Working',
        },
        {
          id: 5, name: 'Anne Lee', position: 'Sales Staff', department: 'Sales Department', status: 'Early Out',
        },
        {
          id: 6, name: 'Bill Gates', position: 'IT Programmer', department: 'IT Department', status: 'Working',
        },
        {
          id: 7, name: 'Elon Musk', position: 'Software Engineer', department: 'IT Department', status: 'Working',
        },
        {
          id: 8, name: 'Steve Jobs', position: 'Sales Specialist', department: 'Sales Department', status: 'Working',
        },
        {
          id: 9, name: 'Warren Buffett', position: 'Accountant', department: 'Accounting Department', status: 'Lunch Break',
        },
        {
          id: 10, name: 'Jeff Bezos', position: 'Sales Manager', department: 'Sales Department', status: 'Working',
        },
      ],
      widgets: [
        {
          notification: '2 new employees', title: 'Employees', total: '200', icon: 'account-group',
        },
        {
          notification: '12 employees absent', title: 'Attendance', total: '188', icon: 'calendar-clock',
        },
        {
          notification: '3 completed reports', title: 'Reports', total: '10', icon: 'file-chart',
        },
        {
          notification: '2 payroll on hold', title: 'Payroll', total: '198', icon: 'cash-multiple',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.hero-body {
    padding: 2rem 1.5rem;
}

/deep/ .table td,
/deep/ .table th {
    border: none;
}

/deep/ .pagination {
    padding-bottom: 10px;
    padding-right: 10px;
}
</style>
