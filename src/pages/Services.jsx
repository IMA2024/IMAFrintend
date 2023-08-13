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

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
  },

  title: {
    //fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(36),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
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

export default  function Services() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 100, from: 'teal.9', to: 'lime.7' }}
      >
        <feature.icon size={rem(26)} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
   
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            Some of the services we offer
          </Title>
          <Text c="dimmed">
            From social media marketing to email marketing, IMA is all in one marketing product – It provides
            a comprehensive solution for all your marketing needs.
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 100, from: 'teal.9', to: 'lime.7' }}
            size="lg"
            radius="md"
            mt="xl"
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