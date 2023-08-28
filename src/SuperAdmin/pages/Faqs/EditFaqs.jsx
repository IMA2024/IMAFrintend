import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Container, createStyles, Paper, Textarea, Title, Divider, Box } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { updateFAQ } from '../../../api/admin/faq';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

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

export default function EditFaqs() {
  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state.rowData;

  const form = useForm({
    initialValues: { FaqId: rowData._id, questions: rowData.question, answers: rowData.answer },
    validateInputOnChange: true,
    validate: {
      questions: (value) => (/^\s*$/.test(value) ? 'Question must not be empty' : null),
      answers: (value) => (/^\s*$/.test(value) ? 'Answer must not be empty' : null),
    },
  });

  const handleSubmit = async (values) => {
    const { FaqId, questions, answers } = values;

    try {
      const response = await updateFAQ(FaqId, questions, answers);
      console.log(response);
      if (response.status === 200) {
        form.reset();
        navigate('/ViewFaqs');
        notifications.show({ message: `FAQ Updated Successfully`, color: 'green' });
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
        Edit FAQ
      </Title>
      <Divider mb={30} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box className={classes.responsiveContainer}>
          <Textarea
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Question"
            placeholder="Enter Question"
            {...form.getInputProps('questions')}
            maxLength={100}
          />
          <Textarea
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Answer"
            placeholder="Enter Answer"
            {...form.getInputProps('answers')}
            maxLength={200}
          />
        </Box>
        <Container mt="sm" style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="sm" size="sm" color="red.8" onClick={() => handleCancel()}>
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
