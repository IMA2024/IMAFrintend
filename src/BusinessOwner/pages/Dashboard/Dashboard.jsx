import React from 'react'
//import SubscriptionPaymentChart from './SubscriptionPaymentChart'
import SubscriptionPaymentChart from '../../../SuperAdmin/pages/Charts/SubscriptionPaymentChart'
//import SubscriptionChart from './SubscriptionChart'
import SubscriptionChart from '../../../SuperAdmin/pages/Charts/SubscriptionChart'
//import ProfitChart from './ProfitChart'
import ProfitChart from '../../../SuperAdmin/pages/Charts/ProfitChart'
//import RegisteredBusinessChart from './RegisteredBusinessChart'
import RegisteredBusinessChart from '../../../SuperAdmin/pages/Charts/RegisteredBusinessChart'
//import UserChart from './UserCharts'
import UserChart from '../../../SuperAdmin/pages/Charts/UserCharts'
//import StatsGrid from './UserBlocks'
import StatsGrid from '../../../SuperAdmin/pages/Charts/UserBlocks'
//import SubscriptionsBlock from './SubscriptionsBlock'
import SubscriptionsBlock from '../../../SuperAdmin/pages/Charts/SubscriptionsBlock'
//import BusinessBlocks from './BusinessBlocks'
import BusinessBlocks from '../../../SuperAdmin/pages/Charts/BusinessBlocks'
//import ProfitBlocks from './ProfitBlock'
import ProfitBlocks from '../../../SuperAdmin/pages/Charts/ProfitBlock'

const BusinessPanelDashboard = () => {
  return (
    <div>
        {/*
        <StatsGrid />
        <UserChart />
  */}
        <BusinessBlocks />
        <RegisteredBusinessChart />
        <SubscriptionsBlock />
        <SubscriptionChart />
        <ProfitBlocks />
        <ProfitChart />
        <SubscriptionPaymentChart />
    </div>
  )
}

export default BusinessPanelDashboard