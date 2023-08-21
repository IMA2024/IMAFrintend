import React from 'react'
import { Grid, Box, Text, createStyles, } from '@mantine/core';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
    container: {
    display: 'flex',
    width:'100%',
    

    [theme.fn.smallerThan('sm')]: {
        gap: '40px',
        //rowGap: '40px'

      },

    },
    containerChild: {
      borderRadius: theme.radius.md, 
      backgroundImage: theme.fn.gradient({ from: 'red.9', to: 'dark.4', deg: 100 }),
      color: 'white',
    },

    title: {
        color: theme.white,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: theme.fontSizes.sm,
      },
    numbers: {
      display:'flex',
      justifyContent:'center',
    }
  }));
  

export default function TotalRevenueBlocks() {
    const { classes } = useStyles();
    const [Users, setUsers] = useState();
    const [marketingAgents, setMarketingAgents] = useState(); 
    const [owners, setOwners] = useState(); 


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/totalUsers');
          const newData = await response.json();
          console.log(response);
          setUsers(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/totalMarketingAgents');
          const newData = await response.json();
          console.log(response);
          setMarketingAgents(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/totalBusinessOwners');
          const newData = await response.json();
          console.log(response);
          setOwners(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <Box mt={20}>
    <Grid  className={classes.container}  gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
      <Grid.Col  span={4}><Box className={classes.containerChild} p={20} miw={150} maw={280}>
      <Box><Text fw={'bold'}>{Users}</Text></Box>
        <Box><Text className={classes.title}>Total Users</Text></Box>
        </Box></Grid.Col>
        <Grid.Col span={4}><Box className={classes.containerChild}  p={20} miw={150}  maw={280}>
        <Box><Text fw={'bold'}>{marketingAgents}</Text></Box>
        <Box><Text className={classes.title}>Marketing Agents</Text></Box>
        </Box></Grid.Col>
        <Grid.Col span={4}><Box className={classes.containerChild}  p={20} miw={150} maw={280}>
      <Box><Text fw={'bold'}>{owners}</Text></Box>
        <Box><Text className={classes.title}>Business Owners</Text></Box>
        </Box></Grid.Col>
    </Grid>
    </Box>
  );
}