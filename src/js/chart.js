try {
  const chart01 = () => {
    const data = [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112];
    const barColors = data.map((_, index) => (index === 0 ? "#407BFF" : "#DEE3F3"));

    const chartOneOptions = {
      series: [{
        name: "Sales",
        data: data
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

    const chartSelector = document.querySelector("#chartOne");
    if (chartSelector) {
      const chart = new ApexCharts(chartSelector, chartOneOptions);
      chart.render();
    }
  };

  // Sahifa yuklangach chartni chizamiz
  window.addEventListener("DOMContentLoaded", chart01);

} catch (error) {

}

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
