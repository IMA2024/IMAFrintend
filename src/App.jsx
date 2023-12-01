import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  json,
} from "react-router-dom";
import EmailBanner from "./pages/LandingPage/Services";
import GeneralLayout from "./SuperAdmin/Layout/GeneralLayout";
import ViewTable from "./pages/ViewTable";
import AddExpense from "./SuperAdmin/pages/Accounting/AddExpense";
import ViewExpense from "./SuperAdmin/pages/Accounting/ViewExpense";
import AddUser from "./SuperAdmin/pages/User/AddUser";
import ViewUser from "./SuperAdmin/pages/User/ViewUser";
import EditUser from "./SuperAdmin/pages/User/EditUser";
import HeaderMegaMenu from "./Profiling/Layout/ProfilingLayout";
import SignIn from "./pages/ProfilingPages/SignIn";
import SignUp from "./pages/ProfilingPages/SignUp";
import AddRevenue from "./SuperAdmin/pages/Accounting/AddRevenue";
import ViewRevenue from "./SuperAdmin/pages/Accounting/ViewRevenue";
import ViewPayment from "./SuperAdmin/pages/Payment/ViewPayment";
import AddBusiness from "./SuperAdmin/pages/Business/AddBusiness";
import ViewBusiness from "./SuperAdmin/pages/Business/ViewBusiness";
import EditBusiness from "./SuperAdmin/pages/Business/EditBusiness";
import EditSubscription from "./SuperAdmin/pages/Subscription/EditSubscription";
import AddSubscription from "./SuperAdmin/pages/Subscription/AddSubscription";
import ViewSubscription from "./SuperAdmin/pages/Subscription/ViewSubscription";
import SubscriptionPaymentChart from "./SuperAdmin/pages/Charts/SubscriptionPaymentChart";
import RevenueChart from "./SuperAdmin/pages/Charts/ProfitChart";
import SubscriptionChart from "./SuperAdmin/pages/Charts/SubscriptionChart";
import RegisteredBusinessChart from "./SuperAdmin/pages/Charts/RegisteredBusinessChart";
import StatsGroup from "./SuperAdmin/pages/Charts/GroupedStats";
import TotalRevenueBlocks from "./SuperAdmin/pages/Charts/TotalRevenueBlocks";
import GroupedStackedColumns from "./SuperAdmin/pages/Charts/GroupedStackedColumns";
import ColumnRotatedLabelChart from "./SuperAdmin/pages/Charts/ColumnRotatedLabelChart";
import SimpleDonut from "./SuperAdmin/pages/Charts/SimpleDonut";
import Dashboard from "./SuperAdmin/pages/Charts/Dashboard";
import RegisteredBusinessDonutSA from "./SuperAdmin/pages/Charts/RegisteredBusinessDonutSA";
import ViewTerms from "./SuperAdmin/pages/TermsConditions/ViewTerms";
import ViewRules from "./SuperAdmin/pages/RulesRegulations/ViewRules";
import OurTeam from "./SuperAdmin/pages/OurTeam/OurTeam";
import EditRevenue from "./SuperAdmin/pages/Accounting/EditRevenue";
import EditExpense from "./SuperAdmin/pages/Accounting/EditExpense";
import ChatMessages from "./SuperAdmin/pages/Chat/ChatMessages.jsx";
//import Chatbot from "./SuperAdmin/pages/Chat/Chatbot.jsx";

//import Reviews from './pages/Reviews';
import Reviews from "./pages/LandingPage/Reviews";
import Faq from "./pages/Faq";
//import ContactUs from './pages/ContactUs';
import ContactUs from "./pages/LandingPage/ContactUs";

