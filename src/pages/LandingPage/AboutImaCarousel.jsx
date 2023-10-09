import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { createStyles, rem, Box } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    parentBox : {
        //paddingLeft:'120px',

      //  backgroundColor:'pink',
        [theme.fn.smallerThan('sm')]: {
           // paddingLeft:'0px'
          },
    },

    image1: {
      position: 'relative',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
     

    },
  
    image2: {
      position: 'relative',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    
    },
  
    image3: {
      position: 'relative',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    image4: {
      position: 'relative',
      backgroundImage:
        'url(https://plus.unsplash.com/premium_photo-1661292033733-17272453224b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    image5: {
      position: 'relative',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  
 
  }));
  

export default function AboutImaCarousel() {
    const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 2000 }));



  return (
    
    <Box className={classes.parentBox} style={{backgroundColor:'pink'}}>
    <Carousel
      //maw={450}
     // mx="auto"
      withIndicators
      height={350}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide  className={classes.image1}></Carousel.Slide>
      <Carousel.Slide className={classes.image2}></Carousel.Slide>
      <Carousel.Slide className={classes.image3}></Carousel.Slide>
      <Carousel.Slide className={classes.image4}></Carousel.Slide>
      <Carousel.Slide className={classes.image5}></Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
    </Box>
  );
}