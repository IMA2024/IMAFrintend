import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Button, Box, createStyles, Paper, Title, Select, MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import React, { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import { addQuestionnaire } from '../../../api/businessOwner/questionnaire';
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

export default function AddQuestionnaire() {

  const [businesses, setBusinesses] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [minimumQuestionsError, setMinimumQuestionsError] = useState(false);
  const { user } = useContext(UserContext);
  const { classes } = useStyles();
  const navigate = useNavigate();


  const form = useForm({
    initialValues: {
      businessId: '',
      ...questionnaire.reduce(
        (acc, _, index) => ({
          ...acc,
          [`question${index + 1}`]: '',
          [`answer${index + 1}`]: '',
        }),
        {}
      ),
    },

    validate: {
      businessId: isNotEmpty('Please Select Business Name'),
    },

  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/businessesList');
      const newData = await response.json();
      console.log(newData);
      const filteredBusinesses = newData.filter((business) => business?.businessOwner === user?._id);
      setBusinesses(filteredBusinesses);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const { businessId } = values;

    const hasEmptyQuestion = questionnaire.some((item) => !item.question.trim());

  if (hasEmptyQuestion) {
    return notifications.show({ message: 'All questions must be filled out', color: 'red' });
  }

  const hasQuestionWithoutOptions = questionnaire.some((item) => !item.options.length);

  if (hasQuestionWithoutOptions) {
    return notifications.show({ message: 'All Options must have options', color: 'red' });
  }

  if (questionnaire.length < 5) {
    return notifications.show({ message: 'Add Atleast 5 Questions', color: 'red' });
  }

  try {
    const response = await addQuestionnaire(businessId, questionnaire);
    if (response.status === 201) {
      form.reset();
      setQuestionnaire([]);
      notifications.show({ message: 'Questionnaire Added Successfully', color: 'green' });
    }
  } catch (error) {
    notifications.show({ message: error.response.data.message, color: 'red' });
  }
};

  const handleAddQuestion = () => {
    if (questionnaire.length < 10) {
      setQuestionnaire([...questionnaire, { question: '', options: [] }]);
    } else {
      notifications.show({
        message: 'You can only add a maximum of 10 questions.',
        color: 'red',
      });
    }
  };

  const handleCancel = () => {
    navigate('/BusinessPanelDashboard');
  };

  return (
    <Paper withBorder shadow="md" p={35} radius="md">
      <Title order={2} align="center" sx={{ fontWeight: 550 }}>
        Add Questionnaire
      </Title>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box>
          <Select withAsterisk size='sm' label="Business Name" placeholder="Select Business Name" {...form.getInputProps('businessId')}
            data={businesses.map((business) => ({
              value: `${business?._id}`,
              label: `${business?.name}`,
            }))}
          />
        </Box>
        {questionnaire.map((item, index) => (
          <div key={index}>
            <Box mt="sm" className={classes.responsiveContainer}>
              <TextInput
                className={classes.inputField}
                maxLength={200}
                withAsterisk
                size="sm"
                label={`Question ${index + 1}`}
                placeholder="Enter Question"
                onChange={(event) => {
                  let newQuestionare = [...questionnaire];
                  let currentQuestion = newQuestionare[index];
                  currentQuestion.question = event.currentTarget.value;
                  newQuestionare[index] = currentQuestion;
                  setQuestionnaire(newQuestionare);
                }}
                value={item.question}
              />
              <MultiSelect
                className={classes.inputField}
                withAsterisk
                size="sm"
                label={`Answer ${index + 1}`}
                placeholder="Enter Answer"
                value={item.options}
                onChange={(options) => {
                  let newQuestionare = [...questionnaire];
                  let currentQuestion = newQuestionare[index];
                  currentQuestion.options = options;
                  newQuestionare[index] = currentQuestion;
                  setQuestionnaire(newQuestionare);
                  console.log(newQuestionare);
                }}
                // {...form.getInputProps(`answer${index + 1}`)}
                data={
                  [
                    { value: 'Yes', label: 'Yes' },
                    { value: 'G', label: 'G' },
                    { value: 'Han', label: 'Han' },
                    { value: 'Han g', label: 'Han g' },
                    { value: 'No', label: 'No' },
                    { value: 'Nahi', label: 'Nahi' },
                    { value: 'Nopes', label: 'Nopes' },
                  ]
                }
              />
            </Box>
          </div>
        ))}
        <Box style={{ display: 'flex', justifyContent: 'left', gap: '20px' }} onClick={handleAddQuestion}>
          <Button mt="sm" size="sm" variant="outline">
            + Add Question
          </Button>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="sm" size="sm" color="red.8" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button type="submit" mt="sm" size="sm" color="green.9" disabled={minimumQuestionsError}>
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
