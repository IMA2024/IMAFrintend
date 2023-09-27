import React from 'react'
import { createStyles, rem, Box } from '@mantine/core';
import AboutImaCarousel from './AboutImaCarousel';
import AboutImaDetails from './AboutImaDetails';

const useStyles = createStyles((theme) => ({
    responsiveContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '120px',
      
    
        [theme.fn.smallerThan('sm')]: {
          flexDirection: 'column'
        },
    
      },
    
      innerContainer: {
        width: '50%',
        [theme.fn.smallerThan('sm')]: {
          width: '100%'
        },
      }
    
  
 
  }));

const AboutIma = () => {
    const { classes } = useStyles();
  return (
    <Box className={classes.responsiveContainer} pt={50} pb={50} pl={30} pr={30}>
        <Box className={classes.innerContainer}><AboutImaDetails/></Box>
        <Box className={classes.innerContainer}><AboutImaCarousel/></Box>
    </Box>
  )
}

export default AboutIma