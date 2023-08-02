import { Center } from '@mantine/core';
import {BrowserRouter as Router, Route, Link, Routes, json} from "react-router-dom"
import EmailBanner from './pages/Services';
import ContactIcons from './pages/ContactUs';
import GeneralLayout from './SuperAdmin/Layout/GeneralLayout';
import AuthenticationForm from './pages/form';
import AddExpense from './pages/test';
import Datepicker from './components/Date';
import ViewModal from './components/ViewModal';
import ViewTable from './pages/ViewTable';
import { useState, useEffect } from 'react';
import { HeaderSearchBar } from './components/search';
import { useLocalStorage } from '@mantine/hooks';
import { useColorScheme } from '@mantine/hooks';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';


export default function Demo() {
  /*
    // State variable to hold the value from local storage
    const [storedValue, setStoredValue] = useState('');

    // Key to access the value from local storage
    const storageKey = 'color-scheme';
  
    // Function to update the state with the value from local storage
    useEffect(() => {
      // Retrieve the value associated with storageKey from local storage
      const valueFromLocalStorage = localStorage.getItem('color-scheme');
  
      // Update the state with the retrieved value
      setStoredValue(valueFromLocalStorage);
      console.log(valueFromLocalStorage);

      
    });

    //console.log(storedValue);
    //console.log(valueFromLocalStorage);
    */
    //const storedValue = useLocalStorage('color-scheme', 'light');
    //console.log(storedValue);
  
  return (
      <>
     
    <Router>
     <Routes>
      <Route path="/" element={<GeneralLayout />}>
        <Route
          path="EmailBanner"
          element={<EmailBanner />}
        />
        <Route path="ContactIcons" element={<ContactIcons />} />
        <Route path="HeaderSearchBar" element={<HeaderSearchBar />} />
        <Route path="AuthenticationForm" element={<AuthenticationForm />} />
        <Route path="AddExpense" element={<AddExpense />} />
        <Route path="Datepicker" element={<Datepicker />} />
        <Route path="ViewTable" element={<ViewTable />} />
        <Route path="ViewModal" element={<ViewModal />} />
      </Route>
     </Routes>
    </Router>
 
      </>
  );
}