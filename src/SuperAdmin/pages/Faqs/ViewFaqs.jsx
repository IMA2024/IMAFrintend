import React from 'react';
import { createStyles, Image, Accordion, Grid, Col, Container, Title, Button, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { deleteFAQ } from '../../../api/admin/faq';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
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

export default function ViewFaqs() {
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
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image src="https://ui.mantine.dev/_next/static/media/image.b0c2306b.svg" alt="Frequently Asked Questions" />
          </Col>
          <Col span={12} md={6}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>
            <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated" data= {filteredFAQs}>
              {FAQs.map((item, index) => (
                <Accordion.Item key={index} className={classes.item} value={`item-${index}`}>
                  <Accordion.Control>
                    <div className={classes.questionContainer}>
                      <Text className={classes.questionText}>{item.question}</Text>
                      <IconEdit size={18} onClick={() => handleEdit(item)} />
                      <IconTrash size={18} onClick={() => handleDelete(item._id)}/>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
