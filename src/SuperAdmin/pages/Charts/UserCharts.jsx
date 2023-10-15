{/*
import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { Box, Title, Paper, createStyles, Select  } from '@mantine/core';

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
  }
   
 }));

 //SplineAreaCharts
const UserChart = () => {
  const {classes} = useStyles()
    const [state, setState] =  useState({
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42 , 109, 100]
          }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
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
    <Title className={classes.inputField} order={4}>Users Registered</Title>
      <Select
      className={classes.inputField}
      defaultValue={'Weekly'}
      searchable
      data={['Weekly', 'Monthly', 'Yearly']}
    />
    </Box>
    <Box p={20} style={{ border: '1px dotted gray' }}>
    <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
    </Box>
    </Paper>
 

  )
}

export default UserChart
*/}
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
    });
  };

  function getSeriesData(interval) {
    switch (interval) {
      case 'Weekly':
        return [
          {
            name: 'Marketing Agents',
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: 'Business Owners',
            data: [11, 32, 45, 32, 34, 52, 41],
          },
          {
            name: 'Customers',
            data: [1, 2, 5, 2, 9, 11, 15],
          },
        
        ];
      case 'Monthly':
        return [
          {
            name: 'Marketing Agents',
            data: [90, 120, 85, 150, 110, 220, 200],
          },
          {
            name: 'Business Owners',
            data: [30, 90, 120, 100, 120, 180, 160],
          },
          {
            name: 'Customers',
            data: [7, 9, 15, 25, 19, 21, 25],
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'Marketing Agents',
            data: [800, 950, 720, 1200, 1050, 2400, 2200],
          },
          {
            name: 'Business Owners',
            data: [250, 800, 1100, 900, 1100, 1900, 1700],
          },
          {
            name: 'Customers',
            data: [111, 222, 534, 264, 912, 533, 777],
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

