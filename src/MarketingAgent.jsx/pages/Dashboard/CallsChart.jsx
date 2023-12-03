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

const CallsChart = () => {
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
            name: 'Successful calls',
            data: [3, 4, 7, 9, 10, 11, 12],
          },
          {
            name: 'Unsuccessful calls',
            data: [1, 1, 5, 6, 9, 10, 11],
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'Successful calls',
            data: [7, 9, 12, 13, 11, 15, 20],
          },
          {
            name: 'Unsuccessful calls',
            data: [5, 7, 10, 9, 8, 14, 15],
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'Successful calls',
            data: [10, 19, 29, 37 ,47, 44, 50],
          },
          {
            name: 'Unsuccessful calls',
            data: [8, 17, 25, 35 ,42, 39, 40],
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
          Calls
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

export default CallsChart;


