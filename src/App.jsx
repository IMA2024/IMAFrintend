import { Center } from '@mantine/core';
import {BrowserRouter as Router, Route, Link, Routes, json} from "react-router-dom"
import EmailBanner from './pages/Services';
import ContactIcons from './pages/ContactUs';
import GeneralLayout from './SuperAdmin/Layout/GeneralLayout';
import Testing from './pages/test';
import ViewTable from './pages/ViewTable';
import AddExpense from './SuperAdmin/pages/Accounting/AddExpense';
import ViewExpense from './SuperAdmin/pages/Accounting/ViewExpense';
import AddUser from './SuperAdmin/pages/User/AddUser';
import ViewUser from './SuperAdmin/pages/User/ViewUser';
import EditUser from './SuperAdmin/pages/User/EditUser';
import HeaderMegaMenu from './Profiling/Layout/ProfilingLayout';
import SignIn from './pages/ProfilingPages/SignIn';
import SignUp from './pages/ProfilingPages/SignUp';
import { useState, useEffect } from 'react';
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
      <Route path="/HeaderMegaMenu" element={<HeaderMegaMenu />}>
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />
      </Route>
      <Route path="/" element={<GeneralLayout />}>
        <Route path="EmailBanner" element={<EmailBanner />} />
        <Route path="ContactIcons" element={<ContactIcons />} />
        <Route path="Testing" element={<Testing />} />
        <Route path="ViewTable" element={<ViewTable />} />
        <Route path="AddExpense" element={<AddExpense />} />
        <Route path="ViewExpense" element={<ViewExpense />} />
        <Route path="AddUser" element={<AddUser />} />
        <Route path="ViewUser" element={<ViewUser />} />
        <Route path="EditUser" element={<EditUser />} />
      </Route>
     </Routes>
    </Router>
 
      </>
  );
}