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

export default function ViewTerms() {
  const { classes } = useStyles();
  
  

  return (
    <Paper withBorder shadow="md" pt={35} pb={35} pl={35} pr={35} radius="md">
      <Title mb={10} order={2} align="center" sx={{ fontWeight: 550 }} >
        Terms & Conditions
      </Title>
      <Divider mb={30} />
      <Box>
        <Text align='justify' >
        We kindly request that, by accessing and using the IMA (Intelligent Marketing Agent) web application, you agree to graciously abide by these Terms and Conditions. Your decision to continue using the application reflects your acceptance of these terms, and we thank you for your trust in us.
        </Text>
        <Text align='justufy' mt={'md'}>
        Should you, in your discretion, find any aspect of these terms disagreeable, we respectfully invite you not to make use of the application. We understand that each user's perspective is unique, and we respect your choices. Your understanding and cooperation are greatly appreciated, as they help us maintain a harmonious and productive user community.
        </Text>

      </Box>
      
    </Paper>
  );
}
