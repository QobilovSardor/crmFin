// try {
// const chart01 = () => {
//   const data = [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112];
//   const barColors = data.map((_, index) => (index === 0 ? "#407BFF" : "#DEE3F3"));

//   const chartOneOptions = {
//     series: [{
//       name: "Sales",
//       data: data
//     }],
//     colors: barColors,
//     chart: {
//       type: "bar",
//       height: 300,
//       toolbar: { show: false },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "39%",
//         borderRadius: 5,
//         borderRadiusApplication: "end",
//         distributed: true,
//       },
//     },
//     dataLabels: { enabled: false },
//     stroke: {
//       show: true,
//       width: 4,
//       colors: barColors,
//       show: false
//     },
//     grid: {
//       yaxis: { lines: { show: true } }
//     },
//     tooltip: {
//       x: { show: false },
//       y: {
//         formatter: function (val) {
//           return val;
//         }
//       }
//     }
//   };

//   const chartSelector = document.querySelector("#chartOne");
//   if (chartSelector) {
//     const chart = new ApexCharts(chartSelector, chartOneOptions);
//     chart.render();
//   }
// };

// // Sahifa yuklangach chartni chizamiz
// window.addEventListener("DOMContentLoaded", chart01);


document.addEventListener('DOMContentLoaded', () => {
  const chart01 = () => {
    const today = new Date('2025-06-20T19:34:00+05:00'); // Bugungi sana
    const isWeekly = document.querySelector('.weekly').classList.contains('text-blue');
    const range = isWeekly ? 14 : 30;

    // Tasodifiy data generatsiya
    const data = Array(range).fill().map(() => Math.floor(Math.random() * 50));

    // Sana formatlash: weekly – DD.MM, monthly – 1, 2, ...
    const labels = Array.from({ length: range }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (range - 1 - i));
      return isWeekly
        ? `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
        : (i + 1).toString();
    });

    // Bugungi sana formatlangan
    const todayStr = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}`;

    // Ustun ranglari
    const barColors = labels.map(label =>
      isWeekly && label === todayStr ? '#407BFF' : '#DEE3F3'
    );

    const chartOneOptions = {
      series: [{
        name: 'Продажи',
        data: data
      }],
      chart: {
        type: 'bar',
        height: '100%',
        toolbar: { show: false },
        events: {
          mouseWheel: () => false
        }
      },
      colors: barColors,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '39%',
          borderRadius: 5,
          borderRadiusApplication: 'end',
          distributed: true
        }
      },
      dataLabels: { enabled: false },
      stroke: { show: false },
      grid: {
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } }
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 400
          }
        }
      },
      yaxis: {
        max: 60,
        tickAmount: 4,
        labels: {
          formatter: val => {
            const ticks = [0, 10, 40, 60];
            return ticks.includes(val) ? val.toString() : '';
          }
        }
      },
      tooltip: {
        theme: false,
        style: { background: '#407BFF', color: '#fff' },
        marker: { show: false },
        x: {
          formatter: function (_, { dataPointIndex }) {
            return labels[dataPointIndex];
          }
        },
        y: { formatter: val => `Продано: ${val}` }
      },
      responsive: [{
        breakpoint: 640,
        options: {
          chart: { height: '100%' },
          plotOptions: { bar: { columnWidth: '50%' } }
        }
      }]
    };

    const chartSelector = document.querySelector('#chartOne');
    if (chartSelector) {
      let chart = window.chartInstance;
      if (chart) chart.destroy();
      chart = new ApexCharts(chartSelector, chartOneOptions);
      window.chartInstance = chart;
      chart.render();
    }
  };

  // Tugmalar funksiyasi
  document.querySelector('.weekly').addEventListener('click', () => {
    document.querySelector('.weekly').classList.add('text-blue');
    document.querySelector('.monthly').classList.remove('text-blue');
    chart01();
  });

  document.querySelector('.monthly').addEventListener('click', () => {
    document.querySelector('.monthly').classList.add('text-blue');
    document.querySelector('.weekly').classList.remove('text-blue');
    chart01();
  });

  // Dastlab yuklash
  chart01();
});

try {
  const chart02 = () => {
    const data = [60, 40, 10, 0];
    const barColors = data.map((_, index) => (index === 0 ? "#407BFF" : "#DEE3F3"));

    const chartOneOptions = {
      series: [{
        name: "Sales",
        data: []
      }],
      colors: barColors,
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "39%",
          borderRadius: 5,
          borderRadiusApplication: "end",
          distributed: true,
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 4,
        colors: barColors,
        show: false
      },
      grid: {
        yaxis: { lines: { show: true } }
      },
      tooltip: {
        x: { show: false },
        y: {
          formatter: function (val) {
            return val;
          }
        }
      }
    };

    const chartSelector = document.querySelector("#chartTwo");
    if (chartSelector) {
      const chart = new ApexCharts(chartSelector, chartOneOptions);
      chart.render();
    }
  };

  // Sahifa yuklangach chartni chizamiz
  window.addEventListener("DOMContentLoaded", chart02);

} catch (error) {

}
