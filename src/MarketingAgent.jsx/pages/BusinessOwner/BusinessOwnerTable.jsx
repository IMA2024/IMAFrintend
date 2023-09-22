import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome  } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({


    responsiveSearchContainer: {
      width:'100%',
      display: 'flex',
      flexDirection:'row-reverse',
      justifyContent:'space-between',
    },

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
      marginTop:'20px',
     
      [theme.fn.smallerThan('sm')]: {
        //display: 'none'
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
  

const TableForBusinessOnwers = () => {

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
    name: '#',
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
},
{
        name: 'Business Name',
        selector: (row) => row.name,
        sortable: true,
},
{
        name: 'Business Owner Name',
        selector: (row) => row.capital,
        //width: '170px',
        sortable: true,
},
{
        name: 'Agent Name',
        //width: '150px',
        selector: (row) => row.name,
        sortable: true,
},
{
    name: 'Questionnaire',
    //width: '150px',
    selector: (row) => row.name,
    sortable: true,
},
{
    name: 'Email',
    //width: '150px',
    selector: (row) => row.name,
    sortable: true,
},
{
    name: 'Phone Number',
    //width: '150px',
    selector: (row) => row.name,
    sortable: true,
},
{
        name: 'Status',
       // width: '180px',
        selector: (row) => row.region,
        sortable: true,
},
{
        name: 'Action',
       // width: '150px',
        cell: (row) => <Box><IconEye onClick={() => handleViewSpecific(row)}  color='gray' /><IconTrash color='gray' /></Box>,
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

     const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
  //<Box bg={'pink'}>{data.name}</Box>
  );

  return (
    <Box>
    <DataTable columns={columns} data={filteredCountries}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='650px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    expandableRows
    expandableRowsComponent={ExpandedComponent}
    subHeader
    subHeaderComponent={
      <Box className={classes.responsiveSearchContainer}>
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
      {/*
        <Box style={{display:'flex', flexDirection:'row-reverse', width:'800px', justifyContent:'space-between'}}></Box>
    */}
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
        {/*
        <Button 
        size='md'
        className={classes.responsiveAddUserBtn}
        onClick={() => navigate('/AddQuestionnaire')}
        >
        Add Questionnaire
       </Button>
*/}
        </Box>
        
    }
    responsive
     />
    <Modal title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>Call Priority Details</Text>} radius={'md'}  opened={opened} onClose={close}  size={'md'}  >
  <Box mb={30}  style={{display:'flex', flexDirection:'column'}}>
    <Box  mah={800}><Image maw={800}radius="md" src={'https://img.freepik.com/premium-vector/happy-business-colleagues-team-portrait_179970-1271.jpg?w=2000'} alt="Random image" /></Box>
    <Box  mah={380} miw={250}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" >Business Questionnnaire</Badge></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Customer Name:</Text><Text fw={'bold'} ml={5}>Ahmed</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Phone Number:</Text><Text fw={'bold'} ml={5}>0333 1234567</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Date:</Text><Text fw={'bold'} ml={5}>10-3-23</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Status:</Text><Text fw={'bold'} ml={5}>High Priority</Text></Box>
    </Box>
  </Box>
      </Modal>
     </Box>
  )
}
export default TableForBusinessOnwers