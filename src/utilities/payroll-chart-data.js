let delayed;

const payrollChartData = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2021 Monthly Payroll",
        type: "line",
        data: [200000000, 340000000, 2300000000, 2000000000, 790000000, 820000000, 270000000, 140000000, 500000000],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#2e323a",
        borderWidth: 3
      },
      {
        label: "2020 Monthly Payroll",
        type: "bar",
        data: [330000000, 550000000, 3300000000, 2400000000, 1200000000, 1240000000, 1000000000, 510000000, 700000000],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#63c9bc",
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Payroll Cost'
      }
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  }
};

const payrollMiniChartData = {
  type: "doughnut",
  data: {
    labels: ["Sales", "Marketing", "Account", "IT", "Gen. & Admin."],
    datasets: [
      {
        label: "2021 Monthly Payroll",
        data: [2000000, 3400000, 1300000, 4000100],
        backgroundColor: ["#63c9bc","#52a2ec","#f5cd54","#ee9e3d"],
        borderColor: "#fff",
        borderWidth: 5
      },
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Latest Payroll Total'
      }
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  }
};

const payrollWidgetChartData1 = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "2021 Monthly Payroll",
        type: "bar",
        data: [200000, 310000, 230000],
        backgroundColor: "#ee9e3d",
        borderColor: "#fff",
        borderWidth: 3
      },
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '1st Quarter'
      }
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  }
};

const payrollWidgetChartData2 = {
  type: "bar",
  data: {
    labels: ["Apr", "May", "Jun"],
    datasets: [
      {
        label: "2021 Monthly Payroll",
        type: "bar",
        data: [220000, 110000, 134000],
        backgroundColor: "#52a2ec",
        borderColor: "#fff",
        borderWidth: 3
      },
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '2nd Quarter'
      }
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  }
};

const payrollWidgetChartData3 = {
  type: "bar",
  data: {
    labels: ["July", "Aug", "Sept"],
    datasets: [
      {
        label: "2021 Monthly Payroll",
        type: "bar",
        data: [240000, 325000, 515000],
        backgroundColor: "#63c9bc",
        borderColor: "#fff",
        borderWidth: 3
      },
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '3rd Quarter'
      }
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  }
};
  
export { 
  payrollChartData, 
  payrollMiniChartData, 
  payrollWidgetChartData1,
  payrollWidgetChartData2,
  payrollWidgetChartData3,
};