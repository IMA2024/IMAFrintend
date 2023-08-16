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
const SubscriptionPaymentChart = () => {
  const {classes} = useStyles()
    const [state, setState] =  useState({
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
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
    <Title className={classes.inputField} order={4}>Subscription Payments</Title>
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

export default SubscriptionPaymentChart

