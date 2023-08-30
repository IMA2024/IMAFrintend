import { useState, useContext } from 'react';
import {
  AppShell, Navbar, Header, MediaQuery, Burger, useMantineTheme, Box, ScrollArea } from '@mantine/core';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate, Outlet } from "react-router-dom";
import HeaderTop from './Header';
import SuperAdminNavbar from './SuperAdminNavbar';
import { SuperAdminSideBarData } from './SuperAdminSidebarData';
import { BusinessSideBarData } from '../../BusinessOwner/Layout/BusinessSideBarData';
import { UserContext } from '../../context/users/userContext';

export default function GeneralLayout() {
  let auth = { token: true };
  const { user } = useContext(UserContext);
  let role = user?.role;
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenChange = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.clear();
        navigate('/HeaderMegaMenu/SignIn');
      }
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, [navigate]);

            /*    
  sideBarLinks = {
      role === "Social Worker"
      ? socialSideBarData
      : role === "Psychologist"
      ? psychSideBarData
      : role === "Lawyer"
      ? LawyerSidebarData
      : role === "Admin"
      ? ngoAdminSideBarData
      : role === "User"
      ? UserSidebarData
      : []
  }
  */
  {/*SuperAdminSideBarData={SuperAdminSideBarData}*/} 
  

  return (
    auth.token ? (
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],

          },
        }}
        navbarOffsetBreakpoint="md"
        navbar={
          <Navbar
          // bg={'#770737'} 
          //bg={'#66A80F'}
          //bg={'#5C940D'}
          bg={role === "Super Admin" ? '#5C940D' : role === "Business Owner" ? '#5F3DC4' : '#66A80F'}
          hiddenBreakpoint="md"
           hidden={!opened} width={{ sm: 300, lg: 300 }} mt={-1} >
            <ScrollArea type='never' >
            <SuperAdminNavbar
              SuperAdminSideBarData= {
                role === "Super Admin"
                ? SuperAdminSideBarData
                : role === "Business Owner"
                ? BusinessSideBarData
                : []
            }
            />
            </ScrollArea>
          </Navbar>
        }
        header={
          <Header bg={'#E9ECEF'} height={{ base: 70, md: 70 }}  >
            <div style={{ display: 'flex', height: '100%' }}>
              <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                <Burger
                  mt={'lg'}
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <HeaderTop />
            </div>
          </Header>
        }

      >
        <Box>
          <Outlet />
        </Box>
      </AppShell>) : <Navigate to='/HeaderMegaMenu' />
  );
}
