import { createStyles, Overlay, Container, Title, Button, Text, rem } from '@mantine/core';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  hero1: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  hero2: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  hero3: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  hero4: {
    position: 'relative',
    backgroundImage:
      'url(https://plus.unsplash.com/premium_photo-1661292033733-17272453224b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  hero5: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    height: rem(700),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    backgroundColor: '#4E8480',
   
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));



export default function HeroHeader() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const GoToSignIn = () => {
    navigate('/HeaderMegaMenu/SignIn' );
    console.log('sadfgh');
  
  };

  return (
    <Carousel
    plugins={[autoplay.current]}
    onMouseEnter={autoplay.current.stop}
    onMouseLeave={autoplay.current.reset}
    withIndicators
    >
    <Carousel.Slide><div className={classes.hero1}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Innovative Solutions For Modern Marketing</Title>
        <Text className={classes.description} size="xl" mt="xl"
        sx={{
          fontFamily:'Poppins',
          //lineHeight: '1.55',
          textAlign:'justify'
        }}
         >
        IMA is a platform that understands the power of strategic marketing. Our commitment to excellence goes beyond the technology itself; it extends to our marketing strategy, ensuring that your experience with IMA is truly exceptional.
        </Text>

        <Button mt={'xl'} size="xl" radius="xl" 
       // className={classes.control}
       // variant="gradient"
          //  gradient={{ deg: 100, from: '#000', to: '#000' }}
          color='green.8'
          onClick={() => GoToSignIn()}
        >
          Get started
        </Button>
      </Container>
    </div>
    </Carousel.Slide>
    <Carousel.Slide><div className={classes.hero2}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Innovative Solutions For Modern Marketing</Title>
        <Text className={classes.description} size="xl" mt="xl"
        sx={{
          fontFamily:'Poppins',
          //lineHeight: '1.55',
          textAlign:'justify'
        }}
         >
        IMA is a platform that understands the power of strategic marketing. Our commitment to excellence goes beyond the technology itself; it extends to our marketing strategy, ensuring that your experience with IMA is truly exceptional.
        </Text>

        <Button mt={'xl'} size="xl" radius="xl" 
       // className={classes.control}
       // variant="gradient"
          //  gradient={{ deg: 100, from: '#000', to: '#000' }}
          color='green.8'
          onClick={() => GoToSignIn()}
        >
          Get started
        </Button>
      </Container>
    </div>
    </Carousel.Slide>
    <Carousel.Slide><div className={classes.hero3}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Innovative Solutions For Modern Marketing</Title>
        <Text className={classes.description} size="xl" mt="xl"
        sx={{
          fontFamily:'Poppins',
          //lineHeight: '1.55',
          textAlign:'justify'
        }}
         >
        IMA is a platform that understands the power of strategic marketing. Our commitment to excellence goes beyond the technology itself; it extends to our marketing strategy, ensuring that your experience with IMA is truly exceptional.
        </Text>

        <Button mt={'xl'} size="xl" radius="xl" 
       // className={classes.control}
       // variant="gradient"
          //  gradient={{ deg: 100, from: '#000', to: '#000' }}
          color='green.8'
          onClick={() => GoToSignIn()}
        >
          Get started
        </Button>
      </Container>
    </div>
    </Carousel.Slide>
    <Carousel.Slide><div className={classes.hero4}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Innovative Solutions For Modern Marketing</Title>
        <Text className={classes.description} size="xl" mt="xl"
        sx={{
          fontFamily:'Poppins',
          //lineHeight: '1.55',
          textAlign:'justify'
        }}
         >
        IMA is a platform that understands the power of strategic marketing. Our commitment to excellence goes beyond the technology itself; it extends to our marketing strategy, ensuring that your experience with IMA is truly exceptional.
        </Text>

        <Button mt={'xl'} size="xl" radius="xl" 
       // className={classes.control}
       // variant="gradient"
          //  gradient={{ deg: 100, from: '#000', to: '#000' }}
          color='green.8'
          onClick={() => GoToSignIn()}
        >
          Get started
        </Button>
      </Container>
    </div>
    </Carousel.Slide>
    <Carousel.Slide><div className={classes.hero5}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Innovative Solutions For Modern Marketing</Title>
        <Text className={classes.description} size="xl" mt="xl"
        sx={{
          fontFamily:'Poppins',
          //lineHeight: '1.55',
          textAlign:'justify'
        }}
         >
        IMA is a platform that understands the power of strategic marketing. Our commitment to excellence goes beyond the technology itself; it extends to our marketing strategy, ensuring that your experience with IMA is truly exceptional.
        </Text>

        <Button mt={'xl'} size="xl" radius="xl" 
       // className={classes.control}
       // variant="gradient"
          //  gradient={{ deg: 100, from: '#000', to: '#000' }}
          color='green.8'
          onClick={() => GoToSignIn()}
        >
          Get started
        </Button>
      </Container>
    </div>
    </Carousel.Slide>
    </Carousel>
  );
}