import StatsGrid from "./SuperAdmin/pages/Charts/UserBlocks";
import Chat from "./SuperAdmin/pages/Chat/Chat";
import Settings from "./SuperAdmin/pages/Settings/Settings";
import ViewProfit from "./SuperAdmin/pages/Accounting/ViewProfit/ViewProfit";
import ViewFaqs from "./SuperAdmin/pages/Faqs/ViewFaqs";
import FaqForm from "./SuperAdmin/pages/Faqs/AddFaqs";
import EditFaqs from "./SuperAdmin/pages/Faqs/EditFaqs";
import Radio from "./SuperAdmin/pages/Accounting/ViewProfit/RevenueAndExpenses";
{
  /* These are the routes for Landing Page */
}
import HeroHeader from "./pages/LandingPage/HeroHeader";
import StepperHeadings from "./pages/LandingPage/StepperHeadings";
import StepperDescription from "./pages/LandingPage/SteppperDescription";
import StepperDetails from "./pages/LandingPage/StepperDetails";
import AboutImaDetails from "./pages/LandingPage/AboutImaDetails";
import AboutImaCarousel from "./pages/LandingPage/AboutImaCarousel";
import AboutIma from "./pages/LandingPage/AboutIma";
import Services from "./pages/LandingPage/Services";
import LandingFooter from "./pages/LandingPage/LandingFooter";
import LandingHeader from "./pages/LandingPage/LandingHeader";
import WhyChooseUs from "./pages/LandingPage/WhyChooseUs";
import AboutUsPage from "./pages/LandingPage/CompletePages/AboutUsPage";
import ContactUsPage from "./pages/LandingPage/CompletePages/ContactUsPage";
import ServicesPage from "./pages/LandingPage/CompletePages/ServicesPage";
{
  /* The routes for Landing Page end here*/
}
{
  /* These are the routes for Business Panel */
}
import BusinessPanelGeneralLayout from "./BusinessOwner/Layout/BusinessPanelGeneralLayout";
import BusinessAdd from "./BusinessOwner/pages/Business/AddBusiness";
import BusinessView from "./BusinessOwner/pages/Business/ViewBusiness";
import BusinessEdit from "./BusinessOwner/pages/Business/EditBusiness";
import AddBusinessOwner from "./BusinessOwner/pages/BusinessOwner/AddBusinessOwner";
import ViewBusinessOwner from "./BusinessOwner/pages/BusinessOwner/ViewBusinessOwner";
import BuySubscription from "./BusinessOwner/pages/Subscription/BuySubscription";
import ViewBusinessSubscription from "./BusinessOwner/pages/Subscription/ViewSubscription";
import ConfigureAgents from "./BusinessOwner/pages/Agents/ConfigureAgents";
import AddQuestionnaire from "./BusinessOwner/pages/Questionnaire/AddQuestionnaire";
import ViewQuestionnaire from "./BusinessOwner/pages/Questionnaire/ViewQuestionnaire";
import EditQuestionnaire from "./BusinessOwner/pages/Questionnaire/EditQuestionnaire";
import BusinessPanelAddRevenue from "./BusinessOwner/pages/Accounting/AddRevenue";
import BusinessPanelViewRevenue from "./BusinessOwner/pages/Accounting/ViewRevenue";
import BusinessPanelAddExpense from "./BusinessOwner/pages/Accounting/AddExpense";
import BusinessPanelViewExpense from "./BusinessOwner/pages/Accounting/ViewExpense";
import UpdateConfigureAgents from "./BusinessOwner/pages/Agents/UpdateConfigureAgents";
import AgentsView from "./BusinessOwner/pages/Agents/ViewAgents";
import BusinessPanelDashboard from "./BusinessOwner/pages/Dashboard/Dashboard";
import BusinessBlocksBO from "./BusinessOwner/pages/Dashboard/BusinessBlocksBO";
//import BusinessPanelViewProfit from './BusinessOwner/pages/Accounting/ViewProfit';
import BusinessPanelViewProfit from "./BusinessOwner/pages/Accounting/ViewProfit/ViewProfit";
import BusinessOwnerViewFaqs from "./BusinessOwner/pages/Faq/BusinessOwnerFaq";
import BusinessPanelViewPayment from "./BusinessOwner/pages/Accounting/ViewPayments";
import ChatBusinessOwner from "./BusinessOwner/pages/Chat/ChatBusinessOwner";
import RegisteredBusinessChartBO from "./BusinessOwner/pages/Dashboard/RegisteredBusinessChartBO";
import SubscriptionsBlockBO from "./BusinessOwner/pages/Dashboard/SubscriptionBlockBO";
import SubscriptionChartBO from "./BusinessOwner/pages/Dashboard/SubscriptionChartBO";
import ProfitBlocksBO from "./BusinessOwner/pages/Dashboard/ProfitBlocksBO";
import ProfitChartBO from "./BusinessOwner/pages/Dashboard/ProfitChartBO";
import SubscriptionPaymentChartBO from "./BusinessOwner/pages/Dashboard/SubscriptionPaymentChartBO";
import RegisteredBusinessDonutBO from "./BusinessOwner/pages/Dashboard/RegisteredBusinessDonut";
import ServicesBO from "./BusinessOwner/pages/Services/ServicesBO";
import SettingsBO from "./BusinessOwner/pages/Settings/SettingsBO";
import BusinessOwnerChatMessages from "./BusinessOwner/pages/Chat/BusinessOwnerChatMessages.jsx";
{
  /* The routes for Business Panel end here*/
}

