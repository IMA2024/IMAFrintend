import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Container, createStyles, Paper, Textarea, Title, Divider, Box} from '@mantine/core';

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

export default function FaqForm() {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { question: '', answer: '' },
    validateInputOnChange: true,
    validate: {
      question: (value) => (value.trim() !== '' ? null : 'Question must not be empty'),
      answer: (value) => (value.trim() !== '' ? null : 'Answer must not be empty'),
    },
  });

  const handleSubmit = (values) => {
    // Handle submission logic, e.g., sending data to server or saving locally
    console.log(values);
    form.reset();
  };

  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35} radius="md">
      <Title mb={10} order={2} align="center" sx={{ fontWeight: 550 }}>
        Add FAQ
      </Title>
      <Divider mb={30} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
      <Box className={classes.responsiveContainer}>
        <Textarea
          withAsterisk
          size="sm"
          className={classes.inputField}
          label="Question"
          placeholder="Enter your question"
          {...form.getInputProps('question')}
          maxLength={500}
        />
        <Textarea
          withAsterisk
          size="sm"
          className={classes.inputField}
          label="Answer"
          placeholder="Enter the answer"
          {...form.getInputProps('answer')}
          maxLength={500}
        />
        </Box>
        <Container mt="sm" style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="sm" size="sm" color="red.8" onClick={form.reset}>
            Clear
          </Button>
          <Button type="submit" mt="sm" size="sm" color="green.9">
            Submit
          </Button>
        </Container>
      </form>
    </Paper>
  );
}
