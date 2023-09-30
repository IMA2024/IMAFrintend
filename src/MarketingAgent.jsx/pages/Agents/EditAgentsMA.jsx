import { isNotEmpty, useForm } from '@mantine/form';
import { Button, Box, createStyles, Paper, Textarea, Title, Divider, Select, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import React from "react";
import { useLocation } from 'react-router-dom';
import { updateAgent } from '../../../api/marketingAgent/agent';

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

export default function EditAgentsMA() {
  const location = useLocation();
  const rowData = location.state.rowData;
  const [countries, setCountries] = useState([]);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { agentId: rowData?._id, business: rowData?.business?.name, name: rowData?.voice, voice: rowData?.voice },
    validateInputOnChange: true,
    validate: {
      business: isNotEmpty('Please Select Business Name'),
      name: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Please Select Agent Name'),
      voice: isNotEmpty('Please Select Agent Voice'),
    },
  });

  useEffect(() =>{
    const getBusinesses = async () => {
      const response = await axios.get('http://localhost:5000/marketingAgent/viewAllSubscribedBusinesses');
      const businesses = response?.data?.businesses;
      setCountries(businesses);
    };
    getBusinesses();
  }, []);

  const handleSubmit = async (values) => {
    const { agentId, business, name, voice } = values;

    try {
      const response = await updateAgent(agentId, business, name, voice);
      if (response.status === 201 || response.status === 200 ) {
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
        align="center"
        order={2}
        sx={{ fontWeight: 550 }}
        mb={5}
      >
        Configure System Agents
      </Title>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box >
          <Select disabled withAsterisk size='sm' label="Business Name" placeholder="Select Business Name" {...form.getInputProps('business')}
            data={countries?.map((country) => ({
              value: `${country?._id}`,
              label: `${country?.name}`,
            }))}
          />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
          <Select withAsterisk size='sm' className={classes.inputField} label="Agent Name" placeholder="Select Agent Name" {...form.getInputProps('name')}
            data={[
              { value: 'Komal', label: 'Komal' },
              { value: 'Amna', label: 'Amna' },
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
        <Box style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="lg" size='sm' color='red.8' >
            Cancel
          </Button>
          <Button type="submit" mt="lg" size='sm' color='green.9' >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}