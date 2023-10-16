import { isNotEmpty , useForm } from '@mantine/form';
import { Button, Box , createStyles, Paper, Textarea, Title, Divider, Select, TextInput, Group, Image } from '@mantine/core';
import { useEffect , useState } from 'react';
import { addAgent } from '../../../api/marketingAgent/agent';
import { notifications } from '@mantine/notifications';
import React, { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import axios from "axios"
import { storage } from '../../../firebase';
import { v4 } from "uuid";
import { getDownloadURL, ref , uploadBytes } from '@firebase/storage';
import { Dropzone } from '@mantine/dropzone';

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

export default function AutoDialer() {
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics, setProfilePics] = useState('')
  const [countries, setCountries] = useState([]);
  const { user } = useContext(UserContext);
  const {classes} = useStyles();

  const form = useForm({
    initialValues: { name: '', voice: '', action: '', extension:'' },
    validateInputOnChange: true,
    validate: {
      name: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Agent Name Must Contain 3 to 20 Alphabets'),
      voice: isNotEmpty('Please Select Agent Voice'),
      action: isNotEmpty('Please Enter Action'),
      extension: isNotEmpty('Please Enter Extension'),
    },
  });

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/admin/businessesList');
      const newData =  await response.json();
      const filteredBusinesses = newData.filter((business) => business?.businessOwner === user?._id);
      setCountries(filteredBusinesses);
    };
    fetchData();
  }, []);

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
      notifications.show({ message: "Error Uploading Picture.", color: 'red' });
    }
  };

//-------------------------- Changes Here-----------------------------------
const handleSubmit = async (values) => {
    {/*
  try {
    const response = await axios.post('http://127.0.0.1:5000/execute_dialer', {
      phoneNumber: values.phoneNumber,
      extension: values.extension,
    });

    if (response.status === 200) {
      // Success, handle it here
      console.log('Dialer executed successfully');
    } else {
      console.error('Failed to execute dialer');
    }
  } catch (error) {
    console.error('Error executing dialer:', error);
  }

  nextStep();
*/}
};

//------------------------- Changes Closed --------------------------------------

  const handleBack = () => {
    prevStep();
  };

  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
       <Title
           align="center"
           order={2}
           sx={{ fontWeight: 550 }}
           mb={5}
        >
          Execute Auto Dialer
        </Title>
      
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
      <Box mt="sm"  className={classes.responsiveContainer}>
        <Select withAsterisk size='sm' className={classes.inputField} label="Agent Name" placeholder="Enter Agent Name: Amna" {...form.getInputProps('name')} 
         data={[
          { value: 'Amna', label: 'Amna' },
          { value: 'Laraib', label: 'Laraib' },
          { value: 'Abdullah', label: 'Abdullah' },
          { value: 'Afnan', label: 'Afnan' },
          { value: 'Ali', label: 'Ali' },
        ]}
        />
        <Select withAsterisk size='sm' className={classes.inputField} label="Agent Voice" placeholder="Select Agent Voice" {...form.getInputProps('voice')}
            data={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
         />
        </Box>
        <Box mt="sm"  className={classes.responsiveContainer}>
        <TextInput maxLength={11} withAsterisk size='sm' label="Action" placeholder="Enter User Action" className={classes.inputField} {...form.getInputProps('action')} />
        <TextInput  withAsterisk size='sm' label="Extension" placeholder="Enter Extension" className={classes.inputField} {...form.getInputProps('extension')} />
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
            accept={['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
            size="lg"
            value={imageUpload ? imageUpload.name : ''}
          >
            <Image
              height={139}
              width={139}
              sx={{ resize: 'contain', marginTop: -15, marginLeft: -15 }}
              src={profilePics || (imageUpload ? URL.createObjectURL(imageUpload[0]) : '')}
            />
          </Dropzone>
          <Button disabled={!imageUpload} onClick={() => { handleUploadImage() }} style={{ marginTop: 15}}>
            Upload CSV File
          </Button>
        </Box>
          
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button  mt="lg"  size='sm' color='red.8' >
          Cancel
        </Button>
        <Button  mt="lg"  size='sm' color='green.9' type='submit' >
          Run
        </Button>
        </Box>
            
            {/*
        <Group position="center" mt="xl">
        <Button variant="default" onClick={() => handleBack()}>Back</Button>
        <Button type='submit'>Execute Dialer</Button>
      </Group>
        */}
      </form>
    </Paper>
  );
}