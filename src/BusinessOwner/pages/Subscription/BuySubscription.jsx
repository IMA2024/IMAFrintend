import React, { useEffect, useState } from 'react'
import { Grid, Skeleton, Container, Card, Paper, Center, Image, Box, Button, Text, Divider, Group, createStyles, Modal, Select, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import axios from 'axios';

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
  const [opened, { open, close }] = useDisclosure(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);

  const form = useForm({
    initialValues: { title: '' , type: '' , price: '', limit: '', description: '' },

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
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  const handleSubmit = async () => {
    const response = await axios.get('http://localhost:5000/businessowner/selectSubscription');
    console.log(response);
  };

  return (
    <Container my="md">
      <Grid gutter={'xs'}>
        {subscriptions.map((subscription, index) => (
                   <Grid.Col xs={6} sm={4} md={4} radius="md" >
                   <Card radius="md">
                     <Paper radius="md" mih={300} 
                     //bg={theme.fn.linearGradient(45, '#FFF3BF', '#B197FC')}
                     >
                       <Center mx="auto" mih={40}><Text  size={30} h={100}>{subscription.title}</Text></Center>
                       <Center mx="auto" mih={40} mb={20}><Text size={25} fs={'italic'} color='red.9'>{subscription.type}</Text></Center>
                       <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
                         <Image
                           radius="md"
                           src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
                           alt="Random unsplash image"
                         />
               </Box></Center>
                       <Center mb={20} mih={40} mx="auto"> <Text size={25} fs={'italic'} color='blue.9'>{subscription.price}</Text></Center>
                       <Divider />
                       <Center mih={40} mx="auto"> <Text>{subscription.description}</Text></Center>
                <Button mih={40} mx="auto" fullWidth color='green.9'
                  onClick={() => {
                    if(subscriptionStatus == false){
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
      <Box>
        <Modal  opened={slowTransitionOpened} onClose={() => setSlowTransitionOpened(false)} title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Subscription Confirmation</Text>} transitionProps={{ transition: 'rotate-left' }}>
            <Text>Are you sure you want to subscribe?</Text>
            <Box mt={'xl'} style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
            <Button size='sm' color='red.8' onClick={() => setSlowTransitionOpened(false)}>Cancel</Button>
            <Button type="submit" size='sm' color='green.9' onClick={() => handleSubmit()}>Subscribe</Button>
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
        <Button  size='sm' color='red.8' onClick={() => setNoTransitionOpened(false)}>Close Message</Button>
        </Box>
      </Modal>
      </Box>
    </Container>
  );
}