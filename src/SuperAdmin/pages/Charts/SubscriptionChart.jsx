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
const SubscriptionChart = () => {
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
    <Title className={classes.inputField} order={4}>Subscriptions</Title>
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

export default SubscriptionChart
*/}
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

const SubscriptionChart = () => {
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
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: 'revenue',
            data: [11, 32, 45, 32, 34, 52, 41],
          },
        ];
      case 'Monthly':
        return [
          {
            name: 'subscription',
            data: [120, 150, 100, 200, 180, 220, 250],
          },
          {
            name: 'revenue',
            data: [60, 80, 70, 90, 85, 95, 100],
          },
        ];
      case 'Yearly':
        return [
          {
            name: 'subscription',
            data: [800, 900, 700, 950, 880, 1100, 1050],
          },
          {
            name: 'revenue',
            data: [400, 500, 350, 600, 550, 700, 650],
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
    };
  }

  return (
    <Paper mt={20} shadow="xs" p="md">
      <Box className={classes.responsiveContainer}>
        <Title className={classes.inputField} order={4}>
          Subscriptions
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

export default SubscriptionChart;




