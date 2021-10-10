<template>
<div>
    <canvas id="payroll-chart" height="200"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js/auto';
import { payrollChartData } from '@/utilities/payroll-chart-data.js';

export default {
  data() {
    return {
      payrollChartData
    }
  },
  
  mounted() {
    const ctx = document.getElementById('payroll-chart');
    new Chart(ctx, this.payrollChartData);
  }
}
</script>