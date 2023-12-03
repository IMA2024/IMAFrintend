import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
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
  },
}));

// SplineAreaCharts
const UserChart = () => {
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
    },
    series: getSeriesData('Weekly'),
  });

  const handleIntervalChange = (selectedInterval) => {
    setState({
      ...state,
      selectedInterval,
      series: getSeriesData(selectedInterval),
    });
  };

  function getSeriesData(interval) {
    switch (interval) {
      case 'Weekly':
        return [
          {
            name: 'Marketing Agents',
            data: [2, 3, 2, 4, 3, 5, 4], // Adjusted weekly data
          },
          {
            name: 'Business Owners',
            data: [1, 3, 4, 3, 3, 4, 3], // Adjusted weekly data
          },
          {
            name: 'Customers',
            data: [1, 1, 2, 1, 3, 3, 4], // Adjusted weekly data
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'Marketing Agents',
            data: [8, 10, 7, 12, 9, 15, 14], // Adjusted monthly data
          },
          {
            name: 'Business Owners',
            data: [3, 9, 12, 10, 12, 15, 14], // Adjusted monthly data
          },
          {
            name: 'Customers',
            data: [2, 2, 4, 7, 5, 6, 7], // Adjusted monthly data
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'Marketing Agents',
            data: [8, 9, 7, 12, 10, 24, 22], // Adjusted yearly data
          },
          {
            name: 'Business Owners',
            data: [2, 8, 11, 9, 11, 19, 17], // Adjusted yearly data
          },
          {
            name: 'Customers',
            data: [1, 2, 5, 2, 9, 5, 7], // Adjusted yearly data
          },
        ];
      default:
        return [];
    }
  }

  return (
    <Paper mt={20} shadow="xs" p="md">
      <Box className={classes.responsiveContainer}>
        <Title className={classes.inputField} order={4}>
          Users Registered
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
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </Box>
    </Paper>
  );
};

export default UserChart;

