import { Box, Button, Group, createStyles, Text, Menu } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight, IconUser, IconBell, IconPhone, IconEdit, IconLogout } from '@tabler/icons-react';
import ActionToggle from "../../components/ColorMode";
import { HeaderSearchBar } from "../../components/search";
import HeaderSearch from "../../components/HeaderSearch";
import { notifications } from '@mantine/notifications';
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/users/userContext";

const useStyles = createStyles((theme) => ({

  responsiveTitle: {
    marginLeft: '10%',
    width:'299px',

    [theme.fn.smallerThan('md')]: {
      width:'99px',
    },
  },

  responsiveContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between'
    },

  },

  responsiveContainerChild1: {
    backgroundColor: '#770737',
    boxSizing: 'border-box',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '45px',
    display: 'flex',
    justifyContent: 'left',

    [theme.fn.smallerThan('md')] :{
      backgroundColor: 'white',
      color:'black',
    },

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'right',
      paddingLeft: '0%',
    },

  },

  responsiveContainerChild2and3: {
    width:'74%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',

    [theme.fn.smallerThan('sm')]: {
      justifyContent:'right',
    },

    [theme.fn.smallerThan('lg')]: {
    },

  },

  responsiveContainerChild2: {
    fontWeight: 'bold',
    fontSize: '45px',
    marginTop: '15px',
    marginLeft: '30px',

    [theme.fn.smallerThan('lg')]: {
    },

    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    },


  },

  responsiveContainerChild3: {
    width:'15%',
    fontWeight: 'bold',
    fontSize: '45px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('lg')]: {
      width:'20%',
    },

    [theme.fn.smallerThan('sm')]: {
      width:'35%',
    },
  
  },

  inputField: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%'
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
      <Box className={classes.responsiveContainerChild1}>
        <Text className={classes.responsiveTitle}>IMA</Text>
      </Box>
      <Box className={classes.responsiveContainerChild2and3}>
        <Box className={classes.responsiveContainerChild2}>
          <HeaderSearch />
        </Box>
        <Box className={classes.responsiveContainerChild3}>
          <Box
            onClick={() => {
              Array(5).fill(0).forEach((_, index) => {
                setTimeout(() => {
                  notifications.show({
                    title: `Notification ${index + 1}`,
                    message: 'Most notifications are added to queue',
                  });
                }, 200 * index);
              });
            }}
          >
            <IconBell color="gray" />
          </Box>
          <Box>
            <ActionToggle />
          </Box>
          <Box>
            <Menu shadow="" width={300}>
              <Menu.Target>
                <IconUser color="gray" />
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
    </Box>

  )
}

export default HeaderTop