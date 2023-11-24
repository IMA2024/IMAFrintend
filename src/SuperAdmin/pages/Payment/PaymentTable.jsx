import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { deletePayment } from '../../../api/admin/payment';
import { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import {  Hourglass } from 'react-loader-spinner';

const useStyles = createStyles((theme) => ({

  responsiveSearchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
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
    marginTop: '20px',

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
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [specificTitle, setSpecificTitle] = useState('');
  const [specificBusiness, setSpecificBusiness] = useState('');
  const [specificOwner, setSpecificOwner] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [specificAmount, setSpecificAmount] = useState('');
  const [specificMethod, setSpecificMethod] = useState('');
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [modalDeletion, SetModalDeletion] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  const { user } = useContext(UserContext);

  const handleClear = () => {
    setSearch('');
  };

  const handleDelete = async (id) => {
    try {
      await deletePayment(id);
      const updatedPayments = payments.filter(payment => payment._id !== id);
      setPayments(updatedPayments);
      setFilteredPayments(updatedPayments);
      notifications.show({ message: "Payment Deleted Successfully", color: 'red' });
      setSlowTransitionOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletionConfirmation = (id) => {
    setSlowTransitionOpened(true);
    SetModalDeletion(id);
  };

  const getPayments = async () => {
    try {
      const response = await axios.get('https://imaa-2585bbde653a.herokuapp.com/admin/viewAllPayments');
      const allPayments = response?.data?.payments;
      setPayments(allPayments);
      setFilteredPayments(allPayments);
    } catch (error) {
      console.log(error);
    }
    finally {
      setDataLoaded(true);
    }
  }


  const handleViewSpecific = (row) => {
    open();
    setSpecificTitle(row?.title || 'N/A');
    setSpecificBusiness(row?.business?.name || 'N/A');
    setSpecificOwner(`${row?.business?.businessOwner?.firstName} ${row?.business?.businessOwner?.lastName}` || 'N/A');
    setSpecificDate(row?.date || 'N/A');
    setSpecificAmount(row?.amount || 'N/A');
    setSpecificMethod(row?.method || 'N/A');

  };

  const columns = [
    {
      name: <strong>#</strong>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '60px',
    },
    {
      name: <strong>Subscription Title</strong>,
      selector: (row) => row?.title || 'N/A',
      width: '170px',
      sortable: true,
    },
    {
      name: <strong>Business Name</strong>,
      selector: (row) => row?.business?.name || 'N/A',
      width: '160px',
      sortable: true,
    },
    {
      name: <strong>Business Owner Name</strong>,
      width: '190px',
      selector: (row) => `${row?.business?.businessOwner?.firstName} ${row?.business?.businessOwner?.lastName}` || 'N/A',
      sortable: true,
    },
    {
      name: <strong>Date</strong>,
      width: '180px',
      selector: (row) => row?.date || 'N/A',
      sortable: true,
    },
    {
      name: <strong>Payment Amount</strong>,
      selector: (row) => row?.amount + " $" || 'N/A',
      width: '170px',
      sortable: true,
    },
    {
      name: <strong>Payment Method</strong>,
      selector: (row) => row?.method || 'N/A',
      width: '170px',
      sortable: true,
    },
    {
      name: <strong>Action</strong>,
      width: '120px',
      cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconTrash color='gray' onClick={() => deletionConfirmation(row._id)} /></Box>
    },
  ]

  useEffect(() => {
    const result = payments.filter(payment => {
      const matchesSearch = (
        payment?.title.toLowerCase().includes(search.toLowerCase()) ||
        payment?.business?.name.toLowerCase().includes(search.toLowerCase()) ||
        payment?.business?.businessOwner?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        payment?.business?.businessOwner?.lastName.toLowerCase().includes(search.toLowerCase())


      );

      return matchesSearch;
    });

    setFilteredPayments(result);
  }, [search, payments]);

  useEffect(() => {
    getPayments().then((data) => {
      const paymentsData = data.map((payment) => ({ ...payment, status: 'active' }));
      setPayments(paymentsData);
      setFilteredPayments(paymentsData);
    });
  }, []);

  return (
    <Box 
    sx={{
      fontFamily: 'Poppins'
    }}
    >
      {dataLoaded ? (  
      <DataTable columns={columns} data={filteredPayments}
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
                      <Button variant="outline" miw={165} onClick={() => { handleClear() }} >
                        Clear
                      </Button>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Box>
              <Button variant="outline" size='md' className={classes.responsiveClear} onClick={() => { handleClear() }}>
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
    <Modal title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Payment Details</Text>} radius={'md'} opened={opened} onClose={close} size={'md'}  >
      <Box mb={30} style={{ display: 'flex', flexDirection: 'column' }}>
        <Box mah={800}><Image maw={800} radius="md" src={'https://www.digitaloutlook.com.au/wp-content/uploads/2017/09/future_payment_methods-compressor-1.jpg'} alt="Random image" /></Box>
        <Box mah={380} miw={250} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
          {/* <Box ><Badge variant="filled" >{specificBusiness}</Badge></Box> */}
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Payment Title:</Text><Text fw={'bold'} ml={5}>{specificTitle}</Text></Box>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}></Text>Business Name:<Text fw={'bold'} ml={5}>{specificBusiness}</Text></Box>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}></Text>Business Owner Name:<Text fw={'bold'} ml={5}>{specificOwner}</Text></Box>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Payment Amount:</Text><Text fw={'bold'} ml={5}>{specificAmount} $</Text></Box>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Payment Date:</Text><Text fw={'bold'} ml={5}>{specificDate}</Text></Box>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Payment Method:</Text><Text fw={'bold'} ml={5}>{specificMethod}</Text></Box>
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
      export default PaymentTable