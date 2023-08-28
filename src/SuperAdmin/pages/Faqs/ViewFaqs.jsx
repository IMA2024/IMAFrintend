import React from 'react';
import { createStyles, Image, Accordion, Grid, Col, Container, Title, Button, Text } from '@mantine/core';
import {  IconEdit,  IconTrash  } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const questionsAndAnswers = [
  {
    question: 'How can I reset my password?',
    answer: "It can't help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren't many people or Pokémon.",
  },
  {
    question: 'Can I create more than one account?',
    answer: "It can't help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren't many people or Pokémon.",
  },
  {
    question: 'How can I subscribe to the monthly newsletter?',
    answer: "It can't help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren't many people or Pokémon.",
  },
  {
    question: 'Do you store credit card information securely?',
    answer: "It can't help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren't many people or Pokémon.",
  },
  {
    question: 'What payment systems do you work with?',
    answer: "It can't help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren't many people or Pokémon.",
  },
];

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
    const { classes } = useStyles();
    const navigate = useNavigate();

    const handleEdit = (item) => {
        navigate('/EditFaqs', { state: { rowData: item } });
      };
    
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
              <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                {questionsAndAnswers.map((item, index) => (
                  <Accordion.Item key={index} className={classes.item} value={`item-${index}`}>
                    <Accordion.Control>
                      <div className={classes.questionContainer}>
                        <Text className={classes.questionText}>{item.question}</Text>
                        <IconEdit size={18} onClick={() => handleEdit(item)} />
                          <IconTrash size={18}  />
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
