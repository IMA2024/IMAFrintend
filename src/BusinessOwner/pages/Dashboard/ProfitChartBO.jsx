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
    //backgroundColor:'green',

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

const ProfitChartBO = () => {
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
            name: 'expense',
            data: [50, 120, 75, 62, 64, 82, 71], // Adjusted weekly data
          },
          {
            name: 'revenue',
            data: [90, 170, 90, 80, 78, 119, 110], // Adjusted weekly data
          },
          {
            name: 'profit',
            data: [30, 70, 37, 41, 32, 63, 59], // Adjusted weekly data
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'expense',
            data: [200, 380, 330, 180, 230, 430, 480], // Adjusted weekly data
          },
          {
            name: 'revenue',
            data: [380, 480, 430, 380, 330, 580, 530], // Adjusted monthly data
          },
          {
            name: 'profit',
            data: [150, 100, 100, 150, 50, 100, 100], // Adjusted monthly data
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'expense',
            data: [1200, 2100, 1800, 2400, 2300, 2600, 2500], // Adjusted yearly data
          },
          {
            name: 'revenue',
            data: [2400, 2200, 1900, 2600, 2500, 2800, 2700], // Adjusted yearly data
          },
          {
            name: 'profit',
            data: [1500, 300, 400, 600, 600, 600, 600], // Adjusted yearly data
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
        curve: interval === 'Yearly' ? 'smooth' : 'straight',
      },
      xaxis: {
        type: 'datetime',
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
          Profit
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
        <ReactApexChart options={state.options} series={state.series} type={state.options.chart.type} height={350} />
      </Box>
    </Paper>
  );
};

export default ProfitChartBO;