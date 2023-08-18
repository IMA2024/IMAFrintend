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
import LeftNavbar from './Navbar';
import HeaderTop from './Header';

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
          <Navbar bg={'#770737'} hiddenBreakpoint="md" hidden={!opened} width={{ sm: 300, lg: 300 }} mt={-1} >
            <ScrollArea type='never' >
              <LeftNavbar />
            </ScrollArea>
          </Navbar>
        }
        header={
          <Header height={{ base: 70, md: 70 }}  >
            <div style={{ display: 'flex', height: '100%' }}>
              <MediaQuery largerThan="md" styles={{ display: 'none' }}>
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
      </AppShell>) : <Navigate to='/HeaderMegaMenu' />
  );
}
