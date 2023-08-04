import { createStyles, Image, Accordion, Grid, Col, Container, Title, Box, Button, SimpleGrid, Input, useMantineTheme, ActionIcon, Group, AspectRatio,
    TextInput,
      PasswordInput,
      Checkbox,
      Anchor,
      Paper,
      Text,
      Select,
      FileInput,
      Flex,  
      MediaQuery
  } from '@mantine/core';
  import {
   IconBulb,
   IconUser,
   IconCheckbox,
   IconSearch,
   IconPlus,
   IconSelector,
   IconMoon,
   IconHome2,
   IconMessage2,
   IconLocation,
   IconBrandWhatsapp,
   IconPhoneCall,
   IconStar 
  } from '@tabler/icons-react';
  import { useState, useEffect } from 'react';
  import { FiBell } from 'react-icons/fi';

  const useStyles = createStyles((theme) => ({
   wrapper: {
     paddingTop: `calc(${theme.spacing.xl} * 2)`,
     paddingBottom: `calc(${theme.spacing.xl} * 2)`,
     
   },
  
   title: {
     marginBottom: theme.spacing.md,
     paddingLeft: theme.spacing.md,
     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
   },
  
   item: {
     fontSize: theme.fontSizes.sm,
     color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
   },
  }));
  
  const placeholder =
   'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';
  
  export default function Testing() { 
  
  
  const [searchValue, setSearchValue] = useState('');
  
  const theme = useMantineTheme();
  
  const options = [
    { value: 'superadmin', label: 'super admin' },
    { value: 'marketingagent', label: 'marketing agent' },
    { value: 'businessowner', label: 'business owner' },
    { value: 'customer', label: 'customer' },
  ];
  
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [errorMessage3, setErrorMessage3] = useState('');
    const [errorMessage4, setErrorMessage4] = useState('');
    const [errorMessage5, setErrorMessage5] = useState('');
    const [errorMessage6, setErrorMessage6] = useState('');
    const [errorMessage7, setErrorMessage7] = useState('');
    const [errorMessage8, setErrorMessage8] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const [selectedOption, setSelectedOption] = useState('');
    const [fname, setFname] = useState('');
    const [address,setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
  
  
    useEffect(() => {
      if(errorMessage1){
        if(/^[a-zA-Z]{1,30}$/.test(selectedOption)) {
          setErrorMessage1('');
        }
      }
      if(errorMessage2){
        if(/^(?!\s*$)([a-zA-Z]{1,25}\s*)*$/.test(fname)) {
          setErrorMessage2('');
        }
      }
      if(errorMessage3){
        if(/^.+$/.test(address)) {
          setErrorMessage3('');
        }
      }
      if(errorMessage4){
        if(/^\d{11}$/.test(phone)) {
          setErrorMessage4('');
        }
      }
      if(errorMessage5){
        if(/^[a-zA-Z]{1,20}$/.test(country)) {
          setErrorMessage5('');
        }
      }
      if(errorMessage6){
        if(/^[a-zA-Z]{1,20}$/.test(city)) {
          setErrorMessage6('');
        }
      }
      if(errorMessage7){
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
          setErrorMessage7('');
        }
      }
      if(errorMessage8){
        if (password == confirmPassword) {
          setErrorMessage8('');
        }
      }
     
    }, [selectedOption, fname, address, phone, city, country, password, confirmPassword]);
  
   
  
    function handleFnameChange(event) {
      setFname(event.target.value);
    }
  
    function handleAddress(event) {
      setAddress(event.target.value);
    }
  
    function handleConfirmPhoneChange(event) {
      setPhone(event.target.value);
    }
  
    function handleCountry(event) {
      setCountry(event.target.value);
    }
  
    function handleCity(event) {
      setCity(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  
    function handleConfirmPasswordChange(event) {
      setConfirmPassword(event.target.value);
    }
  
  
    function handleSelectedOption(event) {
      setSelectedOption(event.target.value);
    }
  
    
  
    const isSelectionValid = (selectedOption) => {
      const regex = /^[a-zA-Z]{1,30}$/;
      return regex.test(selectedOption);
    };
  
    const isNameValid = (fname) => {
      const regex = /^(?!\s*$)([a-zA-Z]{1,25}\s*)*$/;
      return regex.test(fname);
    };
  
    const isAddressValid = (address) => {
      const regex = /^.+$/;
      return regex.test(address);
    };
  
  
    const isPhoneValid = (phone) => {
      const regex = /^\d{11}$/;
      return regex.test(phone);
    };
  
    const isCountryValid = (country) => {
      const regex = /^[a-zA-Z]{1,20}$/;
      return regex.test(country);
    };
  
    const isCityValid = (country) => {
      const regex = /^[a-zA-Z]{1,20}$/;
      return regex.test(country);
    };
  
    const isPasswordValid = (password) => {
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return regex.test(password);
    };
  
    const isConfirmPasswordValid = (confirmPassword) => {
    if (password == confirmPassword) {
      return confirmPassword;
    }
    };
  
    
  
  
    const handleSubmit = () => {
     
  
      if ( !isSelectionValid(selectedOption)) {
        setErrorMessage1('invalid business')
        
      }
  
  
      if ( !isNameValid(fname)) {
        setErrorMessage2('invalid name') 
      }
  
      if ( !isAddressValid(address)) {
        setErrorMessage3('invalid address') 
      }
  
      if ( !isPhoneValid(phone)) {
        setErrorMessage4('invalid phone')
        
      }
  
      if ( !isCountryValid(country)) {
        setErrorMessage5('invalid country')
      }
  
      if ( !isCityValid(city)) {
        setErrorMessage6('invalid city')
       
      }
  
      if ( !isPasswordValid(password)) {
        setErrorMessage7('invalid password')
       
      }
  
      if ( !isConfirmPasswordValid(confirmPassword)) {
        setErrorMessage8('invalid confirm password')
        return;
      }
  
  
      if  (isSelectionValid(selectedOption) && isNameValid(fname) && isAddressValid(address) && isPhoneValid(phone) && isCountryValid(country) && isCityValid(city) && isPasswordValid(password) && isConfirmPasswordValid(confirmPassword)) {
        setIsLoggedIn(true);
      }
  
    };
   
    const handleFileChange = (files) => {
      setSelectedFile(files[0]);
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await fetch('your-upload-endpoint', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('gknjnkk');
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        alert('Error uploading the picture');
      }
    };
  
  const handleSearch = () => {
   // Implement your search logic here
   console.log('Search query:', searchValue);
  };
  
  const handleChange = (event) => {
   setSearchValue(event.target.value);
  };
  
  
   const { classes } = useStyles();
   return (
    <div>
        <Grid>
     
        <Grid.Col span={9} className="content-col" >
     <div className={classes.wrapper}>

  <Container size={700} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Enter User's Details
        </Title>
     
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Container align="center" mt={15} style={{width:140}}>
            {/*
          <div>
        <FileInput
          style={{ display: 'flex', alignItems: 'center', height:80, flexDirection:'row' }}
          label="Upload Picture"
          accept="image/*"
          onChange={handleFileChange}
          value={selectedFile ? selectedFile.name : ''}
          icon={<IconUser size="120" style={{ margin: '0 auto' }} />}
        />
  
        <Button disabled={!selectedFile} onClick={handleUpload}>
          Upload
        </Button>
      </div>
        */}
          </Container>
          <Grid>
          <Grid.Col span={6} >
           <Select
           withAsterisk
          data={options}
          placeholder="Select an option"
          label="Select an option"
          value={selectedOption}
          onChange={setSelectedOption}
          clearable
          searchable
          required
          mb={10}
          size='lg'  
      />
       {errorMessage1 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage1}</p>}
          </Grid.Col>
          <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="Full Name"
            placeholder="full name"
            value={fname} onChange={handleFnameChange}
            mb={10}
            size='lg'
          />
          {errorMessage2 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage2}</p>}
          </Grid.Col>
          </Grid>
          <Grid>
          <Grid.Col span={6} >
          <TextInput
            withAsterisk
            label="Address"
            placeholder="Address"
            required
            value={address} onChange={handleAddress}
            mb={10}
            size='lg'
          />
         {errorMessage3 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage3}</p>}
          </Grid.Col>
          <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="Phone Number"
            placeholder="phone number"
            value={phone} onChange={handleConfirmPhoneChange}
            mb={10}
            size='lg'
          />
          {errorMessage4 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage4}</p>}
          </Grid.Col>
          </Grid>
          <Grid>
          <Grid.Col span={6} >
          <TextInput
            withAsterisk
            label="Country"
            placeholder="Country"
            required
            value={country} onChange={handleCountry}
            mb={10}
            size='lg'
          />
          {errorMessage5 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage5}</p>}
          </Grid.Col>
          <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="City"
            placeholder="City"
            required
            value={city} onChange={handleCity}
            mb={10}
            size='lg'
          />
          {errorMessage6 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage6}</p>}
          </Grid.Col>
          <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="Password"
            placeholder="Password"
            required
            value={password} onChange={handlePasswordChange}
            mb={10}
            size='lg'
          />
          {errorMessage7 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage7}</p>}
          </Grid.Col>
          <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="Confirm Password"
            placeholder="Confirm Password"
            required
            value={confirmPassword} onChange={handleConfirmPasswordChange}
            mb={10}
            size='lg'
          />
          {errorMessage8 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage8}</p>}
          </Grid.Col>
          </Grid>
          <div>
        <FileInput
          style={{ display: 'flex', alignItems: 'center', height:90  }}
          accept="image/*"
          onChange={handleFileChange}
          size='lg'
          value={selectedFile ? selectedFile.name : ''}
          //icon={<IconUser size="lg" style={{ display: 'flex', justifyContent: 'center', marginLeft: '10' }} />}
          icon={<img src="data:image/png;base64,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" alt="User" style={{ width: 80, height: 80, display: 'flex', justifyContent: 'center', marginLeft: 30 }} />}
        />
  
        <Button disabled={!selectedFile} onClick={handleUpload} style={{}}>
          Upload
        </Button>
      </div>
          <Button fullWidth mt="xl" onClick={handleSubmit} style={{ backgroundColor: '#4E8480'}} >
            Complete
          </Button>
          {isLoggedIn && <p  style={{ color: 'blue', fontSize: '13px', textAlign: 'center' }}>Profile Completion Successful</p>}
        </Paper>
      </Container>
     </div>
     </Grid.Col>
     </Grid>
     </div>
   );
  }