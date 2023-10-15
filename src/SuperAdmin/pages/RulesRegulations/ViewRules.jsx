import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Container, createStyles, Paper, Textarea, Title, Divider, Box, Text } from '@mantine/core';
import { addFAQ } from '../../../api/admin/faq';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

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

export default function ViewRules() {
  const { classes } = useStyles();
  
  

  return (
    <Paper withBorder shadow="md" pt={35} pb={35} pl={35} pr={35} radius="md">
      <Title mb={10} order={2} align="center" sx={{ fontWeight: 550 }} >
        Rules & Regulations
      </Title>
      <Divider mb={30} />
      <Box>
        <Text fw={500}>Acceptance of Terms:</Text>
        <Text align='justify' >
We kindly request that, by accessing and using the IMA (Intelligent Marketing Agent) web application, you agree to graciously abide by these Terms and Conditions. Your decision to continue using the application reflects your acceptance of these terms, and we thank you for your trust in us.
        </Text>
        <Text fw={500} mt={'md'}>Data Privacy and Security:</Text>
        <Text align='justufy' >
        At IMA, the security and privacy of your data are of paramount importance. We are committed to safeguarding your information in accordance with our Privacy Policy, and your trust in us is sincerely valued.
        </Text>

      </Box>
      
    </Paper>
  );
}
