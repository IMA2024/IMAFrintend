import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SpotlightProvider, spotlight } from '@mantine/spotlight';
import { IconHome, IconDashboard, IconFileText, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
 
  
  <React.StrictMode>
     <MantineProvider withNormalizeCSS withGlobalStyles
       theme={{
        fontFamily: 'Verdana, sans-serif',
        //fontFamily: 'Greycliff CF, sans-serif',
        fontFamilyMonospace: 'Monaco, Courier, monospace',
        headings: { fontFamily: 'Greycliff CF, sans-serif' },
        //colorScheme: 'dark',
      }}
     >
      {/*
     <SpotlightProvider shortcut={['mod + P', 'mod + K', '/']} actions={[ {
    title: 'Home',
    description: 'Get to home page',
    onTrigger: () => console.log('Home'),
    icon: <IconHome size="1.2rem" />,
  },
  ]}>
*/}
      <Notifications />
    <App />
    {/*</SpotlightProvider>*/}
    </MantineProvider>
  </React.StrictMode>

)
