import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Title, Paper, createStyles, Select } from '@mantine/core';
import RegisteredBusinessDonutBO from './RegisteredBusinessDonut';

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

const RegisteredBusinessChartBO = () => {
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
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
          '2023-09-19',
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
            data: [2, 1, 1, 2, 5, 3, 2], // Adjusted weekly data
          },
          {
            name: 'Unsubscribed Businesses',
            data: [1, 2, 1, 1, 1, 2, 1], // Adjusted weekly data
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'Subscribed Businesses',
            data: [5, 4, 3, 6, 5, 7, 6], // Adjusted monthly data
          },
          {
            name: 'Unsubscribed Businesses',
            data: [2, 5, 4, 3, 4, 5, 4], // Adjusted monthly data
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'Subscribed Businesses',
            data: [11, 10, 9, 12, 11, 13, 15], // Adjusted yearly data
          },
          {
            name: 'Unsubscribed Businesses',
            data: [5, 8, 7, 10, 9, 11, 10], // Adjusted yearly data
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
          <RegisteredBusinessDonutBO />
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisteredBusinessChartBO;

