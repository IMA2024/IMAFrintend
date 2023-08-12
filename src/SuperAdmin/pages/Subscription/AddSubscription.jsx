import React, { useEffect, useState } from 'react'
import { Grid, Skeleton, Container, Card, Paper, Center, Image, Box, Button, Text, Divider, Group, createStyles, Modal, Select, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { updateSubscription } from '../../../api/admin/subscriptions';

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

const child = <Skeleton height={140} radius="md" animate={false} />;

export default function AddSubscription() {
  const { classes } = useStyles();

  const [countries, setCountries] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [subscriptionTitle, setSubscriptionTitle] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [subscriptionPrice, setSubscriptionPrice] = useState('');
  const [subscriptionLimit, setSubscriptionLimit] = useState('');
  const [subscriptionDescription, setSubscriptionDescription] = useState('');

  const form = useForm({
    initialValues: { title: subscriptionTitle, type: subscriptionType , price: subscriptionPrice, limit: subscriptionLimit, description: subscriptionDescription },

    validate: {
      title: isNotEmpty('Please Select Title'),
      type: isNotEmpty('Please Select Type'),
      price: (value) => (/^\d{1,11}$/.test(value) ? null : 'Please Enter Subscription Price'),
      limit: (value) => (/^\d{1,11}$/.test(value) ? null : 'Please Enter The Number Of Calls'),
      description: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Description Must Not Be Empty'),
    },
  });

  const getCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/viewSubscriptions');
      setCountries(response.data.subscriptions);
      console.log(response.data.subscriptions);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    // Update the form field value whenever subscriptionPrice changes
    form.setFieldValue('title', subscriptionTitle);
    form.setFieldValue('type', subscriptionType);
    form.setFieldValue('price', subscriptionPrice);
    form.setFieldValue('limit', subscriptionLimit);
    form.setFieldValue('description', subscriptionDescription);

  }, [subscriptionTitle, subscriptionType, subscriptionPrice, subscriptionLimit, subscriptionDescription]);

  const handleSubscriptionPriceChange= (event) => {
    const newPrice = event.currentTarget.value;
    setSubscriptionPrice(newPrice);
    form.setFieldValue('price', newPrice);
  };

  const handleSubscriptionLimitChange = (event) => {
    const newLimit = event.currentTarget.value;
    setSubscriptionLimit(newLimit);
    form.setFieldValue('limit', newLimit);
  };

  const handleSubscriptionDescriptionChange = (event) => {
    const newDescription = event.currentTarget.value;
    setSubscriptionDescription(newDescription);
    form.setFieldValue('description', newDescription);
  };

  const handleSubmit = async (values) => {
    const { title, price, limit, description } = values;

    try {
      const response = await updateSubscription(title, price, limit, description);
      console.log(response);
      if (response.status === 200) {
        // Update the subscription in the local state
        const updatedSubscriptions = countries.map((country) => {
          if (country.title === title) {
            return {
              ...country,
              price,
              limit,
              description,
            };
          }
          return country;
        });
        setCountries(updatedSubscriptions);
        form.reset();
        notifications.show({ message: "Subscription Updated Successfully", color: 'green' });
        close();
      }
    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red' });
    }
  };

  return (
    <Container my="md">
      <Grid gutter={'xs'}>
        {countries.map((country, index) => (
          <Grid.Col xs={6} sm={4} md={4} radius="md" >
            <Card >
              <Paper radius="md" mih={300} >
                <Center mx="auto" mih={40}><Text fw={'bold'} size={30} h={100}>{country.title}</Text></Center>
                <Center mx="auto" mih={40}><Text size={25} fs={'italic'} color='red.9'>{country.type}</Text></Center>
                <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
                  <Image
                    radius="md"
                    src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
                    alt="Random unsplash image"
                  />
                </Box></Center>
                <Center mih={40} mx="auto"> <Text size={25} fs={'italic'} color='blue.9'>{country.price}</Text></Center>
                <Divider />
                <Center mih={40} mx="auto"> <Text>{country.description}</Text></Center>
                <Button mih={40} mx="auto" fullWidth color='green.9'
                  onClick={() => {
                    open();
                    setSubscriptionTitle(country.title);
                    setSubscriptionType(country.type);
                    setSubscriptionPrice(country.price);
                    setSubscriptionLimit(country.limit);
                    setSubscriptionDescription(country.description);
                  }}
                >
                  Edit
                </Button>
              </Paper>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <Box>
        <Modal opened={opened} onClose={close} title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Subscription Details</Text>}>
          <form onSubmit= {form.onSubmit((values) => handleSubmit(values))} >
            <Box >
              <Select disabled sx={{'&:hover': { cursor: 'not-allowed', borderColor: 'red'}}} withAsterisk size='sm' label="Title" placeholder="Select Subscription Title" {...form.getInputProps('title')}
                data={[
                  { value: 'Silver Plan', label: 'Silver Plan' },
                  { value: 'Gold Plan', label: 'Gold Plan' },
                  { value: 'Platinum Plan', label: 'Platinum Plan' },
                ]}
              />
            </Box>
            <Box >
              <Select disabled sx={{'&:hover': { cursor: 'not-allowed', borderColor: 'red'}}} withAsterisk size='sm' label="Type" placeholder="Select Subscription Type" {...form.getInputProps('type')}
                data={[
                  { value: 'Weekly', label: 'Weekly' },
                  { value: 'Monthly', label: 'Monthly' },
                  { value: 'Yearly', label: 'Yearly' },
                ]}
              />
            </Box>
            <Box >

              <TextInput
                onChange={handleSubscriptionPriceChange}
                size='sm' label="Price" placeholder="Enter Price: 865" {...form.getInputProps('price')}

              />
            </Box>
            <Box >
              <TextInput  onChange={handleSubscriptionLimitChange}
                size='sm' label="Limit" placeholder="Enter Limit: 15" {...form.getInputProps('limit')} />
            </Box>
            <Box >
              <TextInput  onChange={handleSubscriptionDescriptionChange}
                withAsterisk size='sm' label="Subscription Description" placeholder="Enter Subscription Description: 30 Calls in 3 Days." {...form.getInputProps('description')} />
            </Box>
            <Box mt={'sm'} style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
              <Button size='sm' color='red.8' onClick={close} >
                Cancel
              </Button>
              <Button type="submit" size='sm' color='green.9' >
                Submit
              </Button>
            </Box>
          </form>
        </Modal>
      </Box>
    </Container>
  );
}