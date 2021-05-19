<template>
<div class="card p-5">
    <canvas id="payroll-widget2-chart" height="250"></canvas>
    <div class="pt-2">
        <h6 class="is-size-7 has-text-grey">April 2021</h6>
        <h3 class="is-size-3 has-text-weight-semibold">220,000.00</h3>
    </div>
    <div class="pt-2">
        <h6 class="is-size-7 has-text-grey">May 2021</h6>
        <h3 class="is-size-3 has-text-weight-semibold">110,000.00</h3>
    </div>
    <div class="pt-2">
        <h6 class="is-size-7 has-text-grey">June 2021</h6>
        <h3 class="is-size-3 has-text-weight-semibold">134,000.00</h3>
    </div>
</div>
</template>

<script>
import Chart from 'chart.js/auto';
import { payrollWidgetChartData2 } from '@/utilities/payroll-chart-data.js';

export default {
  data() {
    return {
      payrollWidgetChartData2
    }
  },
  
  mounted() {
    const ctx = document.getElementById('payroll-widget2-chart');
    new Chart(ctx, this.payrollWidgetChartData2);
  }
}
</script>