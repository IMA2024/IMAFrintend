import React, { useState, useContext } from 'react';
import { TextInput, Button, Box, createStyles, Paper, Title, Select, MultiSelect } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { UserContext } from '../../../context/users/userContext';
import { addQuestionnaire } from '../../../api/businessOwner/questionnaire';

const useStyles = createStyles((theme) => ({
  responsiveContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  inputField: {
    width: '50%',

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

export default function AddQuestionnaire() {
  const { user } = useContext(UserContext);
  const { classes } = useStyles();

  const [businessName, setBusinessName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!businessName || questions.some((q) => !q) || answers.some((a) => !a)) {
      notifications.show({
        title: 'All fields must be filled',
        message: 'All fields must be filled 🤥',
      });
      return;
    }

    // Your submission logic here
  };

  const handleAddQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, '']);
      setAnswers([...answers, '']);
    } else {
      notifications.show({
        title: 'Limit reached',
        message: 'You cannot add more than 10 questions and answers',
      });
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <Paper withBorder shadow="md" p={35} radius="md">
      <Title order={2} align="center" sx={{ fontWeight: 550 }}>
        Add Questionnaire
      </Title>

      <form onSubmit={handleSubmit}>
        <Box>
          <Select
            withAsterisk
            size="sm"
            label="Business Name"
            placeholder="Select Business Name"
            value={businessName}
            onChange={(value) => setBusinessName(value)}
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Box>

        {questions.map((question, index) => (
          <Box key={index} mt="sm" className={classes.responsiveContainer}>
            <TextInput
              className={classes.inputField}
              maxLength={200}
              withAsterisk
              size="sm"
              label={`Question ${index + 1}`}
              placeholder={`Enter Question ${index + 1}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <MultiSelect
              className={classes.inputField}
              withAsterisk
              size="sm"
              label={`Answer ${index + 1}`}
              placeholder={`Enter Answer ${index + 1}`}
              value={answers[index]}
              onChange={(value) => handleAnswerChange(index, value)}
              data={[
                { value: 'Yes', label: 'Yes' },
                { value: 'G', label: 'G' },
                { value: 'Han', label: 'Han' },
                { value: 'Han g', label: 'Han g' },
                { value: 'No', label: 'No' },
                { value: 'Nahi', label: 'Nahi' },
                { value: 'Nopes', label: 'Nopes' },
              ]}
            />
          </Box>
        ))}

        <Box style={{ display: 'flex', justifyContent: 'left', gap: '20px' }} onClick={handleAddQuestion}>
          <Button mt="sm" size="sm" variant="outline">
            + Add Question
          </Button>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="sm" size="sm" color="red.8">
            Cancel
          </Button>
          <Button type="submit" mt="sm" size="sm" color="green.9">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
