import { isNotEmpty , useForm } from '@mantine/form';
import { Image, NumberInput, TextInput, Button, Box , createStyles, Paper, Textarea, Title, Divider, Select } from '@mantine/core';
import Datepicker from '../../../components/Date';
import { useEffect , useState } from 'react';
import { addRevenue } from '../../../api/admin/accounting';
import { notifications } from '@mantine/notifications';
import { storage } from '../../../firebase';
import { v4 } from "uuid";
import { getDownloadURL, ref , uploadBytes } from '@firebase/storage';
import { Dropzone } from '@mantine/dropzone';
import { useNavigate, useLocation } from 'react-router-dom';

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

export default function EditRevenue() {
    const location = useLocation();
  const rowData = location.state.rowData;
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics, setProfilePics] = useState('')
  const [countries, setCountries] = useState([]);
  const {classes} = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { revenueId: rowData._id , title: rowData.title , business: rowData.name , description: rowData.description, date: '', amount: rowData.amount },
    validateInputOnChange: true,
    validate: {
      title: (value) => (/^[a-zA-Z\s]{3,20}$/.test(value) ? null : 'Title Must Contain Atleast 3 to 20 Alphabets'),
      business: isNotEmpty('Please Select Business'),
      description: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Business Revenue Details Must Not Be Empty'),
      date: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Please Select A Date'),
      amount: (value) => {
        if (!/^(?!\s*$).+/.test(value)) {
          return 'Business Revenue Amount Must Not Be Empty';
        }
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
          return 'Business Revenue Amount Must Be a Numeric Value';
        }
        if (numericValue > 10000000) {
          return 'Business Revenue Amount Must Not Exceed 1 Crore';
        }
        return null;
      },    },
  });


  
  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/businessesList');
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
      const response = await addRevenue( title , business , description , date , amount , profilePics );
      if (response.status === 201) {
        form.reset();
        setProfilePics('');
        setImageUpload(null);
        notifications.show({ message: `Revenue Edited Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  const handleCancel = () => {
    navigate('/Dashboard');
  };

  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35}  radius="md">
       <Title
          mb={10}
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          Edit Revenue Details
        </Title>
        <Divider mb={30} />
      <form onSubmit={form.onSubmit((values)=>handleSubmit(values))} >
        <Box className={classes.responsiveContainer}>
        <TextInput maxLength={20} withAsterisk size='sm' className={classes.inputField} label="Title" placeholder="Enter Revenue Title" {...form.getInputProps('title')} />
        <Select withAsterisk size='sm' className={classes.inputField} label="Business Name" placeholder="Select Business Name" {...form.getInputProps('business')}
             data={countries.map((country) => ({
              value: `${country?._id}`,
              label: `${country?.name}`,
            }))}
         />
        </Box>
        <Box className={classes.responsiveContainer} mt="sm" >
        <Datepicker withAsterisk label="Date" placeholder="Select Date" className={classes.inputField}  {...form.getInputProps('date')} />
        <NumberInput maxLength={10000000} withAsterisk size='sm' label="Business Revenue Amount" placeholder="Enter Business Revenue Amount"  className={classes.inputField} {...form.getInputProps('amount')}   />
         </Box>
         <Textarea maxLength={500} withAsterisk size='sm' mt="sm" label="Business Revenue Details" placeholder="Enter Business Revenue Details" {...form.getInputProps('description')} />
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
            Upload Receipt
          </Button>
        </Box>
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button  mt="sm"  size='sm' color='red.8' onClick={() => handleCancel()}>
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