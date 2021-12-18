<template>
  <div class="card p-5">
    <canvas id="payroll-widget1-chart" height="250"></canvas>
    <div class="pt-2">
      <h6 class="is-size-7 has-text-grey">January 2021</h6>
      <h3 class="is-size-3 has-text-weight-semibold">200,000.00</h3>
    </div>
    <div class="pt-2">
      <h6 class="is-size-7 has-text-grey">February 2021</h6>
      <h3 class="is-size-3 has-text-weight-semibold">310,000.00</h3>
    </div>
    <div class="pt-2">
      <h6 class="is-size-7 has-text-grey">March 2021</h6>
      <h3 class="is-size-3 has-text-weight-semibold">230,000.00</h3>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { payrollWidgetChartData1 } from '@/utilities/payroll-chart-data.js';

export default {
  data () {
    return {
      payrollWidgetChartData1,
    };
  },

  mounted () {
    const ctx = document.getElementById('payroll-widget1-chart');
    return new Chart(ctx, this.payrollWidgetChartData1);
  },
};
</script>
