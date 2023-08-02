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
import LeftNavbar from '../../pages/Navbar';
import HeaderTop from '../../pages/Header';

export default function GeneralLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
         
        },
      }}
      navbarOffsetBreakpoint="md"
      
      navbar={
      <Navbar hiddenBreakpoint="md" hidden={!opened} width={{ sm: 300,  lg: 300 }} mt={-1} >
        <ScrollArea type='never'>
          <LeftNavbar />
          </ScrollArea>
        </Navbar>
      }
      header={
        <Header height={{ base:70, md: 70 }}  >
          <div style={{ display: 'flex', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
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
    </AppShell>
  );
}
