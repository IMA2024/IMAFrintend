import React from 'react'
import StatsGroup from './GroupedStats'
import SubscriptionPaymentChart from './SubscriptionPaymentChart'
import SubscriptionChart from './SubscriptionChart'
import ProfitChart from './ProfitChart'
import RegisteredBusinessChart from './RegisteredBusinessChart'
import UserChart from './UserCharts'
import SimpleDonut from './SimpleDonut'
import StatsGrid from './UserBlocks'
import SubscriptionsBlock from './SubscriptionsBlock'
import BusinessBlocks from './BusinessBlocks'
import ProfitBlocks from './ProfitBlock'

const Dashboard = () => {
  return (
    <div>
        <StatsGrid />
        <UserChart />
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

export default Dashboard