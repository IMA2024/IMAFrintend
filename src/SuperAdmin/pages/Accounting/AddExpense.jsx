import { isNotEmpty , useForm } from '@mantine/form';
import { Image, NumberInput, TextInput, Button, Box , createStyles, Paper, Textarea, Title, Divider, Select } from '@mantine/core';
import Datepicker from '../../../components/Date';
import { useEffect , useState } from 'react';
import { addExpense } from '../../../api/admin/accounting';
import { notifications } from '@mantine/notifications';
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

export default function AddExpense() {
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics, setProfilePics] = useState('')
  const [countries, setCountries] = useState([]);
  const {classes} = useStyles();

  const form = useForm({
    initialValues: { title: '', business: '', description: '', date: '', amount: '' },
    validateInputOnChange: true,
    // functions will be used to validate values at corresponding key
    validate: {
      title: (value) => (/^[a-zA-Z\s]{3,20}$/.test(value) ? null : 'Title Should Contain Atleast 3 Alphabets'),
      business: isNotEmpty('Please Select Business'),
      description: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Business Details Must Not Be Empty'),
      date: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Date Must Not Be Empty '),
      amount: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Business Amount Must Not Be Empty '),
    },
  });

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/admin/businessesList');
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
    const { title , business , description , date , amount } = values;

    try {
      const response = await addExpense( title , business , description , date , amount );
      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Expense Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35}  radius="md">
       <Title
          mb={10}
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          Add Expense Details
        </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box className={classes.responsiveContainer}>
        <TextInput withAsterisk size='sm' className={classes.inputField} label="Title" placeholder="Enter Title: Car Business" {...form.getInputProps('title')} />
        <Select withAsterisk size='sm' className={classes.inputField} label="Business Name" placeholder="Select Business Name" {...form.getInputProps('business')}
             data={countries.map((country) => ({
              value: `${country._id}`,
              label: `${country.name}`,
            }))}
         />
        </Box>
        <Box className={classes.responsiveContainer} mt="sm" >
        <Datepicker withAsterisk label="Date" placeholder="Select Date" className={classes.inputField}  {...form.getInputProps('date')} />
        <NumberInput withAsterisk size='sm' label="Business Amount" placeholder="Enter Business Amount: 121"  className={classes.inputField} {...form.getInputProps('amount')}   />
         </Box>
         <Textarea withAsterisk size='sm' mt="sm" label="Revenue Details" placeholder="Enter Revenue Details: This Revenue Is Related To Cars." {...form.getInputProps('description')} />
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