import { Center } from '@mantine/core';
import {BrowserRouter as Router, Route, Link, Routes, json} from "react-router-dom"
import EmailBanner from './pages/Services';
import GeneralLayout from './SuperAdmin/Layout/GeneralLayout';
import ViewTable from './pages/ViewTable';
import AddExpense from './SuperAdmin/pages/Accounting/AddExpense';
import ViewExpense from './SuperAdmin/pages/Accounting/ViewExpense';
import AddUser from './SuperAdmin/pages/User/AddUser';
import ViewUser from './SuperAdmin/pages/User/ViewUser';
import EditUser from './SuperAdmin/pages/User/EditUser';
import HeaderMegaMenu from './Profiling/Layout/ProfilingLayout';
import SignIn from './pages/ProfilingPages/SignIn';
import SignUp from './pages/ProfilingPages/SignUp';
import AddRevenue from './SuperAdmin/pages/Accounting/AddRevenue';
import ViewRevenue from './SuperAdmin/pages/Accounting/ViewRevenue';
import ViewPayment from './SuperAdmin/pages/Payment/ViewPayment';
import AddBusiness from './SuperAdmin/pages/Business/AddBusiness';
import ViewBusiness from './SuperAdmin/pages/Business/ViewBusiness';
import EditBusiness from './SuperAdmin/pages/Business/EditBusiness';
import AddSubscription from './SuperAdmin/pages/Subscription/AddSubscription';
import ViewSubscription from './SuperAdmin/pages/Subscription/ViewSubscription';
import SubscriptionPaymentChart from './SuperAdmin/pages/Charts/SubscriptionPaymentChart';
import RevenueChart from './SuperAdmin/pages/Charts/RevenueChart';
import SubscriptionChart from './SuperAdmin/pages/Charts/SubscriptionChart';
import RegisteredBusinessChart from './SuperAdmin/pages/Charts/RegisteredBusinessChart';
import StatsGroup from './SuperAdmin/pages/Charts/GroupedStats';
import TotalRevenueBlocks from './SuperAdmin/pages/Charts/TotalRevenueBlocks';
import GroupedStackedColumns from './SuperAdmin/pages/Charts/GroupedStackedColumns';
import ColumnRotatedLabelChart from './SuperAdmin/pages/Charts/ColumnRotatedLabelChart';
import SimpleDonut from './SuperAdmin/pages/Charts/SimpleDonut';
import Dashboard from './SuperAdmin/pages/Charts/Dashboard';
import Services from './pages/Services';
import Reviews from './pages/Reviews';
import Faq from './pages/Faq';
import ContactUs from './pages/ContactUs';
 {/* These are the routes for Business Panel */}
 import BusinessPanelGeneralLayout from './BusinessOwner/Layout/BusinessPanelGeneralLayout';
import BusinessAdd from './BusinessOwner/pages/Business/AddBusiness';
import BusinessView from './BusinessOwner/pages/Business/ViewBusiness';
import BusinessEdit from './BusinessOwner/pages/Business/EditBusiness';
import AddBusinessOwner from './BusinessOwner/pages/BusinessOwner/AddBusinessOwner';
import ViewBusinessOwner from './BusinessOwner/pages/BusinessOwner/ViewBusinessOwner';
 {/* The routes for Business Panel end here*/}

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { useColorScheme } from '@mantine/hooks';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';


export default function Demo() {
  //const [colorScheme, toggleColorScheme] = useState('light');
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
        <Route path="ViewTable" element={<ViewTable />} />
        <Route path="AddExpense" element={<AddExpense />} />
        <Route path="ViewExpense" element={<ViewExpense />} />
        <Route path="AddUser" element={<AddUser />} />
        <Route path="ViewUser" element={<ViewUser />} />
        <Route path="EditUser" element={<EditUser />} />
        <Route path="AddRevenue" element={<AddRevenue />} />
        <Route path="ViewRevenue" element={<ViewRevenue />} />
        <Route path="ViewPayment" element={<ViewPayment />} />
        <Route path="AddBusiness" element={<AddBusiness />} />
        <Route path="ViewBusiness" element={<ViewBusiness />} />
        <Route path="EditBusiness" element={<EditBusiness />} />
        <Route path="AddSubscription" element={<AddSubscription />} />
        <Route path="ViewSubscription" element={<ViewSubscription />} />
        <Route path="SubscriptionPaymentChart" element={<SubscriptionPaymentChart />} />
        <Route path="RevenueChart" element={<RevenueChart />} />
        <Route path="SubscriptionChart" element={<SubscriptionChart />} />
        <Route path="RegisteredBusinessChart" element={<RegisteredBusinessChart />} />
        <Route path="StatsGroup" element={<StatsGroup />} />
        <Route path="ColumnRotatedLabelChart" element={<ColumnRotatedLabelChart />} />
        <Route path="GroupedStackedColumns" element={<GroupedStackedColumns />} />
        <Route path="TotalRevenueBlocks" element={<TotalRevenueBlocks />} />
        <Route path="SimpleDonut" element={<SimpleDonut />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Services" element={<Services />} />
        <Route path="Reviews" element={<Reviews />} />
        <Route path="Faq" element={<Faq />} />
        <Route path="ContactUs" element={<ContactUs />} />
        
      </Route>
      {/* These are the routes for Business Panel */}
      <Route path="/BusinessPanel" element={<BusinessPanelGeneralLayout />}>
      <Route path="BusinessAdd" element={<BusinessAdd />} />
      <Route path="BusinessView" element={<BusinessView />} />
      <Route path="BusinessEdit" element={<BusinessEdit />} />
      <Route path="AddBusinessOwner" element={<AddBusinessOwner />} />
      <Route path="ViewBusinessOwner" element={<ViewBusinessOwner />} />
      </Route>
      {/* The routes for Business Panel end here*/}
     </Routes>
    </Router>
 
      </>
  );
}