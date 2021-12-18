<template>
  <div>
    <canvas id="payroll-mini-chart" height="180"></canvas>
    <div class="mt-5 has-text-centered">
      <h5 class="is-size-5 has-text-grey">Total</h5>
      <h2 class="is-size-2 has-text-weight-semibold">2,230,000.00</h2>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { payrollMiniChartData } from '@/utilities/payroll-chart-data.js';

export default {
  data () {
    return {
      payrollMiniChartData,
    };
  },

  mounted () {
    const ctx = document.getElementById('payroll-mini-chart');
    return new Chart(ctx, this.payrollMiniChartData);
  },
};
</script>
