import { useForm } from '@mantine/form';
import { FileInput, TextInput, Button, Box , createStyles, Paper, PasswordInput, Title, Divider, Select, Image, rem } from '@mantine/core';
import { useState } from 'react';

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
  const {classes} = useStyles()
  const form = useForm({
    initialValues: { firstName:'', lastName:'', role:'',  email: '',phoneNumber:'', password:'', confirmPassword:'' },

    // functions will be used to validate values at corresponding key
    validate: {
      firstName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'First Name Should Contain Atleast 3 Alphabets'),
      lastName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Last Name Should Contain Atleast 3 Alphabets'),
      role: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Please Select Role'),
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please Valid Enter Email'),
      phoneNumber: (value) => (/^\d{11}$/.test(value) ? null : 'Please Enter 11 Digit Phone Number'),
      password: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
      confirmPassword: (value, {password}) => (value === password ? null : 'Please Confirm Your Password'),

    },
  });


  return (
    <Box className={classes.wrapper}>
    <Paper className={classes.form}  withBorder shadow="md" radius={0} p={30}>
       <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          Sign Up
        </Title>
        <Divider mb={20} />
      <form onSubmit={form.onSubmit(console.log)} >
        <Box>
        <Select withAsterisk size='md' label="Role" placeholder="Select Role" {...form.getInputProps('role')}
        data={[
            { value: 'businessowner', label: 'Business Owner' },
            { value: 'marketingagent', label: 'Marketing Agent' },
          ]}
         />
        </Box>
      <Box mt="md" className={classes.responsiveContainer}>
        <TextInput withAsterisk size='md' className={classes.inputField} label="First Name" placeholder="Enter First Name: John" {...form.getInputProps('firstName')} />
        <TextInput withAsterisk size='md' className={classes.inputField} label="Last Name" placeholder="Enter First Name: Cena" {...form.getInputProps('lastName')} />
        </Box>
        <Box mt="md" className={classes.responsiveContainer}>
        <TextInput className={classes.inputField} withAsterisk size='md' label="Email" placeholder="Enter Email: JohnCena@gmail.com" {...form.getInputProps('email')} />
        <TextInput withAsterisk size='md' label="Phone Number" placeholder="Enter Phone Number: 03001234567"  className={classes.inputField} {...form.getInputProps('phoneNumber')} />
        </Box>
        <Box className={classes.responsiveContainer} mt="md" >
        <PasswordInput size='md' withAsterisk label="Password" placeholder="Enter Password" className={classes.inputField}  {...form.getInputProps('password')} />
        <PasswordInput size='md' withAsterisk label="Confirm Password" placeholder="Confirm Password"  className={classes.inputField} {...form.getInputProps('confirmPassword')} />
         </Box>
         <Box mt={'md'} style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button size='md' color='red.8' >
          Cancel
        </Button>
        <Button type="submit" size='md' color='green.9' >
          Submit
        </Button>
        </Box>
      </form>
    </Paper>
    </Box>
  );
}