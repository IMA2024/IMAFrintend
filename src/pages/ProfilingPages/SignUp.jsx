import { isNotEmpty, useForm } from '@mantine/form';
import { FileInput, TextInput, Button, Box, createStyles, Paper, PasswordInput, Title, Divider, Select, Image, rem, Anchor, Text } from '@mantine/core';
import { Signup } from '../../api/profiling/Signup';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

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
  }

}));

export default function SignUp() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  //   const handleSubmit = () => {   
  //     notifications.show({ message: 'Form submitted successfully', color: 'green' });
  // };

  // const handleError = () => {
  //   notifications.show({ message: 'Please enter valid values', color: 'red' });
  // };

  const form = useForm({
    initialValues: { firstName: '', lastName: '', role: '', email: '', phoneNumber: '', password: '', confirmPassword: '' },
    validateInputOnChange: true,
    validate: {
      role: isNotEmpty('Please Select A Role'),
      firstName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'First Name should be between 3 to 20 Alphabets'),
      lastName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Last Name should be between 3 to 20 Alphabets'),
      phoneNumber: (value) => (/^\d{11}$/.test(value) ? null : 'Phone Number should be 11 Digit'),
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please Enter Valid Email i.e user@gmail.com'),
      password: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
      confirmPassword: (value, { password }) => (value === password ? null : 'Incorrect ! Please Recheck & Confirm Your Password'),
    },
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
    <Box className={classes.wrapper}>
      <Paper className={classes.form} withBorder shadow="md" radius={0} p={30}>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          Sign Up
        </Title>
        <Divider mb={20} />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Box>
            <Select withAsterisk size='md' label="Role" placeholder="Select Role" {...form.getInputProps('role')}
              data={[
                { value: 'Marketing Agent', label: 'Marketing Agent' },
                { value: 'Business Owner', label: 'Business Owner' },
                { value: 'Customer', label: 'Customer' },
              ]}
            />
          </Box>
          <Box mt="md" >
            <TextInput withAsterisk size='md' label="First Name" placeholder="Enter First Name: John" {...form.getInputProps('firstName')} />
          </Box>
          <Box mt="md" >
            <TextInput withAsterisk size='md' label="Last Name" placeholder="Enter First Name: Cena" {...form.getInputProps('lastName')} />
          </Box>
          <Box mt="md" >
            <TextInput withAsterisk size='md' label="Email" placeholder="Enter Email: JohnCena@gmail.com" {...form.getInputProps('email')} />
          </Box>
          <Box mt="md" >
            <TextInput withAsterisk size='md' label="Phone Number" placeholder="Enter Phone Number: 03001234567"  {...form.getInputProps('phoneNumber')} />
          </Box>
          <Box mt="md" >
            <PasswordInput size='md' withAsterisk label="Password" placeholder="Enter Password"  {...form.getInputProps('password')} />
          </Box>
          <Box mt="md" >
            <PasswordInput size='md' withAsterisk label="Confirm Password" placeholder="Confirm Password"  {...form.getInputProps('confirmPassword')} />
          </Box>
          <Box mt={'md'} >
            <Button fullWidth mt="xl" size="md" type='submit'>
              Sign Up
            </Button>
            <Text ta="center" mt="md">
              Already Have An Account?
              <Anchor mt={'md'} color='dark.1' component="button" size="xl" onClick={() => GoToSignIn()}>
                Sign In
              </Anchor>
            </Text>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}