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
      MediaQuery,
      Textarea
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
  import { DatePicker } from '@mantine/dates';
  import { DatePickerInput } from '@mantine/dates';
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
  
  export default function AddExpense() { 
  
  
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
    const [errorMessage4, setErrorMessage4] = useState('');
    const [errorMessage5, setErrorMessage5] = useState('');
    const [errorMessage6, setErrorMessage6] = useState('');
    const [errorMessage7, setErrorMessage7] = useState('');
    const [errorMessage8, setErrorMessage8] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const [selectedOption, setSelectedOption] = useState('');
    const [title, setTitle] = useState('');
    const [business, setBusiness] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [fname, setFname] = useState('');
    const [address,setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [amount, setAmount] = useState('');
    const [city, setCity] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
  
  
    useEffect(() => {
      if(errorMessage1){
        if(/^[a-zA-Z]{1,20}$/.test(title)) {
          setErrorMessage1('');
        }
      }
      if(errorMessage2){
        if(/^[a-zA-Z]{1,20}$/.test(business)) {
          setErrorMessage2('');
        }
      }
      if(errorMessage4){
        if(/^[a-zA-Z]{1,200}$/.test(details)) {
          setErrorMessage4('');
        }
      }
      if(errorMessage5){
        if(/^[a-zA-Z0-9]{1,20}$/.test(date)) {
          setErrorMessage5('');
        }
      }
      if(errorMessage6){
        if(/^\d{1,8}$/.test(amount)) {
          setErrorMessage6('');
        }
      }
     
    }, [title, business, details, date ,amount]);
  
   
    function handleTitle(event) {
        setTitle(event.target.value);
      }

      function handleBusiness(event) {
        setBusiness(event.target.value);
      } 
      
      function handleDate(event) {
        setDate(event.target.value);
      }   
    
      function handleDetails(event) {
        setDetails(event.target.value);
      }

      function handleAmount(event) {
        setAmount(event.target.value);
      }

      function handleAmount(event) {
        setAmount(event.target.value);
      }

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
  
    function handleSelectedOption(event) {
      setSelectedOption(event.target.value);
    }
  
    const isSelectionValid = (selectedOption) => {
      const regex = /^[a-zA-Z]{1,30}$/;
      return regex.test(selectedOption);
    };

    const isBusinessValid = (business) => {
        const regex = /^[a-zA-Z]{1,20}$/;
        return regex.test(business);
      };


    const isTitleValid = (title) => {
        const regex = /^[a-zA-Z]{1,20}$/;
        return regex.test(title);
      };

      const isDetailsValid = (details) => {
        const regex = /^[a-zA-Z]{1,200}$/;
        return regex.test(details);
      };

      const isAmountValid = (amount) => {
        const regex = /^\d{1,8}$/;
        return regex.test(amount);
      };

  
    const isNameValid = (fname) => {
      const regex = /^([a-zA-Z]+\s*)*$/;
      return regex.test(fname);
    };
  
    const isPhoneValid = (phone) => {
      const regex = /^\d{11}$/;
      return regex.test(phone);
    };
  
    const isDateValid = (date) => {
      const regex = /^[a-zA-Z0-9]{1,20}$/;
      return regex.test(date);
    };
  
    const isCityValid = (country) => {
      const regex = /^[a-zA-Z]{1,20}$/;
      return regex.test(country);
    };
  
    const handleSubmit = () => {
  
      if ( !isTitleValid(title)) {
        setErrorMessage1('invalid title') 
      }

      
      if ( !isBusinessValid(business)) {
        setErrorMessage2('invalid business ')
        
      }
  
      if ( !isDetailsValid(details)) {
        setErrorMessage4('invalid details')
        
      }
  
      if ( !isDateValid(date)) {
        setErrorMessage5('invalid date')
      }

      if ( !isAmountValid(amount)) {
        setErrorMessage6('invalid amount')
        return;
      }

     
  
      if  (isTitleValid(title) && isBusinessValid(business) && isDetailsValid(details)  && isDateValid(date) && isAmountValid(amount)) {
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
  <Grid style={{marginTop:'-45px', marginBottom:'30px'}}>
      <Grid.Col span={4} style={{color:'#868E96'}}>
      <Group position="relative" style={{ maxWidth: '300px', margin: '0 auto' }}> 
       <Input
         value={searchValue}
         onChange={handleChange}
         placeholder="Search"
         rightSection={
           <ActionIcon
             onClick={handleSearch}
             radius="lg"
             style={{ cursor: 'pointer' }}
             padding="xs"
             size="xs"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               
               viewBox="0 0 24 24"
               fill="none"
               stroke={
                 theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5]
               }
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
             >
               <circle cx="11" cy="11" r="8" />
               <line x1="21" y1="21" x2="16.65" y2="16.65" />
             </svg>
           </ActionIcon>
           
         }
       />
     </Group>
     </Grid.Col>
     <Grid.Col span={1} offset={5}>
     <ActionIcon size="lg">
         <FiBell />
       </ActionIcon>
       </Grid.Col>
       <Grid.Col span={1}>
       <ActionIcon size="lg">
         <IconMoon></IconMoon>
       </ActionIcon>
       </Grid.Col>
       <Grid.Col span={1}>
       <ActionIcon size="lg">
         <IconUser></IconUser>
       </ActionIcon>
       </Grid.Col>
  </Grid>
  <Container size={700} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Add Expense Details
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
           <TextInput
           withAsterisk
          placeholder="Title"
          label="Title"
          value={title}
          onChange={handleTitle}
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
            label="Business Name"
            placeholder="business name"
            value={business} onChange={handleBusiness}
            mb={10}
            size='lg'
          />
          {errorMessage2 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage2}</p>}
          </Grid.Col>
          </Grid>
          <Grid>
          <Grid.Col span={12}>
          <Textarea
            withAsterisk
            label="Business Details"
            placeholder="business details"
            value={details} onChange={handleDetails}
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
            label="Date"
            placeholder="Date"
            required
            value={date} onChange={handleDate}
            mb={10}
            size='lg'
          />
          {errorMessage5 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage5}</p>}
          </Grid.Col>
          <Grid.Col span={6}>
          <TextInput
            withAsterisk
            label="Amount"
            placeholder="Amount"
            required
            value={amount} onChange={handleAmount}
            mb={10}
            size='lg'
          />
          {errorMessage6 && <p style={{ color: 'red', fontSize: '13px' }}>{errorMessage6}</p>}
          </Grid.Col>
          </Grid>
        
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