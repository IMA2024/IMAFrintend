import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SpotlightProvider } from '@mantine/spotlight';

ReactDOM.createRoot(document.getElementById('root')).render(
 
  
  <React.StrictMode>
     <MantineProvider withNormalizeCSS withGlobalStyles
       theme={{
        fontFamily: 'Verdana, sans-serif',
        fontFamilyMonospace: 'Monaco, Courier, monospace',
        headings: { fontFamily: 'Greycliff CF, sans-serif' },
      }}
     >
     <SpotlightProvider shortcut={['mod + P', 'mod + K', '/']} actions={[]}>
      <Notifications />
    <App />
    </SpotlightProvider>
    </MantineProvider>
  </React.StrictMode>

)