{
  /* These are the routes for Marketung Agent Panel */
}
import ConfigureCrawler from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ChooseCrawler/ConfigureCrawler";
import ChooseBusiness from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ChooseBusiness/ChooseBusiness";
import BusinessOwnerQuestions from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ChooseQuestionnaire.jsx/BusinessOwnerQuestions";
import MarketingAgentQuestions from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ChooseQuestionnaire.jsx/MarketingAgentQuestions";
import QuestionnaireTab from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ChooseQuestionnaire.jsx/QuestionnaireTab";
import ChooseQuestionnaire from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ChooseQuestionnaire.jsx/ChooseQuestionnaire";
import AgentConfiguration from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ChooseAgent/AgentConfigiration";
import ExecuteDialer from "./MarketingAgent.jsx/pages/ExecuteDialer.jsx/ExecuteDialer";
import ViewCallPriority from "./MarketingAgent.jsx/pages/CallPriorityCollection/ViewCallPriority";
import AddQuestionnaireMA from "./MarketingAgent.jsx/pages/Questionnaire/AddQuestionnaire";
import ViewQuestionnaireMA from "./MarketingAgent.jsx/pages/Questionnaire/ViewQuestionnaireMA";
import ViewAgentsMA from "./MarketingAgent.jsx/pages/Agents/ViewAgentsMA";
import ConfigureAgentsMA from "./MarketingAgent.jsx/pages/Agents/ConfigureAgentsMA";
import ConfigureCrawlerMA from "./MarketingAgent.jsx/pages/ConfigureCrawler/ConfigureCrawlerMA";
import EditAgentsMA from "./MarketingAgent.jsx/pages/Agents/EditAgentsMA";
import DashboardMA from "./MarketingAgent.jsx/pages/Dashboard/DashboardMA";
import AutoDialer from "./MarketingAgent.jsx/pages/AutoDialer/AutoDialer";
import SettingsMA from "./MarketingAgent.jsx/pages/Settings/SettingsMA";
import ChatMA from "./MarketingAgent.jsx/pages/Chat/ChatMA.jsx";
import ChatHeaderMA from "./MarketingAgent.jsx/pages/Chat/ChatHeaderMA.jsx";
import ChatInputMA from "./MarketingAgent.jsx/pages/Chat/ChatInputMA.jsx";
import ChatNavbarContentMA from "./MarketingAgent.jsx/pages/Chat/ChatNavbarContentMA.jsx";
import ChatMessagesMA from "./MarketingAgent.jsx/pages/Chat/ChatMessagesMA.jsx";
import ChatSearchMA from "./MarketingAgent.jsx/pages/Chat/ChatSearchMA.jsx";
{
  /* The routes for Marketung Agent Panel end here*/
}

import { useState, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useColorScheme } from "@mantine/hooks";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { UserProvider } from "./context/users/userContext";
import { SpotlightProvider } from "@mantine/spotlight";
import PaymentSucces from "./BusinessOwner/components/PaymentSucces";
import PaymentUnsuccessful from "./BusinessOwner/components/PaymentUnsuccessful";
import LandingPage from "./pages/LandingPage/LandingPage";
import { theme } from "./components/theme.js";

