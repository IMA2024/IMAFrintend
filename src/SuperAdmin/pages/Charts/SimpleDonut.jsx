import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mantine/core';

const SimpleDonut = () => {
  const [state, setState] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <Box maw={500}>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="donut" />
      </div>
    </Box>
  );
};

export default SimpleDonut;
