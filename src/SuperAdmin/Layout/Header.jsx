import { Title, Image, Box, Button, Group, createStyles, Text, Menu } from "@mantine/core";
import {  IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight, IconUser, IconBell, IconPhone, IconEdit, IconLogout, IconUserCircle } from '@tabler/icons-react';
import ActionToggle from "../../components/ColorMode";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Images/IMALogo.jpg';
import { UserContext } from '../../context/users/userContext';
import { SpotlightProvider, spotlight } from '@mantine/spotlight';
import { useState, useEffect } from 'react';

const useStyles = createStyles((theme) => ({
 
  responsiveContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:'#E9ECEF',
    justifyContent:'space-between',
    paddingTop:'0.5rem',
    paddingBottom:'0.5rem',
  

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between'
    },

  },

  responsiveContainerChild1: {
    display:'flex',
    flexDirection:'row',
  },

  responsiveContainerChild2: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    //alignItems: 'baseline', 

  },

  responsiveContainerChild3: {
    display: 'flex',
    flexDirection: 'row',
    //backgroundColor:'yellow',
    justifyContent:'space-between',
    alignItems: 'center', 
  },

  searchWithLogo :  {

    [theme.fn.largerThan('md')]: {
        display:'none',
      },

    lineHeight:'4',
    paddingLeft:'10',
  },

  searchWithToggle : {
    [theme.fn.smallerThan('md')]: {
        display:'none',
      },
  },
  
  dashboardHeading : {
    [theme.fn.smallerThan('md')]: {
        display:'none',
      },
  },

  centerLogo : {
    [theme.fn.largerThan('md')]: {
        display:'none',
      },
  },

  LogoWithSearch : {
    [theme.fn.smallerThan('md')]: {
        display:'none',
      },
  }
}))


const HeaderTop = () => {

  const { classes } = useStyles();
  const { user , setUser } = useContext(UserContext)
  const navigate = useNavigate();


  const [query, setQuery] = useState('');
  const SuperAdminActions =
  
       [
          {
            title: 'Dashboard',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/Dashboard"),
            //closeOnTrigger: false,
          },
          {
            title: 'Add User',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/AddUser"),
          },
          {
            title: 'View User',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/ViewUser"),
          },
          {
            title: 'Add Business',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/AddBusiness"),
          },
          {
            title: 'View Business',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/ViewBusiness"),
          },
          {
            title: 'Add Subscription',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/AddSubscription"),
          },
          {
            title: 'View Subscription',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/ViewSubscription"),
          },
          {
            title: 'Add Revenue',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/AddRevenue"),
          },
          {
            title: 'View Revenue',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/ViewRevenue"),
          },
          {
            title: 'Add Expense',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/AddExpense"),
          },
          {
            title: 'View Expense',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/ViewExpense"),
          },
          {
            title: 'View Payments',
            description: 'Click this action to reveal secret actions',
            onTrigger: () => navigate("/ViewPayment"),
          },
        ]
  

  const handleEdit = () => {
    navigate("/Settings");
  }

  const handleLogout = () => {
    // Clear the local storage here
    localStorage.clear();
    setUser(null)
    navigate("/HeaderMegaMenu/SignIn");
  };

  const handleIconSearchClick = () => {
    spotlight.open();
  };

  return (
    <SpotlightProvider
    actions={SuperAdminActions}
    query={query}
    onQueryChange={setQuery}
    searchIcon={<IconSearch size="1.2rem" />}
    searchPlaceholder="Search..."
    shortcut="mod + K"
    nothingFoundMessage="Nothing found..."
    >
    <Box className={classes.responsiveContainer}>
    <Box  className={classes.responsiveContainerChild1} >
    <Box className={classes.LogoWithSearch}><Image width={150} height={55} fit="contain" src={Logo} /></Box>
    <Box className={classes.searchWithLogo}><IconSearch onClick={handleIconSearchClick} color="gray" /></Box>
    </Box>
    <Box className={classes.responsiveContainerChild2} >
    <Box className={classes.dashboardHeading}>
    <Title align="center" order={3} transform="uppercase">{user?.role} DASHBOARD</Title>
    <Text align="center">Welcome Back {user?.firstName} {user?.lastName}</Text>
    </Box>
    <Box className={classes.centerLogo}>
    <Image width={150} height={55} fit="contain" src={Logo} />
    </Box>
    </Box>
    <Box className={classes.responsiveContainerChild3}>
    <Box className={classes.searchWithToggle}><IconSearch onClick={handleIconSearchClick} color="gray" /></Box>
    <Box ml={'1rem'}><ActionToggle /></Box>
    <Box ml={'1rem'} mr={'1rem'}>
    <Menu shadow="" width={300}>
              <Menu.Target>
                <IconUserCircle size={'30px'}  color="gray" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<Image width={50} height={50} radius="50%" mx="auto" src={user?.profilePic} />}>
                
                <Text style={{ fontSize: '15px' }}>{user?.role}</Text>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                <Text  style={{ fontSize: '15px', color: 'gray' }}>{user?.firstName} {user?.lastName}</Text>
                  <Text style={{ color: '#A9A9A9' }}>{user?.email}</Text>
                </Menu.Item>
                <Menu.Divider />
                {/*
                <Menu.Label >Verification Status</Menu.Label>
                <Menu.Item icon={<IconUser size={25} color="green" />}>User is verified</Menu.Item>
                <Menu.Item icon={<IconPhone size={25} color="green" />}>Phone is verified</Menu.Item>
                <Menu.Divider />
  */}
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconEdit size={25} color="green" />} onClick={handleEdit}>Edit Profile</Menu.Item>
                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<IconLogout size={25} color="green" />} onClick={handleLogout} >Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            </Box>
    </Box>
    </Box>
    </SpotlightProvider>

  )
}

export default HeaderTop