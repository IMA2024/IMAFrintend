import { Center } from '@mantine/core';
import { SpotlightProvider } from '@mantine/spotlight';
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
import EditSubscription from './SuperAdmin/pages/Subscription/EditSubscription';
import AddSubscription from './SuperAdmin/pages/Subscription/AddSubscription';
import ViewSubscription from './SuperAdmin/pages/Subscription/ViewSubscription';
import SubscriptionPaymentChart from './SuperAdmin/pages/Charts/SubscriptionPaymentChart';
import RevenueChart from './SuperAdmin/pages/Charts/ProfitChart';
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
import StatsGrid from './SuperAdmin/pages/Charts/UserBlocks';
import Chat from './SuperAdmin/pages/Chat/Chat';
import Settings from './SuperAdmin/pages/Settings/Settings';
import ViewProfit from './SuperAdmin/pages/Accounting/ViewProfit/ViewProfit';
import ViewFaqs from './SuperAdmin/pages/Faqs/ViewFaqs';
import FaqForm from './SuperAdmin/pages/Faqs/AddFaqs';
import EditFaqs from './SuperAdmin/pages/Faqs/EditFaqs';
import Radio from './SuperAdmin/pages/Accounting/ViewProfit/RevenueAndExpenses';

 {/* These are the routes for Business Panel */}
 import BusinessPanelGeneralLayout from './BusinessOwner/Layout/BusinessPanelGeneralLayout';
import BusinessAdd from './BusinessOwner/pages/Business/AddBusiness';
import BusinessView from './BusinessOwner/pages/Business/ViewBusiness';
import BusinessEdit from './BusinessOwner/pages/Business/EditBusiness';
import AddBusinessOwner from './BusinessOwner/pages/BusinessOwner/AddBusinessOwner';
import ViewBusinessOwner from './BusinessOwner/pages/BusinessOwner/ViewBusinessOwner';
import BuySubscription from './BusinessOwner/pages/Subscription/BuySubscription';
import ViewBusinessSubscription from './BusinessOwner/pages/Subscription/ViewSubscription';
import ConfigureAgents from './BusinessOwner/pages/Agents/ConfigureAgents';
import AddQuestionnaire from './BusinessOwner/pages/Questionnaire/AddQuestionnaire';
import ViewQuestionnaire from './BusinessOwner/pages/Questionnaire/ViewQuestionnaire';
import EditQuestionnaire from './BusinessOwner/pages/Questionnaire/EditQuestionnaire';
import BusinessPanelAddRevenue from './BusinessOwner/pages/Accounting/AddRevenue';
import BusinessPanelViewRevenue from './BusinessOwner/pages/Accounting/ViewRevenue';
import BusinessPanelAddExpense from './BusinessOwner/pages/Accounting/AddExpense';
import BusinessPanelViewExpense from './BusinessOwner/pages/Accounting/ViewExpense';
import UpdateConfigureAgents from './BusinessOwner/pages/Agents/UpdateConfigureAgents';
import AgentsView from './BusinessOwner/pages/Agents/ViewAgents';
 {/* The routes for Business Panel end here*/}

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { useColorScheme } from '@mantine/hooks';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { UserProvider } from './context/users/userContext';


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
     
    <Router><UserProvider>
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
        <Route path="EditSubscription" element={<EditSubscription />} />
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
        <Route path="StatsGrid" element={<StatsGrid />} /> 
        <Route path="Chat" element={<Chat />} /> 
        <Route path="Settings" element={<Settings />} /> 
        <Route path="ViewProfit" element={<ViewProfit />} />
        <Route path="ViewFaqs" element={<ViewFaqs />} />
        <Route path="FaqForm" element={<FaqForm />} />
        <Route path="EditFaqs" element={<EditFaqs />} />
        <Route path="Radio" element={<Radio />} />
       
      </Route>
      {/* These are the routes for Business Panel */}
      <Route path="/BusinessPanel" element={<BusinessPanelGeneralLayout />}>
      <Route path="BusinessAdd" element={<BusinessAdd />} />
      <Route path="BusinessView" element={<BusinessView />} />
      <Route path="BusinessEdit" element={<BusinessEdit />} />
      <Route path="AddBusinessOwner" element={<AddBusinessOwner />} />
      <Route path="ViewBusinessOwner" element={<ViewBusinessOwner />} />
      <Route path="BuySubscription" element={<BuySubscription />} />
      <Route path="ViewBusinessSubscription" element={<ViewBusinessSubscription />} />
      <Route path="ConfigureAgents" element={<ConfigureAgents />} />
      <Route path="AddQuestionnaire" element={<AddQuestionnaire />} />
      <Route path="ViewQuestionnaire" element={<ViewQuestionnaire />} />
      <Route path="EditQuestionnaire" element={<EditQuestionnaire />} />
      <Route path="BusinessPanelAddRevenue" element={<BusinessPanelAddRevenue />} />
      <Route path="BusinessPanelViewRevenue" element={<BusinessPanelViewRevenue />} />
      <Route path="BusinessPanelAddExpense" element={<BusinessPanelAddExpense />} />
      <Route path="BusinessPanelViewExpense" element={<BusinessPanelViewExpense />} />
      <Route path="UpdateConfigureAgents" element={<UpdateConfigureAgents />} />
      <Route path="AgentsView" element={<AgentsView />} />
      </Route>
      {/* The routes for Business Panel end here*/}
     </Routes></UserProvider>
    </Router>
 
      </>
  );
}
