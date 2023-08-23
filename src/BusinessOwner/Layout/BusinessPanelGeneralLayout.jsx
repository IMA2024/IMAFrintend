import { useState } from "react";
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
} from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import BusinessPanelLeftNavbar from "./Navbar";
import BusinessPanelHeaderTop from "./Header";
import { BusinessSideBarData } from "./BusinessSideBarData";
export default function BusinessPanelGeneralLayout() {
  let auth = { token: true };
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  let role = "admin";
/*
  sideBarLinks={
    user.role === "Social Worker"
      ? socialSideBarData
      : user.role === "Psychologist"
      ? psychSideBarData
      : user.role === "Lawyer"
      ? LawyerSidebarData
      : user.role === "Admin"
      ? ngoAdminSideBarData
      : user.role === "User"
      ? UserSidebarData
      : []
  }
  */

  return auth.token ? (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="md"
      navbar={
        <Navbar
         bg={"#5F3DC4"}
         style={{display: 'flex', flexDirection: 'column' }}
          hiddenBreakpoint="md"
          hidden={!opened}
          width={{ sm: 300, lg: 300 }}
          mt={-1}

        >
        <ScrollArea type="never">
            <BusinessPanelLeftNavbar
              BusinessSideBarData={role === "admin" ? BusinessSideBarData : []} />
          </ScrollArea>
        </Navbar>
      }
      header={
        <Header height={{ base: 70, md: 70 }}>
          <div style={{ display: "flex", height: "100%" }}>
            <MediaQuery largerThan="md" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <BusinessPanelHeaderTop />
          </div>
        </Header>
      }
    >
      <Box>
        <Outlet />
      </Box>
    </AppShell>
  ) : (
    <Navigate to="/HeaderMegaMenu" />
  );
}
