import { isNotEmpty, useForm } from '@mantine/form';
import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  rem,
  Stack,
  Box,
  ThemeIcon,
  Paper
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconAt, IconPhone, IconMapPin, IconSun } from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    //backgroundColor:'#E9ECEF',
    /*
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    */
    //backgroundImage: theme.fn.gradient({ from: 'teal.9', to: 'lime.7', deg: 100 }),
    //borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 2.5)`,
    //backgroundColor: '#4E8480',
    //checking stuff
    position: 'relative',
   // backgroundImage:
      //'url(https://media.istockphoto.com/id/867940676/photo/paper.webp?b=1&s=170667a&w=0&k=20&c=eKcvw7UFHNW4r-NFm0xBuFCll7rtiJDMI_Ai4RReptE=)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    //checking end

    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
  },
  wrapperContactIcon:{
    display: 'flex',
    alignItems: 'center',
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    //backgroundImage : `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][6]} 100%)`,
   // backgroundImage: theme.fn.gradient({ from: 'lime.7', to: 'lime.7', deg: 100 }),
    //backgroundColor: 'lime',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.black,
    lineHeight: 1,
  },

  description: {
    //color: theme.colors[theme.primaryColor][0],
    color: theme.black,
    maxWidth: rem(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    //color: theme.white,
    color:'red',

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    //backgroundColor: 'teal',
   // backgroundColor: '#4E8480',
   backgroundColor:'#000'
  },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = 'gradient',
  
  className,
  ...others
}) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div 
    className={classes.wrapperContactIcon}
    >
        <ThemeIcon
        size={40}
        radius="md"
        variant="outline"
        className={classes.icon}
        //gradient={{ deg: 100, from: 'teal.9', to: 'lime.7' }}
        color='red'
      >
        <Icon size="1.5rem"  />
      </ThemeIcon>


      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'alamb2331@gmail.com', icon: IconAt },
  { title: 'Phone', description: '+923455893337', icon: IconPhone },
  { title: 'Address', description: 'Zaki Centre, I-8 Markaz Islamabad', icon: IconMapPin },
  { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
];

export function ContactIconsList({ data = MOCKDATA, variant }) {
  const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
  return <Stack >{items}</Stack>;
}

export default function ContactUs() {
  const { classes } = useStyles();

  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  const form = useForm({
    initialValues: {  fullName: '', message: '', email: ''},
    validateInputOnChange: true,
    validate: {
      fullName: (value) => (/^[A-Za-z]+(?:\s[A-Za-z]+)+$/i.test(value) ? null : 'Full Name Should Contain Alphabets Only'),
      message: (value) => (/^[a-zA-Z0-9\s,.\-!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~]{20,100}$/.test(value) ? null : 'Message Should Contain 10 and 150 Characters'),
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please Enter Valid Email i.e user@gmail.com'),
    },
  });

  return (
    
    <div className={classes.wrapper} 
    style={{
      borderBottom: '1px solid #A9A9A9',
    }}
    >
      <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>

          <ContactIconsList  />

          <Group mt="xl">{icons}</Group>
        </div>
        <Paper
        withBorder
        style={{
          // Custom border style, width, color, and radius
          border: '1px solid #A9A9A9', // Replace with your desired color
          //borderRadius: '10px', // Adjust the border radius as needed
        }}
        >
        <form onSubmit={form.onSubmit((values) => console.log(values))} >
        <div className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps("fullName")}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps("message")}
          />

          <Group position="right" mt="md">
            <Button type='submit' className={classes.control}>Send message</Button>
          </Group>
        </div>
        </form>
        </Paper>
      </SimpleGrid>
    </div>
  );
}