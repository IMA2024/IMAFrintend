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
  

const CallPriorityTable = () => {

const { classes } = useStyles();
const [leads, setLeads] = useState([]);
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
const [audioFilename, setAudioFilename] = useState('');
const [status, setStatus] = useState('');
const [date, setDate] = useState('');
const [selectedRowData, setSelectedRowData] = useState(null);
// ---------------- Leads Flask Response--------------------
 const generateLeads = async () => {
    try {
      const response = await axios.get('https://imaa-2585bbde653a.herokuapp.com/analyze_audio');
      // Extract information from the response and set state variables
      const { audio_file_name, status, date } = response.data[0];
      setAudioFilename(audio_file_name);
      setStatus(status);
      setDate(date);
    } catch (error) {
      console.error('Error generating leads:', error);
    }
  };
// ------------------- End Leads Flask Response-------------
const getLeadData = async () => {
  try {
    const response = await axios.get('https://imaa-2585bbde653a.herokuapp.com/get_leads');
    setLeads(response.data);
  } catch (error) {
    console.error('Error getting lead data:', error);
  }
};

useEffect(() => {
  getLeadData();
}, []);
//-------------------- End Respoonse From DB

// ------------COLOR FUNCTION FOR STATUS BOX PRIORITIES 

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'low priority':
      return '#E48F45';
    case 'medium priority':
      return 'blue';
    case 'high priority':
      return 'green';
    default:
      return 'gray';
  }
};
// -------------------ENDDDSSSSSSSSSSSSS------------


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
  setSelectedRowData(row);
  // setSpecificRole(row.name);
  // setSpecificPicture(row.flag);
};

const columns = [
{
    name: <strong>#</strong>,
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
},
// {
//         name: <strong>Customer Name</strong>,
//         selector: (row) => row.PhoneNumber,
//         sortable: true,
// },
{
        name: <strong>Phone Number</strong>,
        selector: (row) => row.PhoneNumber.replace(/\.wav$/, ''),
        //width: '170px',
        sortable: true,
},
{
        name: <strong>Date</strong>,
        //width: '150px',
        selector: (row) => row.Date,
        sortable: true,
},
{
        name: <strong>Status</strong>,
       // width: '180px',
        // selector: (row) => row.Status,
        selector: (row) => (
          <Box 
            style={{
              color: '#fff',
              backgroundColor: getStatusColor(row.Status),
              borderRadius: '5px',
              padding: '5px 10px',
            }}
          >
            {row.Status}
          </Box>
        ),
        
        sortable: true,
},
{
        name: <strong>Action</strong>,
       // width: '150px',
        cell: (row) => <Box><IconEye onClick={() => handleViewSpecific(row)}  color='gray' /></Box>,
},
]

useEffect(() => {
getCountries();
}, []);

const handleClear = () => {
  setRegion('');
};

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
    <>
    <Box 
    sx={{
      fontFamily:'Poppins'
    }}
    >
    <DataTable columns={columns} data={leads}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='650px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
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
    <Button variant="outline" miw={165} onClick={() => handleClear()}>
            Clear
        </Button>
    </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      
        <Button variant="outline" size='md' className={classes.responsiveClear} onClick={() => handleClear()}>
            Clear
        </Button>
        <Select
         size='md'
        onSearchChange={setRegion}
        searchValue={region}
        searchable
        placeholder="Call Priority"
        data={[
          { value: 'Low Priority', label: 'Low Priority' },
          { value: 'Medium Priority', label: 'Medium Priority' },
          { value: 'High Priority', label: 'High Priority' },
        ]}
      className={classes.responsiveUserType}
    />
        </Box>
        <Button 
        size='md'
        className={classes.responsiveAddUserBtn}
        onClick={generateLeads}
        >
        Generate Leads
       </Button>

        </Box>
    }
    responsive
     />
    <Modal title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>Call Priority Details</Text>} radius={'md'}  opened={opened} onClose={close}  size={'md'}  >
  <Box mb={30}  style={{display:'flex', flexDirection:'column'}}>
    <Box  mah={800}><Image maw={800}radius="md" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrm_hB7kp5Fg-3McAOx26oCZn0VhygjEdFShTEwOK9w-mzaW07iiBw3ucjHYZlAPSYUPs&usqp=CAU'} alt="Random image" /></Box>
    <Box  mah={380} miw={250}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" >Lead Status</Badge></Box>
    {/* MODAL CHANGES HERE --------------------- */}
    {selectedRowData && (
              <>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                  <Text ml={5}>Phone Number:</Text>
                  <Text fw={'bold'} ml={5}>
                    {selectedRowData.PhoneNumber.replace(/\.wav$/, '')}
                  </Text>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                  <Text ml={5}>Date:</Text>
                  <Text fw={'bold'} ml={5}>
                    {selectedRowData.Date}
                  </Text>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                  <Text ml={5}>Status:</Text>
                  <Text fw={'bold'} ml={5}>
                    {selectedRowData.Status}
                  </Text>
                </Box>
              </>
            )}
            {/* MODAL CHANGES---------------- */}
    </Box>
  </Box>
      </Modal>
     </Box>
     </>
  )
}
export default CallPriorityTable
