import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem, Divider, ThemeIcon, Box, Badge } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import Laraib from '../../assets/Images/Laraib.jpeg';
import Abdullah from '../../assets/Images/Abdullah.jpeg';
import Afnan from '../../assets/Images/Afnan.jpeg';
import sirTRA from '../../assets/Images/sirTRA.jpeg';

const useStyles = createStyles((theme) => ({
  carouselContainer:{
    //backgroundImage: theme.fn.gradient({ from: 'teal.9', to: 'teal.9', deg: 100 }),
    //backgroundImage: theme.fn.primaryColor(theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[1])
    //background: theme.colors.green[2],
    //<Image onClick={() => GoToLandingPage()} width={150} height={55} fit="contain" src={Logo} />
    
  },
  
  reviewsHalf: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
  },

  title: {
    //fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    //fontFamily: `cursive, ${theme.fontFamily}`,
    //fontWeight: 300,
    //color: theme.black,
    //color: 'teal',
    //lineHeight: 1.2,
    //fontSize: rem(22),
    fontFamily:'Poppins',
    marginTop: theme.spacing.xl,
  },

  category: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xl,
  },

  card: {
    height: rem(340),
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    //marginBottom: '10%',
    //height: '100%',
    
  },
  pictureHalf : {
    width: '50%',
    backgroundColor:'pink',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  },
 
}));


function Card({ image, title, category }) {
  const { classes } = useStyles();
  
  return (
    <Box className={classes.card}>
      <Box className={classes.pictureHalf}
      sx={{ backgroundImage: `url(${image})` }}
      >
      </Box>
    <Paper
      p="xl"
      className={classes.reviewsHalf}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Text  className={classes.title} 
         sx={{
          //fontFamily:'Poppins',
          lineHeight: '1.55',
          textAlign:'justify'
        }}
        >
          {title}
        </Text>
      </div>
      <Badge mt={'md'} style={{backgroundColor: '#2F9E44', color:'#FFFF'}}
     // variant="gradient" gradient={{ from: 'teal.9', to: 'lime.7', deg: 105 }}
      >
        Customer Review
      </Badge>
    </Paper>
    </Box>
  );
}

const data = [
  {
    image:
      sirTRA,
    title: ' "The call analytics and scripts make my job efficient, and the lead generation process is seamless. I recommend IMA to fellow agents."',
    category: 'Mr Tehseen Riaz Abbasi:',
  },
  {
    image:
      Afnan,
    title: '"As a marketing agent, I rely on IMA is a powerful tools to connect with business owners and customers. "',
    category: 'Afnan Malik:',
  },
  {
    image:
      Abdullah,
    title: '"IMA web scrapper is a game-changer. It saved me hours of manual work in gathering contacts." ',
    category: 'Abdullah:',
  },
  {
    image:
      Laraib,
      title: ' "The call analytics and scripts make my job efficient, and the lead generation process is seamless. I recommend IMA to fellow agents."',
    category: 'Laraib Saghir:',
  },
  {
    image:
    Afnan,
      title: '"As a marketing agent, I rely on IMA is a powerful tools to connect with business owners and customers. "',
    category: 'Afnan Malik:',
  },
  {
    image:
      Abdullah,
      title: '"IMA web scrapper is a game-changer. It saved me hours of manual work in gathering contacts." ',
    category: 'Abdullah:',
  },
];

export default function Reviews() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}
    plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
   
    <Box  mb={50}>
        <Title
          mb={5}
          align="center"
          sx={{ fontWeight: 650, }}
        >
          Testimonials
        </Title>
        <Title
          mb={20}
          align="center"
          order={4}
          color='gray.7'
          sx={{ fontWeight: 350, }}
        >
          What People Say About Our Services
        </Title>
        <Divider mb={20} ml={40} mr={40} />
    <Carousel
    
      // slideSize="50%"
      // breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
      // slideGap="xl"
      // align="start"
      // slidesToScroll={mobile ? 1 : 2}
  
  slideSize="50%"
  breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
  slideGap="xl"
  align="start"
  slidesToScroll={mobile ? 1 : 2}
  // Attach the autoplay plugin to the Carousel itself
  plugins={[autoplay.current]}
  // You can also stop and reset the autoplay when needed
  onMouseEnter={() => autoplay.current.stop()}
  onMouseLeave={() => autoplay.current.reset()}
    >
      {slides}
    </Carousel>
    </Box>
   
  );
}