import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mantine/core';

const RegisteredBusinessDonutBO = () => {
  const [state, setState] = useState({
    series: [70, 15 ,15],
    options: {
      labels: ['Total Businesses', 'Subscribed Businesses', 'Unsubscribed Businesses'],
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
    <Box mt={20} maw={500}>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="donut" />
      </div>
    </Box>
    
  );
};

export default RegisteredBusinessDonutBO;
