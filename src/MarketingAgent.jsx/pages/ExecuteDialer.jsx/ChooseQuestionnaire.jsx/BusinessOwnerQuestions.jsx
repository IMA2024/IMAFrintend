import React from 'react';
import { createStyles, Image, Accordion, Grid, Col, Container, Title, Button, Text, Box, Group } from '@mantine/core';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useState , useEffect } from 'react';
import axios from 'axios';
//import { deleteFAQ } from '../../../api/admin/faq';
import { deleteFAQ } from '../../../../api/admin/faq';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
   // paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
  },

  questionContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  questionText: {
    flex: 1,
  },
}));

export default function BusinessOwnerQuestions({nextStep, prevStep}) {
  const [FAQs, setFAQs] =  useState([]);
  const [filteredFAQs, setFilteredFAQs] =  useState([]);
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate('/EditFaqs', { state: { rowData: item } });
  };

  const handleDelete = async (id) => {
    try {
      await deleteFAQ(id);
      const updatedFAQs = FAQs.filter((faq) => faq._id !== id);
      setFAQs(updatedFAQs);
      setFilteredFAQs(updatedFAQs);
      notifications.show({ message: "FAQ Deleted Successfully", color: 'red' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextStep = () => {
    console.log('hi');
    nextStep()
  };

  const getFAQs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/viewAllFAQs');
      setFAQs(response?.data?.FAQs);
      setFilteredFAQs(response?.data?.FAQs);
      console.log(response?.data?.FAQs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFAQs();
    }, []);

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" >
            {/*
          <Col span={12} md={6}>
            <Image src="https://ui.mantine.dev/_next/static/media/image.b0c2306b.svg" alt="Frequently Asked Questions" />
          </Col>
  */}
          <Col >
            <Title order={2} ta="left" className={classes.title}>
              Business Owner Questionnaire
            </Title>
            <Accordion chevron={<Text display={'none'}><IconPlus size="1rem" /></Text>} defaultValue="reset-password" variant="default" data= {filteredFAQs}>
              {FAQs.map((item, index) => (
                <Accordion.Item key={index} className={classes.item} value={`item-${index}`}>
                  <Accordion.Control>
                    <div className={classes.questionContainer}>
                      <Text className={classes.questionText}>{item.question}</Text>
                    </div>
                  </Accordion.Control>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Grid>
      </Container>
      <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
      <Button  mt="sm"  size='sm' color='red.8' >
          Cancel
        </Button>
        <Button type="submit" mt="sm"  size='sm' color='green.9' >
          Choose
        </Button>
        </Box>
        <Group position="center" mt="xl">
        <Button variant="default">Back</Button>
        <Button onClick={handleNextStep}>Next step</Button>
      </Group>
    </div>
  );
}
