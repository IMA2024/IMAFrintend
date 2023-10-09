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
    Paper,
    Box
  } from '@mantine/core';
  import {  IconFlame, IconBrandInstagram, IconMagnet, IconPhoneCall, IconDialpad, IconEdit, IconMoneybag, IconSpeakerphone } from '@tabler/icons-react';
  import { useState } from 'react';
  
  const useStyles = createStyles((theme) => ({
    wrapper: {
      padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
      backgroundColor:'#E9ECEF'
    },
  
    title: {
     
    },
  
    control: {
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
          backgroundColor: '#2F9E44', // Change the background color on hover
          color: '#F8F9FA', // Change the text color on hover
          /* You can add any other styles or animations here as needed */
        },
      },

    
  }));
  
  const features = [
    {
      icon: IconEdit,
      title: 'Easy Registration',
      description: 'With IMA, gone are the days of complex and confusing registration processes. Our intuitive interface guides you through the registration steps seamlessly, making it a hassle-free experience for users.',
    },
    {
      icon: IconMoneybag,
      title: 'Affordable Pricing',
      description: 'At IMA, we believe that access to powerful systems and services should be affordable for everyone. That is why we have made it our mission to offer budget-friendly pricing without compromising on quality or features.',
    },
    {
      icon: IconSpeakerphone,
      title: 'Brilliant Marketing',
      description:
        'IMA is a platform that understands the power of strategic marketing. Our commitment to excellence goes beyond the technology itself; it extends to our marketing strategy, ensuring that your experience with IMA is truly exceptional.',
    },
    
  
  ];
  
  export default  function WhyChooseUs() {
    const { classes } = useStyles();
    const [hoveredCard, setHoveredCard] = useState(null);
  
    const items = features.map((feature, index) => (
      <Paper shadow="md" pl={30} pr={30} withBorder pt={20} pb={30}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      bg={hoveredCard === index ? '#000' : '#FFF'}
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
          color={hoveredCard === index ? '#F8F9FA' : 'initial'}
        >
          {feature.title}
        </Text>
        <Text mt="lg" fz="sm"
         sx={{
          fontFamily:'Poppins',
          lineHeight: '1.55',
          textAlign:'justify'
        }}
        
        color={hoveredCard === index ? '#F8F9FA' : 'initial'}
        >
          {feature.description}
        </Text>
      </div>
      </Paper>
    ));
  
    return (
     
      <Box className={classes.wrapper} >
         <Title
          mb={5}
          align="center"
          sx={{ fontWeight: 650, }}
        >
          Why Choose Us?
        </Title>
        <Title
          mb={20}
          align="center"
          order={4}
          color='gray.7'
          sx={{ fontWeight: 350, }}
        >
         Innovative Solutions For Modern Marketing
        </Title>
         
            <SimpleGrid cols={3} spacing={30} breakpoints={[
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'sm', cols: 1 },
        ]}>
              {items}
            </SimpleGrid>
         
       
      </Box>
  
    );
  }