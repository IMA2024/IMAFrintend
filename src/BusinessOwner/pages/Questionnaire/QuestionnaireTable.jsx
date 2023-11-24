import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Box, createStyles, Menu, Text, Modal, Badge, Image, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEye, IconTrash, IconEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import { notifications } from '@mantine/notifications';
import { deleteQuestionnaire } from '../../../api/businessOwner/questionnaire';
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
    marginRight:'25px',

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


const QuestionnaireTable = () => {
  const { user } = useContext(UserContext);
  const { classes } = useStyles();
  const [questionnaires, setQuestionnaires] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredQuestionnaires, setFilteredQuestionnaires] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [specificPicture, setSpecificPicture] = useState('');
  const [specificBusiness, setSpecificBusiness] = useState('');
  const [specificOwner, setSpecificOwner] = useState('');
  const [specificEmail, setSpecificEmail] = useState('');
  const [specificPhoneNumber, setSpecificPhoneNumber] = useState('');
  const [specificStatus, setSpecificStatus] = useState('');
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [modalDeletion, SetModalDeletion] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate('/EditQuestionnaire', { state: { rowData: row } });
  };

  const handleClear = () => {
    setSearch('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestionnaire(id);
      const updatedQuestionnaires = questionnaires.filter(questionnaire => questionnaire._id !== id);
      setQuestionnaires(updatedQuestionnaires);
      setFilteredQuestionnaires(updatedQuestionnaires);
      notifications.show({ message: "Questionnaire Deleted Successfully", color: 'red' });
      setSlowTransitionOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletionConfirmation = (id) => {
    setSlowTransitionOpened(true);
    SetModalDeletion(id);
  };

  const getQuestionnaires = async () => {
    try {
      const response = await axios.get('https://imaa-2585bbde653a.herokuapp.com/businessOwner/viewAllQuestionnaires');
      console.log(response?.data?.questionnaires);

      const userQuestionnaires = response?.data?.questionnaires.filter((questionnaire) => questionnaire?.business?.businessOwner?._id === user?._id);

      setQuestionnaires(userQuestionnaires);
      setFilteredQuestionnaires(userQuestionnaires);
    } catch (error) {
      console.log(error);
    }
    finally {
      setDataLoaded(true);
    }
  };


  const handleViewSpecific = (row) => {
    open();
    setSpecificPicture(row?.business?.profilePic);
    setSpecificBusiness(row?.business?.name || 'N/A');
    setSpecificOwner(row?.business?.businessOwner?.firstName + " " + row?.business?.businessOwner?.lastName || 'N/A');
    setSpecificEmail(row?.business?.email || 'N/A');
    setSpecificPhoneNumber(row?.business?.phoneNumber || 'N/A');
    setSpecificStatus(row?.business?.subscribed || 'N/A');
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
      width: '150px',
      selector: (row) => row?.business?.name,
      sortable: true,
    },
    {
      name: <strong>Business Owner Name</strong>,
      selector: (row) => `${row?.business?.businessOwner?.firstName} ${row?.business?.businessOwner?.lastName}`,
      width: '190px',
      sortable: true,
    },
    // {
    //   name: <strong>Agent Name</strong>,
    //   width: '150px',
    //   selector: (row) => row.name,
    //   sortable: true,
    // },
    // {
    //   name: <strong>Questionnaire</strong>,
    //   width: '150px',
    //   selector: (row) => row?.name,
    //   sortable: true,
    // },
    {
      name: <strong>Email</strong>,
      width: '150px',
      selector: (row) => row?.business?.email,
      sortable: true,
    },
    {
      name: <strong>Phone Number</strong>,
      width: '150px',
      selector: (row) => row?.business?.phoneNumber,
      sortable: true,
    },
    {
      name: <strong>Status</strong>,
      width: '180px',
      selector: (row) => row?.business?.subscribed,
      sortable: true,
    },
    {
      name: <strong>Action</strong>,
       width: '150px',
      cell: (row) => <Box><IconEye onClick={() => handleViewSpecific(row)} color='gray' /><IconEdit color='gray' onClick={() => handleEdit(row)} />
      <IconTrash color='gray' onClick={() => deletionConfirmation(row._id)} /></Box>,
    },
  ]

  useEffect(() => {
    getQuestionnaires();
  }, []);

  useEffect(() => {
    const result = questionnaires.filter(questionnaire => {
      return questionnaire?.business?.name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredQuestionnaires(result);
  }, [search]);


  useEffect(() => {
    getQuestionnaires().then((data) => {
      const questionnairesData = data.map((questionnaire) => ({ ...questionnaire, status: 'active' }));
      setQuestionnaires(questionnairesData);
      setFilteredQuestionnaires(questionnairesData);
    });
  }, []);

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data?.questionnaire, null, 2)}</pre>
    //<Box bg={'pink'}>{data.name}</Box>
  );

  return (
    <Box
      sx={{
        fontFamily: 'Poppins'
      }}
    >
         {dataLoaded ? (  
      <DataTable columns={columns} data={filteredQuestionnaires}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='650px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        expandableRows
        expandableRowsComponent={ExpandedComponent}
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
              {/*
        <Box style={{display:'flex', flexDirection:'row-reverse', width:'800px', justifyContent:'space-between'}}></Box>
    */}
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
        onClick={() => navigate('/AddQuestionnaire')}
        >
        Add Questionnaire
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
      <Modal title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Business Details</Text>} radius={'md'} opened={opened} onClose={close} size={'md'}  >
        <Box mb={30} style={{ display: 'flex', flexDirection: 'column' }}>
          <Box mah={800}><Image height={200} width={400} radius="md"  src={specificPicture} alt="Random image" /></Box>
          <Box mah={380} miw={250} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            {/* <Box ><Badge variant="filled" >Business Questionnnaire</Badge></Box> */}
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Business Name:</Text><Text fw={'bold'} ml={5}>{specificBusiness}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Business Owner Name:</Text><Text fw={'bold'} ml={5}>{specificOwner}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Business Email:</Text><Text fw={'bold'} ml={5}>{specificEmail}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Phone Number:</Text><Text fw={'bold'} ml={5}>{specificPhoneNumber}</Text></Box>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}><Text ml={5}>Status:</Text><Text fw={'bold'} ml={5}>{specificStatus}</Text></Box>
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
export default QuestionnaireTable
