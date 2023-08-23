import { Paper, createStyles, TextInput, PasswordInput, Button, Title, Text, Anchor, rem, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Signin } from '../../api/profiling/Signin';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { UserContext } from '../../context/users/userContext';
import { useContext } from 'react';

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
    const { setUser } = useContext(UserContext)

    const form = useForm({
        initialValues: {  email: '', password:''},
        validateInputOnChange: true,
        validate: {
          email: (value) => { const isValidFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) || /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
          if (!isValidFormat) {
            return 'Please Enter a Valid Email i.e. user@gmail.com or user1223@gmail.com';
          }
          if (value.length > 25) {
            return 'Email Length Must Not Exceed 25 Characters';
          }
          return null;},              
          password: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),        },
      });

      const handleSubmit = async (values) => {
        const { email, password } = values;

    try {
      const response = await Signin(email, password);
    
      if (response.status === 200) {

        notifications.show({ message: `Signin Successfull `, color: 'green' });
        console.log(response.data);
        setUser(response.data);

        switch (response?.data?.role) {
          case 'Super Admin':
            localStorage.setItem('token', response?.data?.token);
            localStorage.setItem('role', response?.data?.role);
            navigate('/Dashboard');
            break;
          case 'Marketing Agent':
            localStorage.setItem('token', response?.data?.token);
            localStorage.setItem('role', response?.data?.role);
            navigate('/Dashboard');
            break;
          case 'Business Owner':
            localStorage.setItem('token', response?.data?.token);
            localStorage.setItem('role', response?.data?.role);
            navigate('/Dashboard');
            break;
          case 'Customer':
            localStorage.setItem('token', response?.data?.token);
            localStorage.setItem('role', response?.data?.role);            
            navigate('/Dashboard');
            break;
          default:
            console.log('Invalid role');
            break;
        }  }
    } catch (error) {
      notifications.show({ message: error.response.data.message , color: 'red' , height: 100  });
      console.log(error);
    }
};
      
    const GoToSignUp = () => {
      navigate('/HeaderMegaMenu/SignUp' );

    };

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome to IMA!
          </Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput maxLength={25} label="Email address" placeholder="user@gmail.com" size="md" {...form.getInputProps('email')}  />
          <PasswordInput maxLength={20} label="Password" placeholder="Your Password" mt="md" size="md" {...form.getInputProps('password')} />
          <Box>
          <Button  fullWidth mt="xl" size="md" type='submit' >
            Login
          </Button>
          </Box>
          <Text ta="center" mt="md">
          Don't Have An Account? 
          <Anchor mt={'md'} color='dark.1' component="button" size="xl" onClick={() => GoToSignUp()}>
           SignUp
          </Anchor>
          </Text>
          </form>
        </Paper>
      </div>
    );
  }