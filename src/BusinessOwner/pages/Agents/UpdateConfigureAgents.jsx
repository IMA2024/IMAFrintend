import { isNotEmpty, useForm } from '@mantine/form';
import { Button, Box, createStyles, Paper, Textarea, Title, Divider, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { updateAgent } from '../../../api/businessOwner/agent';
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

export default function UpdateConfigureAgents() {

  const [countries, setCountries] = useState([]);
  const { user } = useContext(UserContext);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { business: '', name: '', voice: '' },
    validateInputOnChange: true,
    validate: {
      business: isNotEmpty('Please Select Business Name'),
      name: isNotEmpty('Please Select Agent Name'),
      voice: isNotEmpty('Please Select Agent Voice'),
    },
  });

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/businessesList');
      const newData =  await response.json();

      const filteredBusinesses = newData.filter((business) => business.businessOwner === user._id);
      setCountries(filteredBusinesses);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const { business, name, voice } = values;

    try {
      const response = await updateAgent(business, name, voice);
      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Agent Updated Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  return (
    <Paper withBorder shadow="md" p={35} radius="md">
      <Title
        mb={20}
        align="center"
        //order={2}
        sx={{ fontWeight: 650 }}
      >
        Update System Agents
      </Title>
      <Divider mb={30} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box >
          <Select withAsterisk size='md' label="Business Name" placeholder="Select Business Name" {...form.getInputProps('business')}
            data={countries.map((country) => ({
              value: `${country._id}`,
              label: `${country.name}`,
            }))}
          />
        </Box>
        <Box mt="md" className={classes.responsiveContainer}>
          <Select withAsterisk size='md' className={classes.inputField} label="Agent Name" placeholder="Select Agent Name" {...form.getInputProps('name')}
            data={[
              { value: 'Max', label: 'Max' },
              { value: 'John', label: 'John' },
              { value: 'Lilly', label: 'Lilly' },
              { value: 'Bella', label: 'Bella' },
            ]}
          />
          <Select withAsterisk size='md' className={classes.inputField} label="Agent Voice" placeholder="Select Agent Voice" {...form.getInputProps('voice')}
            data={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
            ]}
          />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="lg" size='md' color='red.8' >
            Cancel
          </Button>
          <Button type="submit" mt="lg" size='md' color='green.9' >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}