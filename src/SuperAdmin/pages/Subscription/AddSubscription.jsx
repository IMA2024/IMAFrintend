import { isNotEmpty , useForm } from '@mantine/form';
import { TextInput, Button, Box, createStyles, Paper, PasswordInput, Title, Divider, Select } from '@mantine/core';
import { addNewSubscription } from '../../../api/admin/subscriptions';
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

export default function AddSubscription() {

  const navigate = useNavigate();

  const form = useForm({
    initialValues: { title: '', type: '' , price: '', limit: '', description: '' },
    validateInputOnChange: true,
    validate: {
      title: isNotEmpty('Please Select Subscription Title'),
      type: isNotEmpty('Please Select Subscription Type'),
      price: (value) => (/^\d{1,11}$/.test(value) ? null : 'Subscription Price Must Contain Between 500 to 5 Lacs'),
      limit: (value) => (/^\d{1,11}$/.test(value) ? null : 'Subscription Calls Limit Must Contain 10 to 1 Lac Calls'),
      description: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Description Must Not Be Empty'),
    },
  });

  

  const handleSubmit = async (values) => {
    const { type, title, description, price, limit } = values;

    try {
      const response = await addNewSubscription( type, title, description, price, limit );
      if (response.status === 201 || response.status === 200) {
        form.reset();
        notifications.show({ message: `Subscription Added Successfully`, color: 'green' });
    }

    } catch (error) {
      notifications.show({ message: error.response.data.message , color: 'red' , });
    }
};

const handleCancel = () => {
  navigate('/Dashboard');
};


  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35} radius="md">
      <Title
        align="center"
        order={2}
        sx={{ fontWeight: 550 }}
      >
        Add Subscription
      </Title>
      {/*
      <Divider mb={20} />
  */}
 
    <form onSubmit= {form.onSubmit((values) => handleSubmit(values))} >
            <Box >
            <Select withAsterisk size='sm' label="Title" placeholder="Select Subscription Title" {...form.getInputProps('title')}
            data={[
              { value: 'Silver Plan', label: 'Silver Plan' },
              { value: 'Gold Plan', label: 'Gold Plan' },
              { value: 'Platinum Plan', label: 'Platinum Plan' },
            ]}
          /></Box>
            <Box >
            <Select withAsterisk size='sm' label="Type" placeholder="Select Subscription Type" {...form.getInputProps('type')}
            data={[
              { value: 'Weekly', label: 'Weekly' },
              { value: 'Monthly', label: 'Monthly' },
              { value: 'Yearly', label: 'Yearly' },
            ]}
          /></Box>
            <Box>
              <TextInput maxLength={6} withAsterisk size='sm' label="Price" placeholder="Enter Subscription Price" {...form.getInputProps('price')} />
            </Box>
            <Box >
              <TextInput maxLength={6} withAsterisk size='sm' label="Limit" placeholder="Enter Calls Limit" {...form.getInputProps('limit')} />
            </Box>
            <Box >
              <TextInput  maxLength={300}
                withAsterisk size='sm' label="Subscription Description" placeholder="Enter Subscription Description" {...form.getInputProps('description')} />
            </Box>
            <Box mt={'sm'} style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
              <Button size='sm' color='red.8' onClick={() => handleCancel()} >
                Cancel
              </Button>
              <Button type="submit" size='sm' color='green.9' >
                Submit
              </Button>
            </Box>
          </form>
    </Paper>
  );
};
