import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem, Divider, ThemeIcon, Box, Badge } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const useStyles = createStyles((theme) => ({
  carouselContainer:{
    //backgroundImage: theme.fn.gradient({ from: 'teal.9', to: 'teal.9', deg: 100 }),
    //backgroundImage: theme.fn.primaryColor(theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[1])
    //background: theme.colors.green[2],
    
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
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60',
    title: ' "The call analytics and scripts make my job efficient, and the lead generation process is seamless. I recommend IMA to fellow agents."',
    category: 'Phoebe Charles:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxoSnhGcGl5NHpiQXx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60',
    title: '"As a marketing agent, I rely on IMA is a powerful tools to connect with business owners and customers. "',
    category: 'Andrew Joey:',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    title: '"IMA web scrapper is a game-changer. It saved me hours of manual work in gathering contacts." ',
    category: 'Michelle:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1543096222-72de739f7917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60',
      title: ' "The call analytics and scripts make my job efficient, and the lead generation process is seamless. I recommend IMA to fellow agents."',
    category: 'Kendall:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1509868918748-a554ad25f858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60',
      title: '"As a marketing agent, I rely on IMA is a powerful tools to connect with business owners and customers. "',
    category: 'Courtney:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60',
      title: '"IMA web scrapper is a game-changer. It saved me hours of manual work in gathering contacts." ',
    category: 'Khloe:',
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