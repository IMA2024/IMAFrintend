import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEye, IconTrash, } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { deleteRevenue } from "../../../api/admin/accounting";
import { notifications } from '@mantine/notifications';


const useStyles = createStyles((theme) => ({

  responsiveSearchContainer: {
    width:'100%',
    display: 'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
  },

  responsiveSearchRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: '20px',
    marginLeft: '-5px',
    paddingTop: '20px',
    paddingBottom: '20px',
    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
      width: '100%',
      marginLeft: '0px',
    },

  },

  responsiveAddUserBtn: {
    marginTop:'20px',

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


const BusinessPanelRevenueTable = () => {

  const { classes } = useStyles();
  const [revenues, setRevenues] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRevenues, setfilteredRevenues] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [specificPicture, setSpecificPicture] = useState('');
  const [specificBusiness, setSpecificBusiness] = useState('');
  const [specificDescription, setSpecificDescription] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [specificAmount, setSpecificAmount] = useState('');
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [modalDeletion, SetModalDeletion] = useState('');

  const navigate = useNavigate();

  const handleClear = () => {
    setSearch('');
    };

  const handleDelete = async (id) => {
    try {
      await deleteRevenue(id);
      const updatedRevenues = revenues.filter(revenue => revenue._id !== id);
      setRevenues(updatedRevenues);
      setfilteredRevenues(updatedRevenues);
      notifications.show({ message: "Revenue Deleted Successfully", color: 'red' });
      setSlowTransitionOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletionConfirmation = (id) => {
    setSlowTransitionOpened(true);
    SetModalDeletion(id);
  };

  const getRevenues = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/viewAllRevenues');
      setRevenues(response.data.revenues);
      setfilteredRevenues(response.data.revenues);
    } catch (error) {
      console.log(error);
    }
  }


  const handleViewSpecific = (row) => {
    open();
    setSpecificBusiness(row.business.name);
    setSpecificDescription(row.description);
    setSpecificDate(row.date);
    setSpecificAmount(row.amount);
    setSpecificPicture(row.profilePic);
  };

  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1, // Generate serial numbers dynamically
      sortable: true,
      width: '60px', // Set the width of the serial number column
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      width: '130px',
      sortable: true,
    },
    {
      name: 'Business Name',
      selector: (row) => row.business.name,
      width: '160px',
      sortable: true,
    },
    {
      name: 'Business Details',
      width: '180px',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Date',
      width: '180px',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      width: '150px',
      sortable: true,
    },
    {
      name: 'Action',
      width: '120px',
      cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconTrash color='gray' onClick={() => deletionConfirmation(row._id)} /></Box>
    },
  ]

  useEffect(() => {
    getRevenues();
  }, []);

  useEffect(() => {
    const result = revenues.filter(revenue => {
      const matchesSearch = (
        revenue.title.toLowerCase().includes(search.toLowerCase()) ||
        revenue.business.name.toLowerCase().includes(search.toLowerCase())
      );
  
      return matchesSearch;
    });
  
    setfilteredRevenues(result);
  }, [search, revenues]);

  useEffect(() => {
    getRevenues().then((data) => {
      const revenuesData = data.map((country) => ({ ...country, status: 'active' }));
      setRevenues(revenuesData);
      setfilteredRevenues(revenuesData);
    });
  }, []);

  return (
    <Box >
      <DataTable columns={columns} data={filteredRevenues}
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
                    <Button variant="outline" miw={165} onClick={() => {handleClear()}}>
                      Clear
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
            <Button variant="outline" size='md' className={classes.responsiveClear} onClick={() => {handleClear()}}>
              Clear
            </Button>
            <TextInput
              size='md'
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={classes.responsiveSearch}
            />
           
          </Box>
          <Button
              size='md'
              className={classes.responsiveAddUserBtn}
              onClick={() => navigate('/AddRevenue')}
            >
              Add Revenue
            </Button>
          </Box>
        }
        responsive
      />
      <Modal title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Expense Details</Text>} radius={'md'} opened={opened} onClose={close} size={'md'}  >
        <Box mb={30} style={{ display: 'flex', flexDirection: 'column' }}>
          <Box mah={800}><Image maw={800} radius="md" src={specificPicture} alt="Random image" /></Box>
          <Box mah={380} miw={250} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <Box ><Badge variant="filled" >Car Business</Badge></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Business Name:</Text><Text fw={'bold'} ml={5}>{specificBusiness}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Business Details:</Text><Text fw={'bold'} ml={5}>{specificDescription}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Date:</Text><Text fw={'bold'} ml={5}>{specificDate}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Amount:</Text><Text fw={'bold'} ml={5}>{specificAmount}</Text></Box>
          </Box>
        </Box>
      </Modal>
      <Modal  opened={slowTransitionOpened} onClose={() => setSlowTransitionOpened(false)} title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Deletion Confirmation</Text>} transitionProps={{ transition: 'rotate-left' }}>
            <Text>Are you sure you want to delete?</Text>
            <Box mt={'xl'} style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
            <Button size='sm' color='green.9' onClick={() => setSlowTransitionOpened(false)}>Cancel</Button>
            <Button type="submit" size='sm' color='red.8' onClick={() => handleDelete(modalDeletion)} >Delete</Button>
            </Box>
        </Modal>
    </Box>
  )
}
export default BusinessPanelRevenueTable