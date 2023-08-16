import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome, IconBuilding } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
//import { NavLink, Navigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
//import { deleteBusiness } from '../../../api/admin/businesses';

const useStyles = createStyles((theme) => ({

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


const TableBusiness = () => {

  const { classes } = useStyles();
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState();
  const [specificPicture, setSpecificPicture] = useState('');
  const [specificType, setSpecificType] = useState('');
  const [specificName, setSpecificName] = useState('');
  const [specificOwner, setSpecificOwner] = useState('');
  const [specificEmail, setSpecificEmail] = useState('');
  const [specificPhoneNumber, setSpecificPhoneNumber] = useState('');
  const [specificAddress, setSpecificAddress] = useState('');
  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate('/EditBusiness', { state: { rowData: row } });
  };

  const handleClear = () => {
    setSearch('');
    setType('');
    setStatus('');
    };
    /*
    const handleDelete = async (id) => {
      try {
        await deleteBusiness(id);
        const updatedBusinesses = businesses.filter(business => business._id !== id);
        setBusinesses(updatedBusinesses);
        setFilteredBusinesses(updatedBusinesses);
        notifications.show({ message: "Business Deleted Successfully", color: 'red' });
      } catch (error) {
        console.log(error);
      }
    };
    */

  const getBusinesses = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v2/all');
      console.log(response);
      setBusinesses(response.data);
      setFilteredBusinesses(response.data);
      console.log(businesses);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleStatus = (index) => {
    const updatedBusinesses = [...businesses];
    const currentStatus = updatedBusinesses[index].status;
    updatedBusinesses[index].status = currentStatus === 'Active' ? 'Block' : 'Active';
    setBusinesses(updatedBusinesses);
    setSelectedUserIndex();
  };

  const handleViewSpecific = (row) => {
    open();
    setSpecificPicture(row.profilePic);
    setSpecificType(row.type);
    setSpecificName(row.name);
    setSpecificOwner(row.name);
    setSpecificEmail(row.email);
    setSpecificPhoneNumber(row.phoneNumber);
    setSpecificAddress(row.address);
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
      width: '110px',
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
    {
      name: 'Business Type',
      selector: (row) => row.region,
      sortable: true,
    },
    {
      name: 'Business Name',
      width: '130px',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Business Owner Name',
      width: '170px',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.area,
      width: '130px',
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row, index) => (
        selectedUserIndex === index ? (
          <Select
            value={row.status}
            onChange={(newValue) => {
              toggleStatus(index);
              setSelectedUserIndex();
            }}
            data={[
              { value: 'Active', label: 'Active' },
              { value: 'Block', label: 'Block' },
            ]}
          />
        ) : (
          <Badge
            variant='outline'
            p={5}
            onClick={() => setSelectedUserIndex(index)}
          >
            {row.status}
          </Badge>
        )
      ),
      width: '130px',
      sortable: true,
    },
    {
      name: 'Action',
      width: '150px',
      cell: (row) => <Box><IconEdit color='gray' onClick={() => handleEdit(row)} /><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconTrash color='gray' onClick={() => handleDelete(row._id)}/></Box>
    },
  ]

  useEffect(() => {
    getBusinesses();
  }, []);

  useEffect(() => {
    const result = businesses.filter(business => {
      const matchesSearch = (
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.name.toLowerCase().includes(search.toLowerCase())
      );
      //previously it was business.phoneNumber
       const matchesType = type === '' || business.type.toLowerCase().includes(type.toLowerCase());
      const matchesStatus = status === '' || business.status.toLowerCase().includes(status.toLowerCase());
  
      return matchesSearch && matchesType && matchesStatus;
    });
  
    setFilteredBusinesses(result);
  }, [search, type, status, businesses]);

  useEffect(() => {
    getBusinesses().then((data) => {
      const businessesData = data.map((business) => ({ ...business, status: 'Active' }));
      setBusinesses(businessesData);
      setFilteredBusinesses(businessesData);
    });
  }, []);

  return (
    <Box >
      <DataTable columns={columns} data={filteredBusinesses}
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
                      onSearchChange={setType}
                      searchValue={type}
                      searchable
                      placeholder="Business Type"
                      data={[
                        { value: 'Commercial', label: 'Commercial' },
                        { value: 'Industrial', label: 'Industrial' },
                      ]}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <Select
                      onSearchChange={setStatus}
                      searchValue={status}
                      searchable
                      placeholder="Active/Block"
                      data={[
                { value: 'Active', label: 'Active' },
                { value: 'Block', label: 'Block' },
                      ]}
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
            <Button variant="outline" size='md'  onClick={() => handleClear()} className={classes.responsiveClear}>
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
              onSearchChange={setType}
              searchValue={type}
              searchable
              placeholder="Business Type"
              data={[
                { value: 'Commercial', label: 'Commercial' },
                { value: 'Industrial', label: 'Industrial' },
              ]}
              className={classes.responsiveUserType}
            />
            <Select
              size='md'
              searchable
              placeholder="Active/Block"
              onSearchChange={setStatus}
              searchValue={status}
              data={[
                { value: 'Active', label: 'Active' },
                { value: 'Block', label: 'Block' },
              ]}
              className={classes.responsiveActiveBlock}
            />
            <Button
              size='md'
              className={classes.responsiveAddUserBtn}
              onClick={() => navigate('/AddBusiness')}
            >
              Add Business
            </Button>
          </Box>
        }
        responsive
      />
      <Modal p={'sm'} radius={'md'} centered opened={opened} onClose={close} size={800}  >
        <Box mb={30} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Box mah={350}><Image maw={300} radius="md" src={specificPicture} alt="Random image" /></Box>
          <Box mah={350} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <Box ><Badge variant="filled" fullWidth>{specificType}</Badge></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconBuilding size={20} color="green" /><Text ml={5}>{specificName}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconUser size={20} color="green" /><Text ml={5}>{specificOwner}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconMail size={20} color="green" /><Text ml={5}>{specificEmail}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconPhone size={20} color="green" /><Text ml={5}>{specificPhoneNumber}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconHome size={20} color="green" /><Text ml={5}>{specificAddress}</Text></Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
export default TableBusiness