import { useForm } from '@mantine/form';
import { FileInput, TextInput, Button, Box , createStyles, Paper, PasswordInput, Title, Divider, Select } from '@mantine/core';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({

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
  const [selectedFile, setSelectedFile] = useState(null);
  const {classes} = useStyles()
  const form = useForm({
    initialValues: { firstName:'', lastName:'', role:'',  email: '', password:'', confirmPassword:'' },

    // functions will be used to validate values at corresponding key
    validate: {
      firstName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'First Name Should Contain Atleast 3 Alphabets'),
      lastName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Last Name Should Contain Atleast 3 Alphabets'),
      role: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Please Select Role'),
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please Valid Enter Email'),
      password: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
      confirmPassword: (value, {password}) => (value === password ? null : 'Please Confirm Your Password'),

    },
  });


  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
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
        <Box mt="md" >
        <TextInput withAsterisk size='md' label="Email" placeholder="Enter Email: JohnCena@gmail.com" {...form.getInputProps('email')} />
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
  );
}