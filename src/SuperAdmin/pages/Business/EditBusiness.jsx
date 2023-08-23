import { isNotEmpty , useForm } from '@mantine/form';
import { Image , TextInput, Button, Box , createStyles, Paper, Title, Divider, Select, Textarea } from '@mantine/core';
import { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { updateBusiness } from '../../../api/admin/businesses';
import { storage } from '../../../firebase';
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
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

export default function EditBusiness() {
  const location = useLocation();
  const rowData = location.state.rowData;
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics, setProfilePics] = useState('')

  const form = useForm({
    initialValues: {businessId: rowData._id , name: rowData.name , businessOwner: rowData.businessOwner, type: rowData.type, phoneNumber: rowData.phoneNumber, address: rowData.address, email: rowData.email , description: rowData.description },
    validateInputOnChange: true,
    validate: {
      type: isNotEmpty('Please Select Business Type'),
      name: (value) => (/^[A-Za-z ]{3,30}$/.test(value) ? null : 'Business Name Must Contain 3 to 30 Characters'),
      businessOwner: isNotEmpty('Please Select Business Owner'),
      email: (value) => { const isValidFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) || /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      if (!isValidFormat) {
        return 'Please Enter a Valid Email i.e. business@gmail.com or business123@gmail.com';
      }
      if (value.length > 25) {
        return 'Email Length Must Not Exceed 25 Characters';
      }
      return null;},       
      phoneNumber: (value) => (/^\d{11}$/.test(value) ? null : 'Phone Number Must Be 11 Digits'),
      address: (value) => (/^[a-zA-Z0-9\s,.\-!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~]{20,100}$/.test(value) ? null : 'Address Must Contain 10 to 150 Characters'),
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
    const { businessId, type, name, businessOwner, address, phoneNumber, description } = values;

    try {
      const response = await updateBusiness(businessId, profilePics, type, name, businessOwner, address, phoneNumber, description );
      if (response.status === 201 || response.status === 200 ) {
        form.reset();
        setProfilePics('');
        setImageUpload(null);
        navigate('/ViewBusiness');
        notifications.show({ message: `Business Updated Successfully`, color: 'green' });
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
          Update Business
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
        <TextInput maxLength={30} withAsterisk size='sm' className={classes.inputField} label="Business Name" placeholder="Edit Business Name" {...form.getInputProps('name')} />
        <Select withAsterisk size='sm' className={classes.inputField} label="Business Owner Name" placeholder="Select Business Owner Name" {...form.getInputProps('businessOwner')}
        data={countries.map((country) => ({
          value: `${country._id}`,
          label: `${country.firstName} ${country.lastName}`,
        }))}
         />
        </Box>
        <Box mt="sm"  className={classes.responsiveContainer}>
        <TextInput maxLength={25} disabled sx={{'&:hover': { cursor: 'not-allowed', borderColor: 'red'}}} withAsterisk size='sm' className={classes.inputField} label="Email" placeholder="Edit Business Email" {...form.getInputProps('email')} />
         <TextInput maxLength={11} withAsterisk size='sm' label="Phone Number" placeholder="Edit Business Phone Number"  className={classes.inputField} {...form.getInputProps('phoneNumber')} />
        </Box>
        <Box mt="sm" >
        <TextInput maxLength={150} withAsterisk size='sm' label="Address" placeholder="Edit Business Address" {...form.getInputProps('address')} />
        </Box>
        <Box mt="sm" >
        <Textarea maxLength={500} withAsterisk size='sm' label="Business Description" placeholder="Edit Business Description" {...form.getInputProps('description')}  />
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
              src={imageUpload ? URL.createObjectURL(imageUpload[0]) : rowData.profilePic}
            />
          </Dropzone>
          <Button disabled={!imageUpload} onClick={() => { handleUploadImage() }} style={{ marginTop: 15}}>
            Upload Image
          </Button>
        </Box>
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
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