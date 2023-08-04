import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

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
  

const ExpenseTable = () => {

const { classes } = useStyles();

const [countries, setCountries] =  useState([]);
const [search, setSearch] =  useState('');
const [region, setRegion] =  useState('');
const [filteredCountries, setFilteredCountries] =  useState([]);
//const [filteredStatus, setFiltered] =  useState([]);
const [opened, { open, close }] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // You can adjust the number of rows per page as needed

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * rowsPerPage + index + 1;
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


//const exportCsv = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

const columns = [
  {
    name: '#',
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
  },
    {
        name: 'Title',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Business Name',
        selector: (row) => row.nativeName,
    },
    {
        name: 'Business Details',
        selector: (row) => row.capital,
        width: '120px',
    },
    {
        name: 'Date',
        selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
    {
        name: 'Amount',
        selector: (row) => row.region,
    },
    {
        name: 'Action',
        cell: (row) => <Box><IconEye color='gray' onClick={() => {open()}} /><IconTrash color='gray' /></Box>
    },
    {
      name: 'Status',
      cell: (row, index) => (
        <Badge   variant='outline'  p={5} onClick={() => toggleStatus(index)}>
          {row.status === 'active' ? 'Block' : 'Active'}
        </Badge>
      ),
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
      <Modal  opened={opened} onClose={close}  size="lg"  style={{textAlign: "left", display:'flex', justifyContent:'center' }}>
      <div style={{display: 'flex', justifyContent: 'left', fontFamily: 'serif', fontWeight: 'bold', fontSize: 30}}>
            Expense Details
            </div>
            <div style={{fontFamily: 'serif', fontSize: 20, marginTop: 30}}>
              Title: <b>  </b>
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
      </Modal>
     </Box>
  )
}
export default ExpenseTable