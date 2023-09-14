import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
  rem, 
  Paper
} from '@mantine/core';
import {  IconFlame, IconBrandInstagram, IconMagnet, IconPhoneCall, IconDialpad } from '@tabler/icons-react';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
  },

  title: {
    //fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    //fontSize: rem(36),
    //fontWeight: 900,
    //lineHeight: 1.1,
   // marginBottom: theme.spacing.md,
   // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  control: {
   // marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    backgroundColor: '#4E8480' ,
   
    [theme.fn.smallerThan('sm')]: {
      //width: '100%',
    },
  }
}));

const features = [
  {
    icon: IconBrandInstagram,
    title: 'Social Media Marketing',
    description: 'Expand your reach and engage your customers through social media marketing',
  },
  {
    icon: IconMagnet,
    title: 'Lead Generation',
    description: 'Dont miss out on valuable leads; Let us help you capture and convert into customers.',
  },
  {
    icon: IconPhoneCall,
    title: 'Customer Service',
    description:
      'We value are customers and are committed to providing exceptional service.',
  },
  {
    icon: IconDialpad,
    title: 'Auto Dialer',
    description:
      'Simplify your sales process and achieve more with our automatic dialer.',
  },
];

export default  function Services() {
  const { classes } = useStyles();
  const [hoveredCard, setHoveredCard] = useState(null);

  const items = features.map((feature, index) => (
    <Paper shadow="md" pl={30} pr={30} withBorder pt={70} pb={70}
    onMouseEnter={() => setHoveredCard(index)}
    onMouseLeave={() => setHoveredCard(null)}
    bg={hoveredCard === index ? '#E9ECEF' : 'initial'}
    >
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="outline"
        //gradient={{ deg: 100, from: 'teal.9', to: 'lime.7' }}
        color='red'
      >
        <feature.icon size={rem(26)} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="lg" fw={300}
        sx={{
          fontFamily:'Poppins'
        }}
      >
        {feature.title}
      </Text>
      <Text mt="lg" fz="sm"
       sx={{
        fontFamily:'Poppins'
      }}
      >
        {feature.description}
      </Text>
    </div>
    </Paper>
  ));

  return (
   
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}  m={'auto'}>
          {/*
          <Title className={classes.title} order={3} weight={100} >
            Some of the services we offer
          </Title>
  */}
          <Title pb={40}  order={3} weight={100} align="left">
          Some of the services we offer
      </Title>
          <Text 
           sx={{
            fontFamily:'Poppins'
          }}
          pb={40} 
          >
            From social media marketing to email marketing, IMA is all in one marketing product – It provides
            a comprehensive solution for all your marketing needs.
          </Text>

          <Button
            //variant="gradient"
            //gradient={{ deg: 100, from: '#4E8480', to: '#4E8480' }}
            size="lg"
           // mt="xl"
            radius="xl" 
            className={classes.control}
          >
            View More
          </Button>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>

  );
}