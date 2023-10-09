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

    image: {
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%', // Make sure each image takes the full height of the container
    },

    image1: {
      position: 'relative',
      backgroundImage:
      'url(https://static.vecteezy.com/system/resources/previews/012/961/371/original/concept-for-digital-marketing-agency-digital-media-campaign-flat-illustration-vector.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
     

    },
  
    image2: {
      position: 'relative',
      backgroundImage:
        'url(https://img.freepik.com/free-vector/marketing-consulting-concept-illustration_114360-9027.jpg?w=826&t=st=1696798587~exp=1696799187~hmac=1e1d73561e542e61b9d3563b258bceb3b6d9cbb158b033b0fb4134f80b08e78b)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    
    },
  
    image3: {
      position: 'relative',
      backgroundImage:
        'url(https://img.freepik.com/free-vector/digital-marketing-concept_1284-7077.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    image4: {
      position: 'relative',
      backgroundImage:
        'url(https://www.cloudways.com/blog/wp-content/uploads/Digital-Marketing-Agencies.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    image5: {
      position: 'relative',
      backgroundImage:
        'url(https://tecnosoluciones.com/wp-content/uploads/2020/02/Agencia-de-Marketing-Digital.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  
 
  }));
  

export default function CarouselProfiling() {
    const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 2000 }));



  return (
    
    <Box className={classes.parentBox} style={{backgroundColor:'pink',borderRadius:'10px', overflow:'hidden'}} >
    <Carousel
      //maw={450}
     // mx="auto"

      withIndicators
      height={500}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide  className={classes.image} style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/012/961/371/original/concept-for-digital-marketing-agency-digital-media-campaign-flat-illustration-vector.jpg)' }}></Carousel.Slide>
      <Carousel.Slide className={classes.image} style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/marketing-consulting-concept-illustration_114360-9027.jpg?w=826&t=st=1696798587~exp=1696799187~hmac=1e1d73561e542e61b9d3563b258bceb3b6d9cbb158b033b0fb4134f80b08e78b)' }}></Carousel.Slide>
      <Carousel.Slide className={classes.image} style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/digital-marketing-concept_1284-7077.jpg)' }}></Carousel.Slide>
      <Carousel.Slide className={classes.image} style={{ backgroundImage: 'url(https://www.cloudways.com/blog/wp-content/uploads/Digital-Marketing-Agencies.jpg)' }}></Carousel.Slide>
      <Carousel.Slide className={classes.image} style={{ backgroundImage: 'url(https://tecnosoluciones.com/wp-content/uploads/2020/02/Agencia-de-Marketing-Digital.jpg)' }}></Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
    </Box>
  );
}