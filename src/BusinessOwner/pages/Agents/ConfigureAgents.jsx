import { isNotEmpty , useForm } from '@mantine/form';
import { Button, Box , createStyles, Paper, Textarea, Title, Divider, Select } from '@mantine/core';
import { useEffect , useState } from 'react';
import { addAgent } from '../../../api/businessOwner/agent';
import { notifications } from '@mantine/notifications';
import React, { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';

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

export default function ConfigureAgents() {

  const [countries, setCountries] = useState([]);
  const { user } = useContext(UserContext);
  const {classes} = useStyles();

  const form = useForm({
    initialValues: { business: '', agent: '', voice: '' },
    validateInputOnChange: true,
    validate: {
      business: isNotEmpty('Please Select Business Name'),
      agent: isNotEmpty('Please Select Agent Name'),
      voice: isNotEmpty('Please Select Agent Voice'),
    },
  });

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/admin/businessesList');
      const newData =  await response.json();

      const filteredBusinesses = newData.filter((business) => business.businessOwner === user._id);
      setCountries(filteredBusinesses);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const { business , name , voice  } = values;

    try {
      const response = await addAgent( business , name );
      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Agent Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
       <Title
           align="center"
           order={2}
           sx={{ fontWeight: 550 }}
           mb={5}
        >
          Configure System Agents
        </Title>
      
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
      <Box >
        <Select withAsterisk size='sm' label="Business Name" placeholder="Select Business Name" {...form.getInputProps('business')}
             data={countries.map((country) => ({
              value: `${country._id}`,
              label: `${country.name}`,
            }))}
         />
        </Box>
      <Box mt="sm"  className={classes.responsiveContainer}>
        <Select withAsterisk size='sm' className={classes.inputField} label="Agent Name" placeholder="Select Agent Name" {...form.getInputProps('agent')}
        data={[
            { value: 'Max', label: 'Max' },
            { value: 'John', label: 'John' },
            { value: 'Lilly', label: 'Lilly' },
            { value: 'Bella', label: 'Bella' },
          ]}
         />
        <Select withAsterisk size='sm' className={classes.inputField} label="Agent Voice" placeholder="Select Agent Voice" {...form.getInputProps('voice')}
            data={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
         />
        </Box>
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button  mt="lg"  size='sm' color='red.8' >
          Cancel
        </Button>
        <Button type="submit" mt="lg"  size='sm' color='green.9' >
          Submit
        </Button>
        </Box>
      </form>
    </Paper>
  );
}