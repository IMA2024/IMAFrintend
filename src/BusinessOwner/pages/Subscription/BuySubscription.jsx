import React, { useEffect, useState } from 'react'
import { Grid, Skeleton, Container, Card, Paper, Center, Image, Box, Button, Text, Divider, Group, createStyles, Modal, Select, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import {  Hourglass } from 'react-loader-spinner';

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

export default function BuySubscription() {

  const [subscriptions, setSubscriptions] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);
  const [subscribed, setSubscribed] = useState(undefined);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { user } = useContext(UserContext);

  const form = useForm({
    initialValues: { title: '', type: '', price: '', limit: '', description: '' },

    validate: {
      title: isNotEmpty('Please Select Title'),
      type: isNotEmpty('Please Select Type'),
      price: (value) => (/^\d{1,11}$/.test(value) ? null : 'Please Enter Subscription Price'),
      limit: (value) => (/^\d{1,11}$/.test(value) ? null : 'Please Enter The Number Of Calls'),
      description: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Description Must Not Be Empty'),
    },
  });

  const getSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/businessowner/viewSubscriptions');
      setSubscriptions(response?.data?.subscriptions);
      console.log(response?.data?.subscriptions);
    } catch (error) {
      console.log(error);
    }
    finally {
      setDataLoaded(true);
    }
  }

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/admin/businessesList');
      const newData =  await response.json();
      console.log(newData);

      const filteredBusinesses = newData?.filter((business) => business?.businessOwner === user?._id);

      // Update the state with the filtered businesses
      setBusinesses(filteredBusinesses);
    };
    fetchData();
  }, []);


  useEffect(() => {
    getSubscriptions();
  }, []);



  // payment integration 

  const makepayment = async (businessId, subscribed) => {
    const stripe = await loadStripe("pk_test_51Nl5XoExU3kznyi3Mj5zTvvnUs7nDh70EPm2Un3oGQDXzhNbZx3SFs5rxAraPoAaLlSOw2EouyXVrsKrwO3ilf6600y0akI2iP");

    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch("http://localhost:5000/businessOwner/makePayment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ businessId, subscribed })
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <Container my="md">
     {dataLoaded ? ( 
      <Grid gutter={'xs'}> 
        {subscriptions.map((subscription, index) => (
          <Grid.Col xs={6} sm={4} md={4} radius="md" >
            <Card radius="md">
              <Paper radius="md" mih={300}
              //bg={theme.fn.linearGradient(45, '#FFF3BF', '#B197FC')}
              >
                <Center mx="auto" mih={40}><Text size={30} h={100}>{subscription.title}</Text></Center>
                <Center mx="auto" mih={40} mb={20}><Text size={25} fs={'italic'} color='red.9'>{subscription.type}</Text></Center>
                <Center mx="auto" mih={100}> <Box maw={160} mx="auto">
                  <Image
                    radius="md"
                    // src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
                    src="https://www.5startoolboxstore.com/wp-content/uploads/2021/02/130073453-subscription-label-subscription-red-band-sign-subscription.jpg"
                    alt="Random unsplash image"
                  />
                </Box></Center>
                <Center mb={20} mih={40} mx="auto"> <Text size={25} fs={'italic'} color='blue.9'>{subscription.price} $</Text></Center>
                <Divider />
                <Center mih={40} mx="auto"> <Text>{subscription.description}</Text></Center>
                <Button mih={40} mx="auto" fullWidth color='green.9'
                  onClick={() => {
                    setSubscribed(subscription);
                    if (subscriptionStatus == false) {
                      setSlowTransitionOpened(true);
                    }
                    else {
                      setNoTransitionOpened(true)
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Paper>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
       ) : (
        // Render the loading spinner when data is not yet loaded
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#0096FF', '	#FF5F1F']}
        />
        </div>
      )}
      <Box>
    
        <Modal opened={slowTransitionOpened} onClose={() => setSlowTransitionOpened(false)} title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Select the business for subscription</Text>} transitionProps={{ transition: 'rotate-left' }}>
        {businesses?.map((business, index) => (
          <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <Text mb={20}>{business?.name}</Text>
          <Button type="submit" size='sm' color='green.9' onClick={() => makepayment(business?._id,subscribed)}>Subscribe</Button>
          </Box>
          ))}
          <Box mt={'xl'} style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
            <Button size='sm' color='red.8' onClick={() => setSlowTransitionOpened(false)}>Cancel</Button>

          </Box>
        </Modal>
         
        <Modal
          opened={noTransitionOpened}
          onClose={() => setNoTransitionOpened(false)}
          transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
          title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Please consider this</Text>}
        >
          <Text>You cant subscribe to more than one subscription for your business.</Text>
          <Box mt={'xl'} style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
            <Button size='sm' color='red.8' onClick={() => setNoTransitionOpened(false)}>Close Message</Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}