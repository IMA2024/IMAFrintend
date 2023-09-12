import { isNotEmpty , useForm } from '@mantine/form';
import { TextInput, Button, Box , createStyles, Paper, Title, Select, MultiSelect } from '@mantine/core';
import { useEffect , useState } from 'react';
import { notifications } from '@mantine/notifications';
import React, { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import { addQuestionnaire } from '../../../api/businessOwner/questionnaire';

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
  const [questionnaire, setQuestionnaire] = useState([
    { question: '', answer: '' }, // Initial question and answer fields
]);
  const { user } = useContext(UserContext);
  const {classes} = useStyles();

const form = useForm({
  initialValues: {
    businessId: '',
    // Initialize question and answer fields dynamically based on the initial state
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
    // Add validation for dynamically generated question and answer fields
    ...questionnaire.reduce(
      (acc, _, index) => ({
        ...acc,
        [`question${index + 1}`]: (value) =>
          /^[a-zA-Z\s.?]{20,200}$/.test(value) ? null : 'Question Should Contain 20 to 200 Alphabets',
        [`answer${index + 1}`]: (value) =>
          /^.+$/.test(value) ? null : 'Answer Should Not Be Empty',
      }),
      {}
    ),
    
    // Additionally, add a general validation for answers using a custom function
    ...questionnaire.reduce(
      (acc, _, index) => ({
        ...acc,
        [`answer${index + 1}`]: (value) => {
          // Check if the corresponding question is not empty before validating the answer
          const questionValue = form.values[`question${index + 1}`] || '';
          if (questionValue.trim() === '') {
            return 'Please enter a question first';
          }
          return /^.+$/.test(value) ? null : 'Answer Should Not Be Empty';
        },
      }),
      {}
    ),
  },
  
});

useEffect(() =>{
  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/admin/businessesList');
    const newData =  await response.json();
    console.log(newData);

    const filteredBusinesses = newData.filter((business) => business?.businessOwner === user?._id);

    // Update the state with the filtered businesses
    setBusinesses(filteredBusinesses);
  };
  fetchData();
}, []);

  const handleSubmit = async (values) => {
    const { businessId , questionnaire } = values;
    console.log(businessId);
    console.log("////////////////////////////");
    console.log(questionnaire);    
    try {
      const response = await addQuestionnaire( businessId , questionnaire );
      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Questionnaire Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  const handleAddQuestion = () => {
    // Check if the maximum number of questions (10) has been reached before adding a new question
    if (questionnaire.length < 10) {
      // Add a new question and answer field to the state
      setQuestionnaire([...questionnaire, { question: '', answer: '' }]);
    } else {
      notifications.show({
        message: 'You can only add a maximum of 10 questions.',
        color: 'red',
      });
    }
  };

  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
       <Title
        order={2}
        align="center"
        sx={{ fontWeight: 550 }}
        >
          Add Questionnaire
        </Title>
 
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
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
                value={item.question}
                {...form.getInputProps(`question${index + 1}`)}
              />
              <MultiSelect
                className={classes.inputField}
                withAsterisk
                size="sm"
                label={`Answer ${index + 1}`}
                placeholder="Enter Answer"
                value={item.answer}
                {...form.getInputProps(`answer${index + 1}`)}
                data = {
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
        
        <Box style={{display:'flex', justifyContent:'left', gap:'20px'}} onClick={handleAddQuestion}>
        <Button  mt="sm"  size='sm' variant="outline"> 
          + Add Question
        </Button>
        </Box>
      
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button  mt="sm"  size='sm' color='red.8' >
          Cancel
        </Button>
        <Button type="submit" mt="sm"  size='sm' color='green.9' >
          Submit
        </Button>
        </Box>
      </form>
    </Paper>
  );
}