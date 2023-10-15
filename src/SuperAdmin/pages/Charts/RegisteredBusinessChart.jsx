{/*
import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { Box, Title, Paper, createStyles, Select  } from '@mantine/core';
import RegisteredBusinessDonutSA from './RegisteredBusinessDonutSA';

const useStyles = createStyles((theme) => ({

  responsiveContainer: {
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   gap: '50%',
   marginBottom: '2%',
   //backgroundColor:'green',
   
   [theme.fn.smallerThan('sm')]: {
     flexDirection: 'column'
   },
 
  },
 
  inputField: {
   width: '50%',
   [theme.fn.smallerThan('sm')]: {
     width: '40%'
   },
  },

  responsiveContainerChart: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',

    [theme.fn.smallerThan('sm')]: {
        flexDirection: 'column'
      },
  },

  inputFieldChart: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%'
    },
   },
   
 }));

 //SplineAreaCharts
const RegisteredBusinessChart = () => {
  const {classes} = useStyles()
    const [state, setState] =  useState({
        series: [{
            name: 'series1',
            data: [110, 60, 48, 71, 62, 129, 120]
          }, {
            name: 'series2',
            data: [41, 110, 65, 52, 54, 72, 61]
          }],
          options: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'datetime',
              categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
    });

  
  return (
    <Paper mt={20} shadow="xs" p="md">
      <Box className={classes.responsiveContainer}>
    <Title className={classes.inputField} order={4}>Businesses Registered</Title>
      <Select
      className={classes.inputField}
      defaultValue={'Weekly'}
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
 

  )
}

export default RegisteredBusinessChart
*/}
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
        type: 'datetime',
        categories: [
          '2023-09-19T00:00:00.000Z',
          '2023-09-19T01:30:00.000Z',
          '2023-09-19T02:30:00.000Z',
          '2023-09-19T03:30:00.000Z',
          '2023-09-19T04:30:00.000Z',
          '2023-09-19T05:30:00.000Z',
          '2023-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
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
            data: [110, 60, 48, 71, 62, 129, 120],
          },
          {
            name: 'Unsubscribed Businesses',
            data: [41, 110, 65, 52, 54, 72, 61],
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'Subscribed Businesses',
            data: [400, 300, 250, 400, 350, 600, 550],
          },
          {
            name: 'Unsubscribed Businesses',
            data: [150, 350, 300, 250, 300, 500, 450],
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'Subscribed Businesses',
            data: [2500, 2200, 2000, 2800, 2700, 3000, 2900],
          },
          {
            name: 'Unsubscribed Businesses',
            data: [1000, 1900, 1600, 2200, 2100, 2400, 2300],
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
          '2023-09-19T00:00:00.000Z',
          '2023-09-19T01:30:00.000Z',
          '2023-09-19T02:30:00.000Z',
          '2023-09-19T03:30:00.000Z',
          '2023-09-19T04:30:00.000Z',
          '2023-09-19T05:30:00.000Z',
          '2023-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
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


