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
const ProfitChartBO = () => {
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
    <Title className={classes.inputField} order={4}>Profit</Title>
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

export default ProfitChartBO

