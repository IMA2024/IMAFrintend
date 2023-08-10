import React, { useEffect, useState } from 'react'
import { Grid, Skeleton, Container, Card, Paper, Center, Image, Box, Button, Text, Divider, Group, createStyles, Modal, Select, TextInput, Textarea} from '@mantine/core';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

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
  const {classes} = useStyles();
  const [countries, setCountries] =  useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [subscriptionTitle, setSubscriptionTitle] =  useState('');
  const [subscriptionType, setSubscriptionType] =  useState('');
  const [subscriptionPrice, setSubscriptionPrice] =  useState('');
  const [subscriptionLimit, setSubscriptionLimit] =  useState('');
  const [subscriptionDescription, setSubscriptionDescription] =  useState('');
  const form = useForm({
    initialValues: { title: '' , type: '' , price: subscriptionPrice , limit: '' ,  description: '' },
    
    // functions will be used to validate values at corresponding key
    validate: {
      title: (value) => (/^[A-Za-z ]{3,30}$/.test(value) ? null : 'Please Select Title'),
      type: (value) => (/^[A-Za-z]{3,30}$/.test(value) ? null : 'Please Select Type'),
      price: (value) => (/^\d{1,11}$/.test(value) ? null : 'Please Enter Price'),
      limit: (value) => (/^\d{1,11}$/.test(value) ? null : 'Please Enter The Number Of Calls'),
      description: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Description Must Not Be Empty'),
    },
  });
  //console.log(price);
  const getCountries = async () => {
    try {
    const response = await axios.get('https://restcountries.com/v2/all');
    setCountries(response.data);
    console.log(response.data);
    } catch (error) {
    console.log(error);
    }
    }

    useEffect(() => {
      getCountries();
      }, []);

      useEffect(() => {
        // Update the form field value whenever subscriptionPrice changes
        form.setFieldValue('price', subscriptionPrice);
      }, [subscriptionPrice]);
    
      const handleSubscriptionPriceChange = (event) => {
        const newPrice = event.currentTarget.value;
        setSubscriptionPrice(newPrice);
        form.setFieldValue('price', newPrice); // Update the form field value
      };

      const slicedCountries = countries.slice(0, 3);
      

  return (
    <Container my="md">
      <Grid gutter={'xs'}>
      {slicedCountries.map((country, index) => (
        <Grid.Col xs={6} sm={4} md={4} radius="md" >
        <Card >
        <Paper radius="md" mih={300} >
   <Center mx="auto" mih={40}><Text fw={'bold'} size={30} h={100}>{country.name}</Text></Center>
    <Center mx="auto" mih={40}><Text size={25} fs={'italic'} color='red.9'>Weakly</Text></Center> 
    <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
      <Image
        radius="md"
        src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
        alt="Random unsplash image"
      />
    </Box></Center>   
    <Center mih={40} mx="auto"> <Text size={25} fs={'italic'} color='blue.9'>97 PKR</Text></Center>
        <Divider />
        <Center mih={40} mx="auto"> <Text>Takes 1 day time for calls</Text></Center>
          <Button mih={40} mx="auto" fullWidth color='green.9'
         onClick={() => {
          open();
          setSubscriptionTitle(country.name);
          setSubscriptionType(country.region);
          setSubscriptionPrice(country.area);
          setSubscriptionLimit(country.area);
          setSubscriptionDescription(country.area);
          //console.log(subscriptionPrice);
          /*
          form.setValues({
            title: subscriptionTitle,
            type: subscriptionType,
            price: `${setSubscriptionPrice(country.area)}`,
            limit: subscriptionLimit,
            description: subscriptionDescription,
          })
          */
         
         }}
          >
              Edit
          </Button>
      </Paper>
      </Card>
        </Grid.Col>
         ))}
        {/*
        <Grid.Col xs={4} radius="md" >
        <Card >
        <Paper radius="md" mih={300} >
   <Center mx="auto" mih={40}><Text fw={'bold'} size={30}>Gold Plan</Text></Center>
    <Center mx="auto" mih={40} ><Text size={25} fs={'italic'} color='red.9'>Monthly</Text></Center> 
    <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
      <Image
        radius="md"
        src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
        alt="Random unsplash image"
      />
    </Box></Center>   
    <Center mih={40} mx="auto"> <Text size={25} fs={'italic'} color='blue.9'>97 PKR</Text></Center>
        <Divider />
        <Center mih={40} mx="auto"> <Text>Takes 1 day time for calls</Text></Center>
          <Button mih={40} mx="auto" fullWidth color='green.9'
         // onClick={() => {
          //  open();
         // }}
          >
              Edit
          </Button>
      </Paper>
      </Card>
        </Grid.Col>
        <Grid.Col xs={4} radius="md" >
        <Card >
        <Paper radius="md" mih={300} >
   <Center mx="auto" mih={40}><Text fw={'bold'} size={30}>Platinum Plan</Text></Center>
    <Center mx="auto" mih={40}><Text size={25} fs={'italic'} color='red.9'>Yearly</Text></Center> 
    <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
      <Image
        radius="md"
        src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
        alt="Random unsplash image"
      />
    </Box></Center>   
    <Center mih={40} mx="auto"> <Text size={25} fs={'italic'} color='blue.9'>97 PKR</Text></Center>
        <Divider />
        <Center mih={40} mx="auto"> <Text>Takes 1 day time for calls</Text></Center>
          <Button mih={40} mx="auto" fullWidth color='green.9'
         // onClick={() => {
          //  open();
         // }}
          >
              Edit
          </Button>
      </Paper>
      </Card>
        </Grid.Col>
  */}
      </Grid>
      <Box>
      <Modal opened={opened} onClose={close}  title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>Subscription Details</Text>}>
      <form onSubmit={form.onSubmit(console.log)} >
      <Box >
        <Select withAsterisk size='sm' label="Title" placeholder="Select Subscription Title" {...form.getInputProps('title')}
        data={[
            { value: 'Afghanistan', label: 'Silver Plan' },
            { value: 'Gold', label: 'Gold Plan' },
            { value: 'Platinum', label: 'Platinum Plan' },
          ]}
         />
        </Box>
        <Box >
        <Select withAsterisk size='sm' label="Type" placeholder="Select Subscription Type" {...form.getInputProps('type')}
        data={[
            { value: 'Weekly', label: 'Weekly' },
            { value: 'Monthly', label: 'Monthly' },
            { value: 'Yearly', label: 'Yearly' },
          ]}
         />
        </Box>
        <Box >
        <TextInput onChange={handleSubscriptionPriceChange} size='sm' label="Price"  placeholder="Enter Price: 865" {...form.getInputProps('price')}
        
          />
        </Box>
        <Box >
        <TextInput size='sm' label="Limit" placeholder="Enter Limit: 15" {...form.getInputProps('limit')}  />
        </Box>
        <Box >
        <TextInput withAsterisk size='sm' label="Subscription Description" placeholder="Enter Subscription Description: 23 Calls in 3 Days." {...form.getInputProps('description')}  />
        </Box>
        <Text>{subscriptionPrice}</Text>
         <Box mt={'sm'} style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button size='sm' color='red.8' >
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