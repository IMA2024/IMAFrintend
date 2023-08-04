import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image } from '@mantine/core';
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
         //backgroundColor:'pink',
      [theme.fn.smallerThan('sm')]: {
        justifyContent: 'space-between',
        width:'100%',
        marginLeft:'0px',
        //float:'left',
      },
  
    },
  
    responsiveAddUserBtn: {
     
      [theme.fn.smallerThan('sm')]: {
        //backgroundColor:'pink',
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
  

const UserTable = () => {

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

const handleEdit = (row) => {
  navigate('/EditUser', { state: { rowData: row } });
  //console.log(row.name);
};

const getCountries = async () => {
try {
const response = await axios.get('https://restcountries.com/v2/all');
setCountries(response.data);
setFilteredCountries(response.data);
} catch (error) {
console.log(error);
}
}

const toggleStatus = (index) => {
  const updatedCountries = [...countries];
  const currentStatus = updatedCountries[index].status;
  updatedCountries[index].status = currentStatus === 'active' ? 'block' : 'active';
  setCountries(updatedCountries);
};

const handleViewSpecific = (row) => {
  open();
  setSpecificRole(row.name);
  setSpecificPicture(row.flag);
};

const columns = [
  {
    name: '#',
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
  },
  {
    name: 'Profile Picture',
    selector: (row) => <img width={50} height={50} src={row.flag} />,
  },
    {
        name: 'Role',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'First Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: (row) => row.region,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.nativeName,
        sortable: true,
    },
    {
        name: 'Phone Number',
        selector: (row) => row.capital,
        width: '120px',
        sortable: true,
    },
    {
      name: 'Status',
      cell: (row, index) => (
        <Badge   variant='outline'  p={5} onClick={() => toggleStatus(index)}>
          {row.status === 'active' ? 'Block' : 'Active'}
        </Badge>
      ),
    },
    {
        name: 'Action',
        cell: (row) => <Box><IconEdit color='gray' onClick={() => handleEdit(row)} /><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconTrash color='gray' /></Box>
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
    <Box >
    <DataTable columns={columns} data={filteredCountries}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='650px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    //key={row.name}
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
         <Select
        
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
    />
    </Menu.Item>
    <Menu.Item>
         <Select
        
        onSearchChange={setRegion}
        searchValue={region}
        searchable
        placeholder="Active/Block"
        data={[
        { value: 'americas', label: 'americas' },
        { value: 'africa', label: 'africa' },
        { value: 'europe', label: 'europe' },
        { value: 'asia', label: 'asia' },
      ]}
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
    >
    Add User
    </Button>
        </Box>
    }
    responsive
  
     />
      <Modal  p={'sm'} radius={'md'} centered opened={opened} onClose={close}  size={800}  //style={{textAlign: "left", display:'flex', justifyContent:'center' }}
      >
        {/*
      <div style={{display: 'flex', justifyContent: 'left', fontFamily: 'serif', fontWeight: 'bold', fontSize: 30}}>
            </div>
            <div style={{fontFamily: 'serif', fontSize: 20, marginTop: 30}}>
              Title: <b>{specificRole}</b>
            </div>
            <div style={{fontFamily: 'serif', fontSize: 20, marginTop: 10}}>
              Business Name: <b> </b>
            </div>
            <div style={{fontFamily: 'serif', fontSize: 20, marginTop: 10}}>
              Description: <b>  </b>
            </div>
            <div style={{fontFamily: 'serif', fontSize: 20, marginTop: 10}}>
              Date: <b>  </b>
            </div>
            <div style={{fontFamily: 'serif', fontSize: 20, marginTop: 10}}>
              Amount: <b> </b>
            </div>
  */}
  <Box mb={30}  style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
    <Box mah={350}><Image  maw={300}radius="md" src={specificPicture} alt="Random image" /></Box>
    <Box  mah={350}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" fullWidth>Business Owner</Badge></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconUser size={20} color="green" /><Text ml={5}>Laraib Saghir</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconMail size={20} color="green" /><Text ml={5}>saghirlaraib08@gmail.com</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconPhone size={20} color="green" /><Text ml={5}>0333 0958111</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconHome size={20} color="green" /><Text ml={5}>H#8,Street#1,Askari 14</Text></Box>
    </Box>
  </Box>
      </Modal>
     </Box>
  )
}
export default UserTable