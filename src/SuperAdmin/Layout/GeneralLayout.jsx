import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  ScrollArea,
} from '@mantine/core';
import { Navigate, Outlet } from "react-router-dom";
import HeaderTop from './Header';
import SuperAdminNavbar from './SuperAdminNavbar';
import { SuperAdminSideBarData } from './SuperAdminSidebarData';

export default function GeneralLayout() {
  let auth = { token: true }
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
          bg={'#66A80F'}
          hiddenBreakpoint="md"
           hidden={!opened} width={{ sm: 300, lg: 300 }} mt={-1} >
            <ScrollArea type='never' >
            <SuperAdminNavbar
              SuperAdminSideBarData={SuperAdminSideBarData} />
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
