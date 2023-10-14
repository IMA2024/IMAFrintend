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
    },
    paper: {
      /* Your Paper styles here */
      transition: 'transform 0.3s', // Apply a transition to the transform property
      '&:hover': {
        transform: 'scale(1.1)', // Enlarge the Paper element by 10% on hover
        //backgroundColor: '#2F9E44', // Change the background color on hover
        //color: '#F8F9FA', // Change the text color on hover
        /* You can add any other styles or animations here as needed */
      },
    },
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
  
  export default  function ServicesBO() {
    const { classes } = useStyles();
    const [hoveredCard, setHoveredCard] = useState(null);
  
    const items = features.map((feature, index) => (
      <Paper shadow="md" pl={30} pr={30} withBorder pt={70} pb={70}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      bg={hoveredCard === index ? '#E9ECEF' : 'initial'}
      className={`${classes.paper} ${hoveredCard === index ? 'hovered' : ''}`}
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
         <Title pb={40}  order={3} weight={100} align="center">
          Some of the services we offer
      </Title>
              <SimpleGrid cols={3} spacing={30} breakpoints={[
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'sm', cols: 1 },
              ]}>
              {items}
            </SimpleGrid>
    
      </div>
  
    );
  }