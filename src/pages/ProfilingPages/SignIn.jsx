import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  rem,
  Box
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Signin } from '../../api/profiling/Signin';
import { useNavigate } from 'react-router-dom';

  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: rem(900),
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },
  
    form: {
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: rem(900),
      maxWidth: rem(450),
      paddingTop: rem(80),
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  }));
  
  export default function SignIn() {
    const { classes } = useStyles();
    const navigate = useNavigate();

  //   const handleSubmit = () => {   
  //       notifications.show({ message: 'Form submitted successfully', color: 'green' });
  //   };

  //   const handleError = () => {
  //     notifications.show({ message: 'Please enter valid values', color: 'red' });
  // };

    const form = useForm({
        initialValues: {  email: '', password:''},
        validateInputOnChange: true,
        validate: {
          email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please Valid Enter Email'),
          password: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
        },
      });

      const handleSubmit = async (values) => {
        const { email, password } = values;
    
        const response = await Signin(email, password);
    
        if (response.status === 200) {
    
          switch (response?.data?.role) {
            case 'Super Admin':
              localStorage.setItem('token', response?.data?.token);
              navigate('/ViewUser');
              break;
            case 'Marketing Agent':
              localStorage.setItem('token', response?.data?.token);
              navigate('/HeaderMegaMenu/SignUp');
              break;
            case 'Business Owner':
              localStorage.setItem('token', response?.data?.token);
              navigate('/HeaderMegaMenu/SignUp');
              break;
            case 'Customer':
              localStorage.setItem('token', response?.data?.token);
              navigate('/ViewUser');
              break;
            default:
              console.log('Invalid role');
              break;
          }
        }
        else {
          console.log('Sign-in failed');
        }
        console.log(response);
      }

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome to IMA!
          </Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md" {...form.getInputProps('email')}  />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />
          <Box>
          <Button  fullWidth mt="xl" size="md" type='submit' >
            Login
          </Button>
          </Box>
          <Text ta="center" mt="md">
           
          </Text>
          </form>
        </Paper>
      </div>
    );
  }