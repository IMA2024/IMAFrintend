import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, HoverCard,  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { deleteAgent } from '../../../api/businessOwner/agent';
import { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';

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


const AgentsTableMA = () => {

  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState('');
  const [voice, setVoice] = useState('');
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [specificBusinessName, setSpecificBusinessName] = useState('');
  const [specificAgentName, setSpecificAgentName] = useState('');
  const [specificAgentVoice, setSpecificAgentVoice] = useState('');
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [modalDeletion, SetModalDeletion] = useState('');
  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate('/EditAgentsMA', { state: { rowData: row } });
  };

  const handleClear = () => {
    setSearch('');
    setVoice('');
    };
    
    const handleDelete = async (id) => {
      try {
        await deleteAgent(id);
        const updatedAgents = agents.filter(agent => agent._id !== id);
        setAgents(updatedAgents);
        setFilteredAgents(updatedAgents);
        notifications.show({ message: "Agent Deleted Successfully", color: 'red' });
        setSlowTransitionOpened(false);
      } catch (error) {
        console.log(error);
      }
    };

    const deletionConfirmation = (id) => {
      setSlowTransitionOpened(true);
      SetModalDeletion(id);
    };

    const getAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/businessOwner/viewAllAgents');
        const allAgents = response?.data?.agents;
        console.log(allAgents);
        const myAgents = allAgents?.filter((agent) => agent?.business?.businessOwner?._id === user?._id);
        setAgents(myAgents);
        setFilteredAgents(myAgents);
      } catch (error) {
        console.log(error);
      }
    }

  const handleViewSpecific = (row) => {
    open();
   setSpecificBusinessName(row?.business?.name);
   setSpecificAgentName(row?.name);
   setSpecificAgentVoice(row?.voice);
  };

  const columns = [
    {
      name: <strong>#</strong>,
      selector: (row, index) => index + 1, // Generate serial numbers dynamically
      sortable: true,
      width: '60px', // Set the width of the serial number column
    },
    {
      name: <strong>Business Name</strong>,
      //width: '130px',
      selector: (row) => row?.business?.name,
      sortable: true,
    },
    {
        name: <strong>Agent Name</strong>,
        //width: '130px',
        selector: (row) => row?.name,
        sortable: true,
      },
      {
        name: <strong>Agent Voice</strong>,
        //width: '130px',
        selector: (row) => row?.voice,
        sortable: true,
      },
    {
      name: <strong>Action</strong>,
      //width: '150px',
      cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconEdit color='gray' onClick={() => handleEdit(row)} />
      <IconTrash color='gray' onClick={() => deletionConfirmation(row._id)}/>
      </Box>
    },
  ]

  useEffect(() => {
    getAgents();
  }, []);

  useEffect(() => {
    const result = agents.filter(agent => {
      const matchesSearch = (
        agent?.name.toLowerCase().includes(search.toLowerCase()) ||
        agent?.business?.name.toLowerCase().includes(search.toLowerCase())
      );
       const matchesVoice = voice === '' || agent?.voice.toLowerCase().includes(voice.toLowerCase());
  
      return matchesSearch && matchesVoice;
    });
  
    setFilteredAgents(result);
  }, [search, voice, agents]);

  useEffect(() => {
    getAgents().then((data) => {
      const agentsData = data.map((agent) => ({ ...agent, status: 'Active' }));
      setAgents(agentsData);
      setFilteredAgents(agentsData);
    });
  }, []);

  return (
    <Box 
    sx={{
      fontFamily:'Poppins'
    }}
    >
      <DataTable columns={columns} data={filteredAgents}
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
                      onSearchChange={setVoice}
                      searchValue={voice}
                      searchable
                      placeholder="Agent Voice"
                      data={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
           
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
              onSearchChange={setVoice}
              searchValue={voice}
              searchable
              placeholder="Agent Voice"
                      data={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
              ]}
              className={classes.responsiveUserType}
            />
           
          </Box>
          <Button
              size='md'
              className={classes.responsiveAddUserBtn}
              onClick={() => navigate('/ConfigureAgentsMA')}
            >
              Configure Agent
            </Button>
          </Box>
        }
        responsive
      />
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
export default AgentsTableMA