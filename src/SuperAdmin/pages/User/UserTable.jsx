import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Axios from 'axios';
import { ScrollArea ,  Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome  } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../api/admin/users';
import { notifications } from '@mantine/notifications';


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

const UserTable = () => {

const { classes } = useStyles();
const [users, setUsers] =  useState([]);
const [search, setSearch] =  useState('');
const [role, setRole] =  useState('');
const [status, setStatus] = useState('');
const [filteredUsers, setFilteredUsers] =  useState([]);
const [opened, { open, close }] = useDisclosure(false); 
const [selectedUserIndex, setSelectedUserIndex] = useState();
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
};

const handleClear = () => {
setSearch('');
setRole('');
setStatus('');
};

const handleDelete = async (id) => {
  try {
    await deleteUser(id);
    const updatedUsers = users.filter(user => user._id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    notifications.show({ message: "User Deleted Successfully", color: 'red' });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async () => {
  try {
    const response = await Axios.get('http://localhost:5000/admin/viewAllUsers');
    console.log(response.data.users);
    setUsers(response.data.users);
    setFilteredUsers(response.data.users);
  } catch (error) {
    console.log(error);
  }
}

const toggleStatus = (index) => {
  const updatedUsers = [...users];
  const currentStatus = updatedUsers[index].status;
  updatedUsers[index].status = currentStatus === 'Active' ? 'Block' : 'Active';
  setUsers(updatedUsers);
  setSelectedUserIndex();
};


const handleViewSpecific = (row) => {
  open();
  setSpecificPicture(row.profilePic);
  setSpecificRole(row.role);
  setSpecificFirstName(row.firstName);
  setSpecificLastName(row.lastName);
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
    selector: (row) => <img width={50} height={50} src={row.profilePic} />,
  },
    {
        name: 'Role',
        selector: (row) => row.role,
        sortable: true,
    },
    {
        name: 'First Name',
        width: '110px',
        selector: (row) => row.firstName,
        sortable: true,
    },
    {
        name: 'Last Name',
        width: '110px',
        selector: (row) => row.lastName,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: 'Phone Number',
        selector: (row) => row.phoneNumber,
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
  getUsers();
}, []);

useEffect(() => {
  const result = users.filter(user => {
    // Apply all filters including search, role, and status
    const matchesSearch = (
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(search.toLowerCase())
    );
     const matchesRole = role === '' || user.role.toLowerCase().includes(role.toLowerCase());
    const matchesStatus = status === '' || user.status.toLowerCase().includes(status.toLowerCase());

    return matchesSearch && matchesRole && matchesStatus;
  });

  setFilteredUsers(result);
}, [search, role, status, users]);

useEffect(() => {
  getUsers().then((data) => {
    const usersData = data.map((user) => ({ ...user, status: 'Active' }));
    setUsers(usersData);
    setFilteredUsers(usersData);
  });
}, []);

  return (
    <Box >
    <DataTable columns={columns} data={filteredUsers}
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
        onSearchChange={setRole}
        searchValue={role}
        searchable
        placeholder="Select By Role"
        data={[
          { value: 'Super Admin', label: 'Super Admin' },
          { value: 'Marketing Agent', label: 'Marketing Agent' },
          { value: 'Business Owner', label: 'Business Owner' },
          { value: 'Customer', label: 'Customer' },
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
        <Button variant="outline" size='md' className={classes.responsiveClear} onClick={() => handleClear()}>
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
        onSearchChange={setRole}
        searchValue={role}
        searchable
        placeholder="Select By Role"
        data={[
          { value: 'Super Admin', label: 'Super Admin' },
          { value: 'Marketing Agent', label: 'Marketing Agent' },
          { value: 'Business Owner', label: 'Business Owner' },
          { value: 'Customer', label: 'Customer' },
      ]}
      className={classes.responsiveUserType}
    />
         <Select
         size='md' 
        searchable
        onSearchChange={setStatus}
        searchValue={status}
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
    onClick={() => navigate('/AddUser')}
    >
    Add User
    </Button>
        </Box>
    }
    responsive
     />
      <Modal p={'sm'} radius={'md'} centered opened={opened} onClose={close}  size={800}  >
  <Box mb={30}  style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
    <Box mah={350}><Image  width={'400'} height={'230'} radius="lg"  src={specificPicture} alt="Random image" /></Box>
    <Box  mah={350}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" fullWidth>{specificRole}</Badge></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconUser size={20} color="green" /><Text ml={5}>{specificFirstName}</Text><Text ml={5}>{specificLastName}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconMail size={20} color="green" /><Text ml={5}>{specificEmail}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconPhone size={20} color="green" /><Text ml={5}>{specificPhoneNumber}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconHome size={20} color="green" /><Text ml={5}>{specificAddress}</Text></Box>
    </Box>
  </Box>
      </Modal>
     </Box>
  )
}
export default UserTable