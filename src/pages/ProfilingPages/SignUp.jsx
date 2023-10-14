import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Button, Box, createStyles, Paper, PasswordInput, Title, Divider, Select, rem, Anchor, Text } from '@mantine/core';
import { Signup } from '../../api/profiling/Signup';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import CarouselProfiling from './CarouselProfiling';

const useStyles = createStyles((theme) => ({

  wrapper: {
    minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    minHeight: rem(900),
    maxWidth: rem(650),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  responsiveContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    //backgroundColor:'pink',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    },

  },

  inputField: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%'
    },
  },

  title: {
    //color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    color: '#2F9E44',
    //fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  responsiveConatainer : {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin:'20px',
    //gap: '5px',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      height:'100%',
    },
  },

  child1: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%'
    },
   },
   child2: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      display:'none',
    },
   },
   paddingPaper : {
    paddingLeft: '30px',

    [theme.fn.smallerThan('sm')]: {
      paddingLeft: '0px',
    },
   },

}));

export default function SignUp() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { firstName: '', lastName: '', role: '', email: '', phoneNumber: '', password: '', confirmPassword: '' },
    validateInputOnChange: true,
    validate: {
      role: isNotEmpty('Please Select A Role'),
      firstName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'First Name Must Contain 3 to 20 Alphabets'),
      lastName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Last Name Must Contain 3 to 20 Alphabets'),
      phoneNumber: (value) => (/^\d{11}$/.test(value) ? null : 'Phone Number Must Be 11 Digits'),
      email: (value) => { const isValidFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) || /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      if (!isValidFormat) {
        return 'Please Enter a Valid Email i.e. user@gmail.com or user1223@gmail.com';
      }
      if (value.length > 25) {
        return 'Email Length Must Not Exceed 25 Characters';
      }
      return null;},         
      password: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
      confirmPassword: (value, { password }) => { if (!value) return 'Please Confirm Your Password'; return value === password ? null : 'Passwords Do Not Match';},
      }
        });

  const handleSubmit = async (values) => {
    const { role, firstName, lastName, email, phoneNumber, password } = values;
    try {
      const response = await Signup(role, firstName, lastName, email, phoneNumber, password);

      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Signup Successfull `, color: 'green' });
        navigate('/HeaderMegaMenu/SignIn')
      }
} catch (error) {
        notifications.show({ message: error.response.data.message, color: 'red', height: 100 });
  }
}

  const GoToSignIn = () => {
    navigate('/HeaderMegaMenu/SignIn');
  }

  return (
    <Box style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    sx={{
      fontFamily: 'Poppins'
    }}
    >
      <Box className={classes.responsiveConatainer} >
      <Box className={classes.child2}  >
          <CarouselProfiling  />
        </Box>
        <Box className={classes.child1} >
      <Paper  className={classes.paddingPaper} >
      <Title order={2} className={classes.title} ta="center" mt="md" mb={30} >
            Sign Up to IMA!
          </Title>
       
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Box>
            <Select withAsterisk size='md' label="Role" placeholder="Select Your Role" {...form.getInputProps('role')}
              data={[
                //{ value: 'Marketing Agent', label: 'Marketing Agent' },
                { value: 'Business Owner', label: 'Business Owner' },
                { value: 'Customer', label: 'Customer' },
              ]}
            />
          </Box>
          <Box mt="md" className={classes.responsiveContainer}>
            <TextInput className={classes.inputField} maxLength={20} withAsterisk size='md' label="First Name" placeholder="Enter Your First Name" {...form.getInputProps('firstName')} />
            <TextInput className={classes.inputField} maxLength={20} withAsterisk size='md' label="Last Name" placeholder="Enter Your Last Name" {...form.getInputProps('lastName')} />
          </Box>
          <Box mt="md" className={classes.responsiveContainer}>
            <TextInput className={classes.inputField} maxLength={25} withAsterisk size='md' label="Email" placeholder="Enter Your Email" {...form.getInputProps('email')} />
            <TextInput  className={classes.inputField} maxLength={11} withAsterisk size='md' label="Phone Number" placeholder="Enter Your Phone Number"  {...form.getInputProps('phoneNumber')} />
            </Box>
            <Box mt="md" className={classes.responsiveContainer}>
            <PasswordInput className={classes.inputField} maxLength={20}size='md' withAsterisk label="Password" placeholder="Enter Your Password"  {...form.getInputProps('password')} />
            <PasswordInput className={classes.inputField} maxLength={20} size='md' withAsterisk label="Confirm Password" placeholder="Confirm Your Password"  {...form.getInputProps('confirmPassword')} />
          </Box>
          <Box mt={'md'} >
            <Button fullWidth mt="xl" size="md" type='submit' color='green.8'>
              Sign Up
            </Button>
            <Text ta="center" mt={'sm'} >
              Already Have An Account?
              <Anchor  color='green.8' component="button" size="lg" onClick={() => GoToSignIn()}>
                SignIn
              </Anchor>
            </Text>
          </Box>
        </form>
      </Paper>
      </Box>
      </Box>
    </Box>
  );
}