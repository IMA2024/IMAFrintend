import { Title, Image, Box, Button, Group, createStyles, Text, Menu } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight, IconUser, IconBell, IconPhone, IconEdit, IconLogout, IconUserCircle } from '@tabler/icons-react';
import ActionToggle from "../../components/ColorMode";
import { HeaderSearchBar } from "../../components/search";
import HeaderSearch from "../../components/HeaderSearch";
import { notifications } from '@mantine/notifications';
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/users/userContext";
import Logo from '../../assets/Images/IMALogo.jpg';

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
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the local storage here
    localStorage.clear();
    setUser(null)
    navigate("/HeaderMegaMenu/SignIn");
  };

  return (
    <Box className={classes.responsiveContainer}>
    <Box  className={classes.responsiveContainerChild1} >
    <Box className={classes.LogoWithSearch}><Image width={150} height={55} fit="contain" src={Logo} /></Box>
    <Box className={classes.searchWithLogo}><IconSearch color="gray" /></Box>
    </Box>
    <Box className={classes.responsiveContainerChild2} >
    <Box className={classes.dashboardHeading}>
    <Title order={3} >ADMIN DASHBOARD</Title>
    <Text align="center">Welcome Back Admin</Text>
    </Box>
    <Box className={classes.centerLogo}>
    <Image width={150} height={55} fit="contain" src={Logo} />
    </Box>
    </Box>
    <Box className={classes.responsiveContainerChild3}>
    <Box className={classes.searchWithToggle}><IconSearch color="gray" /></Box>
    <Box ml={'2rem'}><ActionToggle /></Box>
    <Box ml={'2rem'} mr={'1rem'}>
    <Menu shadow="" width={300}>
              <Menu.Target>
                <IconUserCircle size={'25px'}  color="gray" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Text style={{ fontSize: '15px' }}>IMA SUPER ADMIN</Text>
                  <Text style={{ color: '#A9A9A9' }}>IntelligentMarketingAgent@gmail.com</Text>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label >Verification Status</Menu.Label>
                <Menu.Item icon={<IconUser size={25} color="green" />}>User is verified</Menu.Item>
                <Menu.Item icon={<IconPhone size={25} color="green" />}>Phone is verified</Menu.Item>
                <Menu.Divider />
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconEdit size={25} color="green" />}>Edit Profile</Menu.Item>
                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<IconLogout size={25} color="green" />} onClick={handleLogout} >Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            </Box>
    </Box>
    </Box>

  )
}

export default HeaderTop