import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mantine/core';

const RegisteredBusinessDonutBO = () => {
  const [state, setState] = useState({
    series: [5, 3 , 2],
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
    <Box mt={20} w={480}>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="donut" />
      </div>
    </Box>
    
  );
};

export default RegisteredBusinessDonutBO;
