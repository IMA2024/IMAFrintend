import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Container, createStyles, Paper, Textarea, Title, Divider, Box } from '@mantine/core';
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

export default function FaqForm() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { question: '', answer: '' },
    validateInputOnChange: true,
    validate: {
      question: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Question Must Contain Less Than 100 Alphabets'),
      answer: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Answer Must Contain Less Than 200 Alphabets'),
    },
  });

  const handleSubmit = async (values) => {
    const { question, answer } = values;

    try {
      const response = await addFAQ(question, answer);
      if (response.status === 201 || response.status === 200) {
        form.reset();
        notifications.show({ message: `FAQ Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  const handleCancel = () => {
    navigate('/Dashboard');
  };

  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35} radius="md">
      <Title mb={10} order={2} align="center" sx={{ fontWeight: 550 }}>
        Add FAQ
      </Title>
      <Divider mb={30} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box className={classes.responsiveContainer}>
          <Textarea
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Question"
            placeholder="Enter Question"
            {...form.getInputProps('question')}
            maxLength={100}
          />
          <Textarea
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Answer"
            placeholder="Enter Answer"
            {...form.getInputProps('answer')}
            maxLength={200}
          />
        </Box>
        <Container mt="sm" style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="sm" size="sm" color="red.8" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button type="submit" mt="sm" size="sm" color="green.9">
            Submit
          </Button>
        </Container>
      </form>
    </Paper>
  );
}
