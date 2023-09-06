import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome  } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({

    responsiveSearchRow: {
      display:'flex',
      flexDirection: 'row-reverse',
      gap:'20px',
      marginLeft:'-5px',
      paddingTop: '20px',
      paddingBottom: '20px',
      [theme.fn.smallerThan('sm')]: {
        justifyContent: 'space-between',
        width:'100%',
        marginLeft:'0px',
      },
  
    },
  
    responsiveAddUserBtn: {
     
      [theme.fn.smallerThan('sm')]: {
      },
  
    },
  
    responsiveActiveBlock: {
  
      [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
  
    },
  
    responsiveUserType: {
     [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
    },
  
    responsiveSearch: {
     [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
    },

     responsiveClear: {
     [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
    },

    responsiveFilterIcon: {
        [theme.fn.largerThan('sm')]: {
           display: 'none'
         },
     
       },
  
  }))
  

const PaymentTable = () => {

const { classes } = useStyles();
const [countries, setCountries] =  useState([]);
const [search, setSearch] =  useState('');
const [region, setRegion] =  useState('');
const [filteredCountries, setFilteredCountries] =  useState([]);
const [opened, { open, close }] = useDisclosure(false); 
const [specificPicture, setSpecificPicture] =  useState('');
const [specificRole, setSpecificRole] =  useState('');
const [specificFirstName, setSpecificFirstName] =  useState('');
const [specificLastName, setSpecificLastName] =  useState('');
const [specificEmail, setSpecificEmail] =  useState('');
const [specificPhoneNumber, setSpecificPhoneNumber] =  useState('');
const [specificAddress, setSpecificAddress] =  useState('');
const navigate = useNavigate();

const getCountries = async () => {
try {
const response = await axios.get('https://restcountries.com/v2/all');
setCountries(response.data);
setFilteredCountries(response.data);
} catch (error) {
console.log(error);
}
}


const handleViewSpecific = (row) => {
  open();
  setSpecificRole(row.name);
  setSpecificPicture(row.flag);
};

const columns = [
  {
    name: <strong>#</strong>,
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
  },
  {
    name: <strong>Business Owner Name</strong>,
    selector: (row) => row.capital,
    width: '190px',
    sortable: true,
  },
    {
        name: <strong>Business Name</strong>,
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: <strong>Business POC</strong>,
        width: '140px',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: <strong>Subscription Type</strong>,
        width: '160px',
        selector: (row) => row.region,
        sortable: true,
    },
    {
        name: <strong>Payment Method</strong>,
        selector: (row) => row.nativeName,
        sortable: true,
    },
    {
        name: <strong>Amount</strong>,
        selector: (row) => row.nativeName,
        sortable: true,
    },
    {
        name: <strong>Action</strong>,
        width: '150px',
        cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconTrash color='gray' /></Box>
    },
]

useEffect(() => {
getCountries();
}, []);

useEffect(() => {
const result = countries.filter(country => {
    return country.name.toLowerCase().match(search.toLowerCase());
});

setFilteredCountries(result);
}, [search]);

useEffect(() => {
    const resultSelect = countries.filter(country => {
        return country.region.toLowerCase().match(region.toLowerCase());
    });
    
    setFilteredCountries(resultSelect);
    }, [region]);

useEffect(() => {
    getCountries().then((data) => {
        const countriesData = data.map((country) => ({ ...country, status: 'active' }));
        setCountries(countriesData);
        setFilteredCountries(countriesData);
      });
    }, []);

  return (
    <Box 
    sx={{
      fontFamily:'Poppins'
    }}
    >
    <DataTable columns={columns} data={filteredCountries}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='650px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    subHeaderComponent={
      <Box className={classes.responsiveSearchRow}>
        <Box className={classes.responsiveFilterIcon} >
          <Menu shadow="" width={200} closeOnItemClick={false} >
            <Menu.Target>
            <Button size='md'>
        <IconFilter />
        </Button >
            </Menu.Target>
            <Menu.Dropdown bg={'#FAF9F6'}> 
    <Menu.Item>
    <TextInput
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
       
         />
         </Menu.Item>
    <Menu.Item>
    <Button variant="outline" miw={165}>
            Clear
        </Button>
    </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
        <Button variant="outline" size='md' className={classes.responsiveClear}>
            Clear
        </Button>
        <TextInput
        size='md'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={classes.responsiveSearch}
         />
         {/*
        <Select
         size='md'
        onSearchChange={setRegion}
        searchValue={region}
        searchable
        placeholder="Select User Type"
        data={[
        { value: 'americas', label: 'americas' },
        { value: 'africa', label: 'africa' },
        { value: 'europe', label: 'europe' },
        { value: 'asia', label: 'asia' },
      ]}
      className={classes.responsiveUserType}
    />
         <Select
         size='md' 
        searchable
        placeholder="Active/Block"
        data={[
        { value: 'Active', label: 'Active' },
        { value: 'Block', label: 'Block' },
      ]}
      className={classes.responsiveActiveBlock}
    />
    <Button 
    size='md'
    className={classes.responsiveAddUserBtn}
    onClick={() => navigate('/AddExpense')}
    >
    Add Expense
    </Button>
    */}
        </Box>
        
    }
    responsive
     />
    <Modal title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>Payment Details</Text>} radius={'md'}  opened={opened} onClose={close}  size={'md'}  >
  <Box mb={30}  style={{display:'flex', flexDirection:'column'}}>
    <Box  mah={800}><Image maw={800}radius="md" src={'https://img.freepik.com/premium-vector/happy-business-colleagues-team-portrait_179970-1271.jpg?w=2000'} alt="Random image" /></Box>
    <Box  mah={380} miw={250}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" >Silver Subscription</Badge></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Business Owner Name:</Text><Text fw={'bold'} ml={5}>{specificRole}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Business Name:</Text><Text fw={'bold'} ml={5}>Car Selling Business</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Date:</Text><Text fw={'bold'} ml={5}>10th August, 2023</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Amount:</Text><Text fw={'bold'} ml={5}>10,000 PKR</Text></Box>
    </Box>
  </Box>
      </Modal>
     </Box>
  )
}
export default PaymentTable