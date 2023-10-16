import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Image, Button, Box, createStyles, Paper, PasswordInput, Title, Divider, Select, Text } from '@mantine/core';
import { useState } from 'react';
import { updateUser } from '../../../api/admin/users';
import { storage } from '../../../firebase';
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';

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

export default function SettingsMA() {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics, setProfilePics] = useState('')

  const form = useForm({
    initialValues: { userId: user?._id , profilePics : user?.profilePic ,firstName: user?.firstName, lastName: user?.lastName, role: user?.role , phoneNumber: user?.phoneNumber ,email: user?.email},
    validateInputOnChange: true,
    validate: {
      role: isNotEmpty('Please Select A Role'),
      firstName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'First Name Must Contain 3 to 20 Alphabets'),
      lastName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Last Name Must Contain 3 to 20 Alphabets'),
      phoneNumber: (value) => (/^\d{11}$/.test(value) ? null : 'Phone Number Must Be 11 Digits'),
      email: (value) => { const isValidFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) || /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      if (!isValidFormat) {
        return 'Please Enter a Valid Email i.e. user@gmail.com or user1223@gmail.com';
      }
      if (value.length > 25) {
        return 'Email Length Must Not Exceed 25 Characters';
      }
      return null;},   } });

  const handleUploadImage = async () => {
    if (imageUpload === null) return;
  
    const imageRef = ref(storage, `images/ ${imageUpload[0].name + v4()}`);
    
    try {
      await uploadBytes(imageRef, imageUpload[0]);
      
      const url = await getDownloadURL(imageRef);
      console.log(url);
      setProfilePics(url);
      
      notifications.show({ message: "Picture Uploaded Successfully.", color: 'green' });
    } catch (error) {
      console.error(error);
      notifications.show({ message: "Error uploading picture.", color: 'red' });
    }
  };

  const handleSubmit = async (values) => {
    const { userId, role, firstName, lastName, phoneNumber } = values;

    try {
      const response = await updateUser( userId, profilePics, role,  firstName, lastName, phoneNumber );
      console.log(response);
      if (response.status === 200) {
        form.reset();
        setProfilePics('');
        setImageUpload(null);
        navigate('/DashboardMA');
        notifications.show({ message: `${role} Updated Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  const handleCancel = () => {
    navigate('/DashboardMA');
  };

  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35}radius="md">
      <Title
        align="center"
        order={2}
        sx={{ fontWeight: 550 }}
      >
        Update Your Profile
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box>
          <TextInput disabled sx={{'&:hover': { cursor: 'not-allowed', borderColor: 'red'}}} withAsterisk size='sm' label="Role" placeholder="Select Role" {...form.getInputProps('role')}
          />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
          <TextInput maxLength={20} withAsterisk size='sm' className={classes.inputField} label="First Name" placeholder="Edit First Name" {...form.getInputProps('firstName')} />
          <TextInput maxLength={20} withAsterisk size='sm' className={classes.inputField} label="Last Name" placeholder="Edit Last Name" {...form.getInputProps('lastName')} />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
          <TextInput maxLength={25} disabled size='sm' sx={{'&:hover': { cursor: 'not-allowed', borderColor: 'red'}}} withAsterisk className={classes.inputField} label="Email" placeholder="Enter Email: user@gmail.com"{...form.getInputProps('email')} />
          <TextInput  maxLength={11} withAsterisk size='sm' label="Phone Number" placeholder="Edit Phone Number" className={classes.inputField} {...form.getInputProps('phoneNumber')} />
        </Box>
        <Box mt="sm" >
          <Dropzone
            sx={{
              height: 145,
              width: 145,
            }}
            onDrop={(files) => setImageUpload(files)}
            multiple={false}
            type="file"
            accept="image/*"
            size="lg"
            value={imageUpload ? imageUpload.name : ''}
          >
            <Image
              height={139}
              width={139}
              sx={{ resize: 'contain', marginTop: -15, marginLeft: -15 }}
              src={imageUpload ? URL.createObjectURL(imageUpload[0]) : user.profilePic}
            />
          </Dropzone>
          <Button disabled={!imageUpload} onClick={() => { handleUploadImage() }} style={{ marginTop: 15}}>
            Upload Image
          </Button>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button size='sm' color='red.8' onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button type="submit" size='sm' color='green.9' >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}