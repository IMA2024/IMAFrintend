import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Axios from 'axios';
import { ScrollArea ,  Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, HoverCard,  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome  } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../api/admin/users';
import { notifications } from '@mantine/notifications';
import {  Hourglass } from 'react-loader-spinner';

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

      [theme.fn.smallerThan('lg')]: {

      },

    },
  
    responsiveAddUserBtn: {
      marginTop:'20px',
      marginRight:'25px',
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


       modalContainer: {
        display:'flex',
        flexDirection:'row',
        maxWidth:'700px',
        backgroundColor:'#E9ECEF',
        borderRadius:'10px',

        [theme.fn.smallerThan('md')]: {
          flexDirection:'column',
          maxWidth:'700px',
        },
       },

       modalImage : {
        width:'50%',
        display:'flex',
        justifyContent:'center',

        [theme.fn.smallerThan('md')]: {
          width:'100%',
          marginBottom:'50px',
        },
       },

       modalDetails: {
        width:'50%',

        [theme.fn.smallerThan('md')]: {
          width:'100%',
          maxHeight:'200px',
          justifyContent:'space-evenly',
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
const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
const [modalDeletion, SetModalDeletion] = useState('');
const [dataLoaded, setDataLoaded] = useState(false);

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
    setSlowTransitionOpened(false);
  } catch (error) {
    console.log(error);
  }
};

const deletionConfirmation = (id) => {
  setSlowTransitionOpened(true);
  SetModalDeletion(id);
};

const getUsers = async () => {
  try {
    const response = await Axios.get('https://imaa-2585bbde653a.herokuapp.com/admin/viewAllUsers');
    const allUsers = response.data.users;

    // Filter out the super admin based on a condition (for example, role === 'superAdmin')
    const filteredUsers = allUsers.filter((user) => user.role !== 'Super Admin');

    // Update the state with the filtered users
    setUsers(filteredUsers);
    setFilteredUsers(filteredUsers);
  } catch (error) {
    console.log(error);
  }
  finally {
    setDataLoaded(true);
  }
};


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
};

const columns = [
  {
    name: <strong>#</strong>,
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column

  },
  {
    name: <strong>Picture</strong>,
  // width: '110px',
   allowOverflow: 'yes',
    selector: (row) => <HoverCard position="bottom" withinPortal='true' >
    <HoverCard.Target>
    <img width={50} height={50} src={row.profilePic} />
    </HoverCard.Target>
    <HoverCard.Dropdown p={0}>
    <img width={150} height={150} src={row.profilePic} />
    </HoverCard.Dropdown>
  </HoverCard>
  },
    {
        name: <strong >Role</strong>,
        selector: (row) => row.role,
        sortable: true,
        allowOverflow: 'yes',
    },
    {
        name: <strong>First Name</strong>,
        selector: (row) => row.firstName,
        sortable: true,
        allowOverflow: 'yes',
    },
    {
        name: <strong>Last Name</strong>,
        selector: (row) => row.lastName,
        sortable: true,
        allowOverflow: 'yes',
    },
    {
        name: <strong>Email</strong>,
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: <strong>Phone No</strong>,
        selector: (row) => row.phoneNumber,
        sortable: true,
        allowOverflow: 'yes',
        style: {
         // marginLeft: '12px', // override the cell padding for data cells   
      },
        
    },
    {
      name: <strong>Status</strong>,
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
      sortable: true,
    },
    {
        name: <strong>Action</strong>,
        cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconEdit color='gray' onClick={() => handleEdit(row)} /><IconTrash color='gray' onClick={() => deletionConfirmation(row._id)}/></Box>
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
    <Box 
    sx={{
      fontFamily:'Poppins'
    }}
    >
        {dataLoaded ? (  
    <DataTable columns={columns} data={filteredUsers}
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
        </Box>
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

   <Modal radius={'md'} centered opened={opened} onClose={close} size={'735px'}  >
  <Box className={classes.modalContainer} mb={30}  p={10}  style={{}}>
    <Box className={classes.modalImage}><Image  width={'200'} height={'200'} radius="50%"  src={specificPicture} alt="Random image" /></Box>
    <Box className={classes.modalDetails} style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" fullWidth>{specificRole}</Badge></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconUser size={20} color="green" /><Text >{specificFirstName}</Text><Text ml={5}>{specificLastName}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconMail size={20} color="green" /><Text >{specificEmail}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><IconPhone size={20} color="green" /><Text >{specificPhoneNumber}</Text></Box>
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
export default UserTable