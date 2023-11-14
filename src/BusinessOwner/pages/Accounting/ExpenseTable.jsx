import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEye, IconTrash, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { deleteExpense } from '../../../api/businessOwner/accounting';
import { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import {  Hourglass } from 'react-loader-spinner';

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


const BusinessPanelExpenseTable = () => {

  const { classes } = useStyles();
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [specificPicture, setSpecificPicture] = useState('');
  const [specificBusiness, setSpecificBusiness] = useState('');
  const [specificDescription, setSpecificDescription] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [specificAmount, setSpecificAmount] = useState('');
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [modalDeletion, SetModalDeletion] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClear = () => {
    setSearch('');
    };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      const updatedExpenses = expenses?.filter(expense => expense._id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      notifications.show({ message: "Expense Deleted Successfully", color: 'red' });
      setSlowTransitionOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletionConfirmation = (id) => {
    setSlowTransitionOpened(true);
    SetModalDeletion(id);
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/viewAllExpenses');
      const allExpenses = response?.data?.expenses;
  
      const myExpenses = allExpenses?.filter((expense) => expense?.business?.businessOwner === user?._id);
      
      // Update the state with the filtered revenues
      setExpenses(myExpenses);
      setfilteredExpenses(myExpenses);
    } catch (error) {
      console.log(error);
    }
    finally {
      setDataLoaded(true);
    }
  }


  const handleViewSpecific = (row) => {
    open();
    setSpecificBusiness(row?.business?.name || 'N/A');
    setSpecificDescription(row?.description || 'N/A');
    setSpecificDate(row?.date || 'N/A');
    setSpecificAmount(row?.amount || 'N/A');
    setSpecificPicture(row?.profilePic);

  };

  const columns = [
    {
      name: <strong>#</strong>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '60px',
    },
    {
      name: <strong>Title</strong>,
      selector: (row) => row?.title || 'N/A',
      width: '130px',
      sortable: true,
    },
    {
      name: <strong>Business Name</strong>,
      selector: (row) => row?.business?.name || 'N/A',
      width: '160px',
      sortable: true,
    },
    {
      name: <strong>Business Details</strong>,
      width: '180px',
      selector: (row) => row?.description || 'N/A',
      sortable: true,
    },
    {
      name: <strong>Date</strong>,
      width: '180px',
      selector: (row) => row?.date || 'N/A',
      sortable: true,
    },
    {
      name: <strong>Amount</strong>,
      selector: (row) => row?.amount || 'N/A',
      width: '150px',
      sortable: true,
    },
    {
      name: <strong>Action</strong>,
      width: '120px',
      cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconTrash color='gray' onClick={() => deletionConfirmation(row._id)} /></Box>
    },
  ]

  useEffect(() => {
    const result = expenses.filter(expense => {
      const matchesSearch = (
        expense?.title.toLowerCase().includes(search.toLowerCase()) ||
        expense?.business?.name.toLowerCase().includes(search.toLowerCase())
      );
  
      return matchesSearch;
    });
  
    setFilteredExpenses(result);
  }, [search, expenses]);

  useEffect(() => {
    getExpenses().then((data) => {
      const expensesData = data.map((expense) => ({ ...expense, status: 'active' }));
      setExpenses(expensesData);
      setFilteredExpenses(expensesData);
    });
  }, []);

  return (
    <Box 
    sx={{
      fontFamily:'Poppins'
    }}
    >
     {dataLoaded ? (  
      <DataTable columns={columns} data={filteredExpenses}
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
                    <Button variant="outline" miw={165} onClick ={() => {handleClear()}} > 
                      Clear
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
            <Button variant="outline" size='md' className={classes.responsiveClear} onClick ={() => {handleClear()}}>  
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
              onClick={() => navigate('/AddExpense')}
            >
              Add Expense
            </Button>
          </Box>
        }
        responsive
      />
      ) : (
        // Render the loading spinner when data is not yet loaded
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#0096FF', '	#FF5F1F']}
        />
        </div>
      )}
      <Modal title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Expense Details</Text>} radius={'md'} opened={opened} onClose={close} size={'md'}  >
        <Box mb={30} style={{ display: 'flex', flexDirection: 'column' }}>
          <Box mah={800}><Image maw={800} radius="md" src={specificPicture} alt="Random image" /></Box>
          <Box mah={380} miw={250} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            {/* <Box ><Badge variant="filled" >Car Business</Badge></Box> */}
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Business Name:</Text><Text fw={'bold'} ml={5}>{specificBusiness}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Amount</Text><Text fw={'bold'} ml={5}>{specificAmount}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Date:</Text><Text fw={'bold'} ml={5}>{specificDate}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Description:</Text><Text fw={'bold'} ml={5}>{specificDescription}</Text></Box>
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
export default BusinessPanelExpenseTable