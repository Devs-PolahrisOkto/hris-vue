<template>
<div class="card p-5">
    <canvas id="payroll-widget3-chart" height="250"></canvas>
    <div class="pt-2">
        <h6 class="is-size-7 has-text-grey">July 2021</h6>
        <h3 class="is-size-3 has-text-weight-semibold">240,000.00</h3>
    </div>
    <div class="pt-2">
        <h6 class="is-size-7 has-text-grey">August 2021</h6>
        <h3 class="is-size-3 has-text-weight-semibold">325,000.00</h3>
    </div>
    <div class="pt-2">
        <h6 class="is-size-7 has-text-grey">September 2021</h6>
        <h3 class="is-size-3 has-text-weight-semibold">515,000.00</h3>
    </div>
</div>
</template>

<script>
import Chart from 'chart.js/auto';
import { payrollWidgetChartData3 } from '@/utilities/payroll-chart-data.js';

export default {
  data () {
    return {
      payrollWidgetChartData3,
    };
  },

  mounted () {
    const ctx = document.getElementById('payroll-widget3-chart');
    return new Chart(ctx, this.payrollWidgetChartData3);
  },
};
</script>
