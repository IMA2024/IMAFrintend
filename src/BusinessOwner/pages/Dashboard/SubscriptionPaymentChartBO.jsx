import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Box, Title, Paper, createStyles, Select } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  responsiveContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '50%',
    marginBottom: '2%',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
  inputField: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '40%',
    },
  }
}));

const SubscriptionPaymentChartBO = () => {
  const { classes } = useStyles();
  const [state, setState] = useState({
    selectedInterval: 'Weekly',
    series: getSeriesData('Weekly'),
    options: getOptions(),
  });

  const handleIntervalChange = (selectedInterval) => {
    setState({
      ...state,
      selectedInterval,
      series: getSeriesData(selectedInterval),
      options: getOptions(selectedInterval),
    });
  };

  function getSeriesData(interval) {
    switch (interval) {
      case 'Weekly':
        return [
          {
            name: 'subscription',
            data: [2, 3, 5, 7, 8, 9, 10], // Adjusted weekly data
          },
          {
            name: 'payment',
            data: [2, 3, 5, 7, 8, 9, 10], // Adjusted weekly data
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'subscription',
            data: [5, 7, 10, 11, 9, 12, 17], // Adjusted monthly data
          },
          {
            name: 'payment',
            data: [5, 7, 10, 11, 9, 12, 17], // Adjusted monthly data
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'subscription',
            data: [8, 15, 25, 33 ,42, 52, 62], // Adjusted yearly data
          },
          {
            name: 'payment',
            data: [8, 15, 25, 33 ,42, 52, 62], // Adjusted yearly data
          },
        ];
      default:
        return [];
    }
  }
  

  function getOptions(interval) {
    return {
      chart: {
        height: 350,
        type: interval === 'Yearly' ? 'bar' : 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'monthyear',
        categories: [
          '2023-06-3',
          '2023-07-8',
          '2023-08-1',
          '2023-09-5',
          '2023-10-9',
          '2023-11-10',
          '2023-12-11',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
      },
    };
  }

  return (
    <Paper mt={20} shadow="xs" p="md">
      <Box className={classes.responsiveContainer}>
        <Title className={classes.inputField} order={4}>
          Subscription Payments
        </Title>
        <Select
          className={classes.inputField}
          value={state.selectedInterval}
          onChange={(value) => handleIntervalChange(value)}
          searchable
          data={['Weekly', 'Monthly', 'Yearly']}
        />
      </Box>
      <Box p={20} style={{ border: '1px dotted gray' }}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type={state.options.chart.type}
          height={350}
        />
      </Box>
    </Paper>
  );
};

export default SubscriptionPaymentChartBO;