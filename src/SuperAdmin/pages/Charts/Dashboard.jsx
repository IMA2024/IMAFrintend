import React from 'react'
import StatsGroup from './GroupedStats'
import SubscriptionPaymentChart from './SubscriptionPaymentChart'
import SubscriptionChart from './SubscriptionChart'
import RevenueChart from './RevenueChart'
import RegisteredBusinessChart from './RegisteredBusinessChart'
import UserChart from './UserCharts'
import SimpleDonut from './SimpleDonut'
import StatsGrid from './UserBlocks'

const Dashboard = () => {
  return (
    <div>
        <StatsGrid />
        <UserChart />
        <RegisteredBusinessChart />
        <SubscriptionChart />
        <StatsGroup />
        <RevenueChart />
        <SubscriptionPaymentChart />
        <SimpleDonut />
    </div>
  )
}

export default Dashboard