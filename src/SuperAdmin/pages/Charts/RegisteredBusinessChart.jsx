import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Title, Paper, createStyles, Select } from '@mantine/core';
import RegisteredBusinessDonutSA from './RegisteredBusinessDonutSA';

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
  },
  responsiveContainerChart: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },
  inputFieldChart: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

const RegisteredBusinessChart = () => {
  const { classes } = useStyles();

  const [state, setState] = useState({
    selectedInterval: 'Weekly',
    options: {
      chart: {
        height: 350,
        type: 'area',
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
          '2023-09-19',
          '2023-08-17',
          '2023-08-9',
          '2023-08-1',
          '2023-09-27',
          '2023-08-27',
          '2023-08-11',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
        },
      },
    },
    series: getSeriesData('Weekly'),
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
            name: 'Subscribed Businesses',
            data: [3, 2, 2, 3, 3, 5, 4], // Adjusted weekly data
          },
          {
            name: 'Unsubscribed Businesses',
            data: [1, 3, 2, 2, 2, 3, 2], // Adjusted weekly data
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'Subscribed Businesses',
            data: [7, 6, 5, 8, 7, 10, 9], // Adjusted monthly data
          },
          {
            name: 'Unsubscribed Businesses',
            data: [3, 7, 6, 5, 6, 8, 7], // Adjusted monthly data
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'Subscribed Businesses',
            data: [12, 11, 10, 14, 13, 15, 17], // Adjusted yearly data
          },
          {
            name: 'Unsubscribed Businesses',
            data: [5, 9, 8, 11, 10, 12, 11], // Adjusted yearly data
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
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2023-06-11',
          '2023-07-03',
          '2023-08-03',
          '2023-09-15',
          '2023-10-16',
          '2023-11-19',
          '2023-12-27',
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
          Businesses Registered
        </Title>
        <Select
          className={classes.inputField}
          value={state.selectedInterval}
          onChange={(value) => handleIntervalChange(value)}
          searchable
          data={['Weekly', 'Monthly', 'Yearly']}
        />
      </Box>
      <Box p={20} style={{ border: '1px dotted gray' }} className={classes.responsiveContainerChart}>
        <Box className={classes.inputFieldChart}>
          <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </Box>
        <Box className={classes.inputFieldChart}>
          <RegisteredBusinessDonutSA />
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisteredBusinessChart;


