import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, HoverCard,  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome, IconBuilding } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { deleteBusiness } from '../../../api/admin/businesses';
import { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';

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

  modalContainer: {
    display:'flex',
    flexDirection:'column',
    maxWidth:'700px',
    backgroundColor:'#E9ECEF',
    borderRadius:'10px',

    [theme.fn.smallerThan('md')]: {
      //flexDirection:'column',
      maxWidth:'700px',
    },
   },

   modalImage : {
    width:'100%',
    display:'flex',
    justifyContent:'center',
    marginBottom:'20px',

    [theme.fn.smallerThan('md')]: {
      //width:'100%',
      //marginBottom:'50px',
    },
   },

   modalDetails: {
    width:'100%',

    [theme.fn.smallerThan('md')]: {
      //width:'100%',
      maxHeight:'200px',
      justifyContent:'space-evenly',
    },
   },


}))


const TableAgents = () => {

  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState();
  /*
  const [specificPicture, setSpecificPicture] = useState('');
  const [specificType, setSpecificType] = useState('');
  const [specificName, setSpecificName] = useState('');
  const [specificOwner, setSpecificOwner] = useState('');
  const [specificEmail, setSpecificEmail] = useState('');
  const [specificPhoneNumber, setSpecificPhoneNumber] = useState('');
  const [specificAddress, setSpecificAddress] = useState('');
  */
  const [specificBusinessName, setSpecificBusinessName] = useState('');
  const [specificAgentName, setSpecificAgentName] = useState('');
  const [specificAgentVoice, setSpecificAgentVoice] = useState('');
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [modalDeletion, SetModalDeletion] = useState('');
  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate('/BusinessPanel/BusinessEdit', { state: { rowData: row } });
  };

  const handleClear = () => {
    setSearch('');
    setType('');
    setStatus('');
    };
    
    const handleDelete = async (id) => {
      try {
        await deleteBusiness(id);
        const updatedBusinesses = businesses.filter(business => business._id !== id);
        setBusinesses(updatedBusinesses);
        setFilteredBusinesses(updatedBusinesses);
        notifications.show({ message: "Business Deleted Successfully", color: 'red' });
        setSlowTransitionOpened(false);
      } catch (error) {
        console.log(error);
      }
    };

    const deletionConfirmation = (id) => {
      setSlowTransitionOpened(true);
      SetModalDeletion(id);
    };

  const getBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/viewAllBusinesses');
      console.log(response.data);
      setBusinesses(response.data.businesses);
      setFilteredBusinesses(response.data.businesses);
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
    /*
    setSpecificPicture(row.profilePic);
    setSpecificType(row.type);
    setSpecificName(row.name);
    setSpecificOwner(row.businessOwner.firstName + row.businessOwner.lastName);
    setSpecificEmail(row.email);
    setSpecificPhoneNumber(row.phoneNumber);
    setSpecificAddress(row.address);
    */
   setSpecificBusinessName(row.name);
   setSpecificAgentName(row.name);
   setSpecificAgentVoice(row.name);
  };

  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1, // Generate serial numbers dynamically
      sortable: true,
      width: '60px', // Set the width of the serial number column
    },
    /*
    {
      name: 'Profile Picture',
      width: '110px',
      selector: (row) => <img width={50} height={50} src={row.profilePic} />,
    },
    */
   /*
    {
      name: 'Profile Picture',
      width: '110px',
      selector: (row) => <HoverCard position="bottom-end" >
      <HoverCard.Target>
      <img width={50} height={50} src={row.profilePic} />
      </HoverCard.Target>
      <HoverCard.Dropdown>
      <img width={150} height={150} src={row.profilePic} />
      </HoverCard.Dropdown>
    </HoverCard>
       //<img width={50} height={50} src={row.profilePic} />,
    },
    */
   /*
    {
      name: 'Profile Picture',
      width: '110px',
      selector: (row) => <img
         //width={50} height={50} 
         src={row.profilePic}
      style={{
        transition: 'transform 0.3s ease-in-out',
        width: '50px', // Initial width
        height: '50px', // Initial height
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = 'scale(1.1)';
        event.currentTarget.style.width = '110px'; // Increase width on hover
        event.currentTarget.style.height = '110px'; // Increase height on hover
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = 'scale(1)';
            event.currentTarget.style.width = '50px'; // Reset width
            event.currentTarget.style.height = '50px'; // Reset height
      }}
        />,
    },
    */
  
    {
      name: 'Business Name',
      //width: '130px',
      selector: (row) => row.name,
      sortable: true,
    },
    {
        name: 'Agent Name',
        //width: '130px',
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: 'Agent Voice',
        //width: '130px',
        selector: (row) => row.name,
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
      cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconEdit color='gray' onClick={() => handleEdit(row)} />
      {/*<IconTrash color='gray' onClick={() => handleDelete(row._id)}/>*/}
      <IconTrash color='gray' onClick={() => deletionConfirmation(row._id)}/>
      </Box>
    },
  ]

  useEffect(() => {
    getBusinesses();
  }, []);

  useEffect(() => {
    const result = businesses.filter(business => {
      const matchesSearch = (
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.businessOwner.firstName.toLowerCase().includes(search.toLowerCase()) ||
        business.businessOwner.lastName.toLowerCase().includes(search.toLowerCase()) ||
        business.phoneNumber.toLowerCase().includes(search.toLowerCase())
      );
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
                      placeholder="Agent Voice"
                      data={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
           
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
              placeholder="Agent Voice"
                      data={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
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
              onClick={() => navigate('/ConfigureAgents')}
            >
              Configure Agent
            </Button>
          </Box>
        }
        responsive
      />
      {/*
      <Modal radius={'md'} centered opened={opened} onClose={close} size={'735px'}  >
  <Box className={classes.modalContainer} mb={30}  p={20}  style={{}}>
    <Box className={classes.modalImage}><Image  width={'200'} height={'200'} radius="lg"  src='https://ui.mantine.dev/_next/static/media/image.969ed1dc.svg' alt="Random image" /></Box>
    <Box className={classes.modalDetails} style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" fullWidth>hey</Badge></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconBuilding size={20} color="green" /><Text ml={5}>{specificBusinessName}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconUser size={20} color="green" /><Text ml={5}>{specificAgentName}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconMail size={20} color="green" /><Text ml={5}>{specificAgentVoice}</Text></Box>
            {/*
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconPhone size={20} color="green" /><Text ml={5}>{specificPhoneNumber}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><IconHome size={20} color="green" /><Text ml={5}>{specificAddress}</Text></Box>
   
    </Box>
  </Box>
</Modal> 
*/}
 <Modal title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Agent Details</Text>} radius={'md'} opened={opened} onClose={close} size={'md'}  >
        <Box mb={30} style={{ display: 'flex', flexDirection: 'column' }}>
          <Box mah={800}><Image maw={800} radius="md" src='https://firebasestorage.googleapis.com/v0/b/intelligentmarketingagen-a3e0b.appspot.com/o/images%2F%2012.jpg6f277ed5-4232-4ee0-aae1-f585fa6346b8?alt=media&token=b3fd74f5-5695-4d90-9e52-8ea8239b7bf1' alt="Random image" /></Box>
          <Box mah={380} miw={250} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <Box ><Badge variant="filled" >System Agent</Badge></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Business Name:</Text><Text fw={'bold'} ml={5}>{specificBusinessName}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Agent Name:</Text><Text fw={'bold'} ml={5}>{specificAgentName}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Agent Voice:</Text><Text fw={'bold'} ml={5}>{specificAgentVoice}</Text></Box>
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
export default TableAgents