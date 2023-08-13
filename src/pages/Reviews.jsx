import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem, Divider, ThemeIcon, Box, Badge } from '@mantine/core';

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
    fontFamily: `cursive, ${theme.fontFamily}`,
    fontWeight: 300,
    color: theme.black,
    //color: 'teal',
    lineHeight: 1.2,
    fontSize: rem(22),
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
    //marginBottom: '10%',
    //height: '100%',
    
  },
  pictureHalf : {
    width: '50%',
    backgroundColor:'pink',

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
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Badge mt={'md'} variant="gradient" gradient={{ from: 'teal.9', to: 'lime.7', deg: 105 }}>
        Customer Review
      </Badge>
    </Paper>
    </Box>
  );
}

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: '"Best forests to visit in North America."',
    category: 'Phoebe Charles:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: '"Hawaii beaches review: better than you think."',
    category: 'Andrew Joey:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: '"Mountains at night: 12 best locations to enjoy the view."',
    category: 'Michelle:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: '"Aurora in Norway: when to visit for best experience."',
    category: 'Kendall:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: '"Best places to visit this winter."',
    category: 'Courtney:',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: '"Active volcanos reviews: travel at your own risk."',
    category: 'Khloe:',
  },
];

export default function Reviews() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
   
    <Box >
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
        <Divider mb={20} />
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
    </Box>
   
  );
}