export default function Demo() {
  
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = (value) =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <Router>
            <UserProvider>
              <Routes>
                <Route path="/LandingPage" element={<LandingPage />} />
                <Route path="/StepperDetails" element={<StepperDetails />} />
                <Route path="/StepperHeadings" element={<StepperHeadings />} />
                <Route
                  path="/StepperDescription"
                  element={<StepperDescription />}
                />
                <Route path="/AboutImaDetails" element={<AboutImaDetails />} />
                <Route
                  path="/AboutImaCarousel"
                  element={<AboutImaCarousel />}
                />
                <Route path="/AboutIma" element={<AboutIma />} />
                <Route path="Services" element={<Services />} />
                <Route path="ContactUs" element={<ContactUs />} />
                <Route path="LandingFooter" element={<LandingFooter />} />
                <Route path="Reviews" element={<Reviews />} />
                <Route path="LandingHeader" element={<LandingHeader />} />
                <Route path="WhyChooseUs" element={<WhyChooseUs />} />
                <Route path="AboutUsPage" element={<AboutUsPage />} />
                <Route path="ContactUsPage" element={<ContactUsPage />} />
                <Route path="ServicesPage" element={<ServicesPage />} />

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
                  <Route
                    path="EditSubscription"
                    element={<EditSubscription />}
                  />
                  <Route path="AddSubscription" element={<AddSubscription />} />
                  <Route
                    path="ViewSubscription"
                    element={<ViewSubscription />}
                  />
                  <Route
                    path="SubscriptionPaymentChart"
                    element={<SubscriptionPaymentChart />}
                  />
                  <Route path="RevenueChart" element={<RevenueChart />} />
                  <Route
                    path="SubscriptionChart"
                    element={<SubscriptionChart />}
                  />
                  <Route
                    path="RegisteredBusinessChart"
                    element={<RegisteredBusinessChart />}
                  />
                  <Route path="StatsGroup" element={<StatsGroup />} />
                  <Route
                    path="ColumnRotatedLabelChart"
                    element={<ColumnRotatedLabelChart />}
                  />
                  <Route
                    path="GroupedStackedColumns"
                    element={<GroupedStackedColumns />}
                  />
                  <Route
                    path="TotalRevenueBlocks"
                    element={<TotalRevenueBlocks />}
                  />
                  <Route path="SimpleDonut" element={<SimpleDonut />} />
                  <Route path="Dashboard" element={<Dashboard />} />
                  <Route
                    path="RegisteredBusinessDonutSA"
                    element={<RegisteredBusinessDonutSA />}
                  />
                  <Route path="EditRevenue" element={<EditRevenue />} />
                  <Route path="EditExpense" element={<EditExpense />} />

                  <Route path="Faq" element={<Faq />} />

                  <Route path="StatsGrid" element={<StatsGrid />} />
                  <Route path="Chat" element={<Chat />} />
                  <Route path="Settings" element={<Settings />} />
                  <Route path="ViewProfit" element={<ViewProfit />} />
                  <Route path="ViewFaqs" element={<ViewFaqs />} />
                  <Route path="FaqForm" element={<FaqForm />} />
                  <Route path="EditFaqs" element={<EditFaqs />} />
                  <Route path="Radio" element={<Radio />} />
                  <Route path="ViewTerms" element={<ViewTerms />} />
                  <Route path="ViewRules" element={<ViewRules />} />
                  <Route path="OurTeam" element={<OurTeam />} />
                  <Route path="ChatMessages" element={<ChatMessages />} />
              {/*  <Route path="Chatbot" element={<Chatbot />} />*/}

                  {/* These are the routes for Business Panel */}
                  <Route path="/BusinessAdd" element={<BusinessAdd />} />
                  <Route path="BusinessView" element={<BusinessView />} />
                  <Route path="BusinessEdit" element={<BusinessEdit />} />
                  <Route
                    path="AddBusinessOwner"
                    element={<AddBusinessOwner />}
                  />
                  <Route
                    path="ViewBusinessOwner"
                    element={<ViewBusinessOwner />}
                  />
                  <Route path="BuySubscription" element={<BuySubscription />} />
                  <Route
                    path="ViewBusinessSubscription"
                    element={<ViewBusinessSubscription />}
                  />
                  <Route path="ConfigureAgents" element={<ConfigureAgents />} />
                  <Route
                    path="AddQuestionnaire"
                    element={<AddQuestionnaire />}
                  />
                  <Route
                    path="ViewQuestionnaire"
                    element={<ViewQuestionnaire />}
                  />
                  <Route
                    path="EditQuestionnaire"
                    element={<EditQuestionnaire />}
                  />
                  <Route
                    path="BusinessPanelAddRevenue"
                    element={<BusinessPanelAddRevenue />}
                  />
                  <Route
                    path="BusinessPanelViewRevenue"
                    element={<BusinessPanelViewRevenue />}
                  />
                  <Route
                    path="BusinessPanelAddExpense"
                    element={<BusinessPanelAddExpense />}
                  />
                  <Route
                    path="BusinessPanelViewExpense"
                    element={<BusinessPanelViewExpense />}
                  />
                  <Route
                    path="UpdateConfigureAgents"
                    element={<UpdateConfigureAgents />}
                  />
                  <Route path="AgentsView" element={<AgentsView />} />
                  <Route
                    path="BusinessPanelDashboard"
                    element={<BusinessPanelDashboard />}
                  />
                  <Route path="PaymentSucces" element={<PaymentSucces />} />
                  <Route
                    path="PaymentUnsuccessful"
                    element={<PaymentUnsuccessful />}
                  />
                  <Route
                    path="BusinessPanelViewProfit"
                    element={<BusinessPanelViewProfit />}
                  />
                  <Route
                    path="BusinessOwnerViewFaqs"
                    element={<BusinessOwnerViewFaqs />}
                  />
                  <Route
                    path="BusinessPanelViewPayment"
                    element={<BusinessPanelViewPayment />}
                  />
                  <Route
                    path="ChatBusinessOwner"
                    element={<ChatBusinessOwner />}
                  />
                  <Route
                    path="BusinessBlocksBO"
                    element={<BusinessBlocksBO />}
                  />
                  <Route
                    path="RegisteredBusinessChartBO"
                    element={<RegisteredBusinessChartBO />}
                  />
                  <Route
                    path="SubscriptionsBlockBO"
                    element={<SubscriptionsBlockBO />}
                  />
                  <Route
                    path="SubscriptionChartBO"
                    element={<SubscriptionChartBO />}
                  />
                  <Route path="ProfitBlocksBO" element={<ProfitBlocksBO />} />
                  <Route path="ProfitChartBO" element={<ProfitChartBO />} />
                  <Route
                    path="SubscriptionPaymentChartBO"
                    element={<SubscriptionPaymentChartBO />}
                  />
                  <Route
                    path="RegisteredBusinessDonutBO"
                    element={<RegisteredBusinessDonutBO />}
                  />
                  <Route path="ServicesBO" element={<ServicesBO />} />
                  <Route path="SettingsBO" element={<SettingsBO />} />
                  <Route path="SettingsBO" element={<BusinessOwnerChatMessages />} />
                  {/* The routes for Business Panel end here*/}

                  {/* These are the routes for Marketung Agent Panel */}
                  <Route
                    path="ConfigureCrawler"
                    element={<ConfigureCrawler />}
                  />
                  <Route path="ChooseBusiness" element={<ChooseBusiness />} />
                  <Route
                    path="BusinessOwnerQuestions"
                    element={<BusinessOwnerQuestions />}
                  />
                  <Route
                    path="MarketingAgentQuestions"
                    element={<MarketingAgentQuestions />}
                  />
                  <Route
                    path="QuestionnaireTab"
                    element={<QuestionnaireTab />}
                  />
                  <Route
                    path="ChooseQuestionnaire"
                    element={<ChooseQuestionnaire />}
                  />
                  <Route
                    path="AgentConfiguration"
                    element={<AgentConfiguration />}
                  />
                  <Route path="ExecuteDialer" element={<ExecuteDialer />} />
                  <Route
                    path="ViewCallPriority"
                    element={<ViewCallPriority />}
                  />
                  <Route
                    path="AddQuestionnaireMA"
                    element={<AddQuestionnaireMA />}
                  />
                  <Route
                    path="ViewQuestionnaireMA"
                    element={<ViewQuestionnaireMA />}
                  />
                  <Route path="ViewAgentsMA" element={<ViewAgentsMA />} />
                  <Route
                    path="ConfigureAgentsMA"
                    element={<ConfigureAgentsMA />}
                  />
                  <Route
                    path="ConfigureCrawlerMA"
                    element={<ConfigureCrawlerMA />}
                  />
                  <Route path="EditAgentsMA" element={<EditAgentsMA />} />
                  <Route path="DashboardMA" element={<DashboardMA />} />
                  <Route path="AutoDialer" element={<AutoDialer />} />
                  <Route path="SettingsMA" element={<SettingsMA />} />
                  <Route path="ChatMA" element={<Chat />} />
                  {/* The routes for Marketung Agent Panel end here*/}
                </Route>
              </Routes>
            </UserProvider>
          </Router>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
