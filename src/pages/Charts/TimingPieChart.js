// ref for my charts: https://www.chartjs.org/docs/latest/getting-started/
// imports
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";


// color pie charts
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const TimingPieChart = ({ data, options, type }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(chartCtx, {
      type: type,
      data: data,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options, type]);
// return random colored data in pie charts !!!!!
  return <canvas id="myChart" ref={chartRef} backgroundColor={getRandomColor()}/>;
};

export default TimingPieChart;
