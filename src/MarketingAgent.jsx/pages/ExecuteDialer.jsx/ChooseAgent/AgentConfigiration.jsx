import { isNotEmpty , useForm } from '@mantine/form';
import { Button, Box , createStyles, Paper, Textarea, Title, Divider, Select, TextInput, Group } from '@mantine/core';
import { useEffect , useState } from 'react';
//import { addAgent } from '../../../api/businessOwner/agent';
import { addAgent } from '../../../../api/businessOwner/agent';
import { notifications } from '@mantine/notifications';
import React, { useContext } from "react";
//import { UserContext } from '../../../context/users/userContext';
import { UserContext } from '../../../../context/users/userContext';
import axios from "axios"

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

export default function AgentConfiguration({nextStep, prevStep}) {

  const [countries, setCountries] = useState([]);
  const { user } = useContext(UserContext);
  const {classes} = useStyles();

  const form = useForm({
    initialValues: { name: '', voice: '', phoneNumber: '', extension:'' },
    validateInputOnChange: true,
    validate: {
      name: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Agent Name Must Contain 3 to 20 Alphabets'),
      voice: isNotEmpty('Please Select Agent Voice'),
      phoneNumber: isNotEmpty('Please Enter Phone Number'),
      extension: isNotEmpty('Please Enter Extension'),
    },
  });

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/businessesList');
      const newData =  await response.json();
      const filteredBusinesses = newData.filter((business) => business?.businessOwner === user?._id);
      setCountries(filteredBusinesses);
    };
    fetchData();
  }, []);

//-------------------------- Changes Here-----------------------------------
const handleSubmit = async (values) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/execute_dialer', {
      phoneNumber: values.phoneNumber,
      extension: values.extension,
    });

    if (response.status === 200) {
      // Success, handle it here
      console.log('Dialer executed successfully');
    } else {
      console.error('Failed to execute dialer');
    }
  } catch (error) {
    console.error('Error executing dialer:', error);
  }

  nextStep();
};

//------------------------- Changes Closed --------------------------------------

  const handleBack = () => {
    prevStep();
  };

  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
       <Title
           align="center"
           order={2}
           sx={{ fontWeight: 550 }}
           mb={5}
        >
          Step 3: Execute Dialer
        </Title>
      
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
      <Box mt="sm"  className={classes.responsiveContainer}>
        <Select withAsterisk size='sm' className={classes.inputField} label="Agent Name" placeholder="Enter Agent Name: Amna" {...form.getInputProps('name')} 
         data={[
          { value: 'Jennifer', label: 'Jennifer' },
          { value: 'Ali', label: 'Ali' },
        ]}
        />
        <Select withAsterisk size='sm' className={classes.inputField} label="Agent Voice" placeholder="Select Agent Voice" {...form.getInputProps('voice')}
            data={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
         />
        </Box>
        <Box mt="sm"  className={classes.responsiveContainer}>
        <TextInput maxLength={11} withAsterisk size='sm' label="Phone Number" placeholder="Enter User Phone Number" className={classes.inputField} {...form.getInputProps('phoneNumber')} />
        <TextInput  withAsterisk size='sm' label="Extension" placeholder="Enter Extension" className={classes.inputField} {...form.getInputProps('extension')} />
          </Box>
          {/*
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button  mt="lg"  size='sm' color='red.8' >
          Cancel
        </Button>
        <Button  mt="lg"  size='sm' color='green.9' >
          Choose
        </Button>
        </Box>
            */}
        <Group position="center" mt="xl">
        <Button variant="default" onClick={() => handleBack()}>Back</Button>
        <Button type='submit'>Execute Dialer</Button>
      </Group>
      </form>
    </Paper>
  );
}