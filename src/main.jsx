import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider, Box } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CustomFonts from "./GlobalFonts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Box>
    <Notifications />
    <CustomFonts />
    <App />
  </Box>
);
