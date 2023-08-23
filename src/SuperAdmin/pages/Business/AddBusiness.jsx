import { isNotEmpty, useForm } from '@mantine/form';
import { Image, TextInput, Button, Box, createStyles, Paper, Title, Divider, Select, Textarea } from '@mantine/core';
import { useState, useEffect } from 'react';
import { addBusiness } from '../../../api/admin/businesses';
import { storage } from '../../../firebase';
import { v4 } from "uuid";
import { getDownloadURL, ref , uploadBytes } from '@firebase/storage';
import { Dropzone } from '@mantine/dropzone';
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

export default function AddBusiness() {
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics, setProfilePics] = useState('')
  const [countries, setCountries] = useState([]);
  const { classes } = useStyles()

  const form = useForm({
    initialValues: { name: '', businessOwner: '', type: '', phoneNumber: '', address: '', email: '', description: '' },
    validateInputOnChange: true,
    validate: {
      type: isNotEmpty('Please Select Business Type'),
      name: (value) => (/^[A-Za-z ]{3,30}$/.test(value) ? null : 'Business Name Should be between 3 and 30 Characters'),
      businessOwner: isNotEmpty('Please Select Business Owner'),
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please Enter Valid Email i.e business@gmail.com'),
      phoneNumber: (value) => (/^\d{11}$/.test(value) ? null : 'Phone Number should be 11 Digit'),
      address: (value) => (/^[a-zA-Z0-9\s,.\-!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~]{20,100}$/.test(value) ? null : 'Address Should be between 10 and 150 Characters'),
      description: (value) => (/^(?!\s*$).*/.test(value) ? null : 'Business Description Must Not Be Empty')
    },
  });

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/admin/businessOwnersList');
      const newData =  await response.json();
      console.log(newData);
      setCountries(newData);
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
      notifications.show({ message: "Error uploading picture.", color: 'red' });
    }
  };

  const handleSubmit = async (values) => {
    const { type , name , businessOwner, email, address, phoneNumber, description } = values;

    try {
      const response = await addBusiness(profilePics, type , name , businessOwner, email, address, phoneNumber, description);
      if (response.status === 201 || response.status === 200 ) {
        form.reset();
        setProfilePics('');
        setImageUpload(null);
        notifications.show({ message: `Business Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35} radius="md">
      <Title
        order={2}
        align="center"
        sx={{ fontWeight: 550 }}
      >
        Add Business
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box>
          <Select withAsterisk size='sm' label="Business Type" placeholder="Select Business Type" {...form.getInputProps('type')}
            data={[
              { value: 'Commercial', label: 'Commercial' },
              { value: 'Industrial', label: 'Industrial' },
            ]}
          />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
          <TextInput withAsterisk size='sm' className={classes.inputField} label="Business Name" placeholder="Enter Business Name: Jinnah Heights" {...form.getInputProps('name')} />
          <Select withAsterisk size='sm' className={classes.inputField} label="Business Owner Name" placeholder="Select Business Owner Name" {...form.getInputProps('businessOwner')}
            data={countries.map((country) => ({
              value: `${country._id}`,
              label: `${country.firstName} ${country.lastName}`,
            }))}
          />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
          <TextInput withAsterisk size='sm' className={classes.inputField} label="Email" placeholder="Enter Email: JohnCena@gmail.com" {...form.getInputProps('email')} />
          <TextInput withAsterisk size='sm' label="Phone Number" placeholder="Enter Phone Number: 03001234567" className={classes.inputField} {...form.getInputProps('phoneNumber')} />
        </Box>
        <Box mt="sm" >
          <TextInput withAsterisk size='sm' label="Address" placeholder="Enter Address: Street 21, F7, Islamabad." {...form.getInputProps('address')} />
        </Box>
        <Box mt="sm" >
          <Textarea withAsterisk size='sm' label="Business Description" placeholder="Enter Business Description: Car Business." {...form.getInputProps('description')} />
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
              src={profilePics || (imageUpload ? URL.createObjectURL(imageUpload[0]) : '')}
            />
          </Dropzone>
          <Button disabled={!imageUpload} onClick={() => { handleUploadImage() }} style={{ marginTop: 15}}>
            Upload Image
          </Button>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button size='sm' color='red.8' >
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