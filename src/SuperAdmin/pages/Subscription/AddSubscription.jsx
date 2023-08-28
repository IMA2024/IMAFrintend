import { isNotEmpty, useForm } from '@mantine/form';
import { Image, TextInput, Button, Box, createStyles, Paper, PasswordInput, Title, Divider, Select } from '@mantine/core';
import { useState } from 'react';
import { addUser } from '../../../api/admin/users';
import { storage } from '../../../firebase';
import { v4 } from "uuid";
import { getDownloadURL, ref , uploadBytes } from '@firebase/storage';
import { Dropzone } from '@mantine/dropzone';
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
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics , setProfilePics] = useState('');

  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { title: '', type: '' , price: '', limit: '', description: '' },

    validate: {
      title: (value) => (/^[A-Za-z ]{3,25}$/.test(value) ? null : 'Subscription Title Must Contain 3 to 25 Alphabets With a Space'),
      type: (value) => (/^[A-Za-z]{3,25}$/.test(value) ? null : 'Subscription Type Must Contain 3 to 25 Alphabets'),
      price: (value) => (/^\d{1,11}$/.test(value) ? null : 'Subscription Price Must Contain 1 to 11 digits'),
      limit: (value) => (/^\d{1,11}$/.test(value) ? null : 'Subscription Limit Must Contain 1 to 11 digits'),
      description: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Description Must Not Be Empty'),
    },
  });

  

  const handleSubmit = async (values) => {
    const { role, firstName, lastName, email, phoneNumber, password } = values;

    try {
      const response = await addUser( profilePics , role, firstName, lastName, email, phoneNumber, password);
      if (response.status === 201 || response.status === 200) {
        form.reset();
        setProfilePics('');
        setImageUpload(null);
        notifications.show({ message: `${role} Added Successfully`, color: 'green' });
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
              <TextInput maxLength={25}  sx={{'&:hover': { cursor: 'not-allowed', borderColor: 'red'}}} withAsterisk size='sm' label="Title" placeholder="Enter Subscription Title: Silver Plan" {...form.getInputProps('title')} />
            </Box>
            <Box >
              <TextInput maxLength={25} sx={{'&:hover': { cursor: 'not-allowed', borderColor: 'red'}}} withAsterisk size='sm' label="Type" placeholder="Enter Subscription Type: Monthly" {...form.getInputProps('type')} />     
            </Box>
            <Box>
              <TextInput maxLength={11} size='sm' label="Price" placeholder="Enter Price: 865" {...form.getInputProps('price')} />
            </Box>
            <Box >
              <TextInput maxLength={11}  size='sm' label="Limit" placeholder="Enter Limit: 15" {...form.getInputProps('limit')} />
            </Box>
            <Box >
              <TextInput  
                withAsterisk size='sm' label="Subscription Description" placeholder="Enter Subscription Description: 30 Calls in 3 Days." {...form.getInputProps('description')} />
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
