import React from 'react'
import TotalRevenueBlocks from './TotalRevenueBlocks'
import StatsGroup from './GroupedStats'
import SubscriptionPaymentChart from './SubscriptionPaymentChart'
import SubscriptionChart from './SubscriptionChart'
import RevenueChart from './RevenueChart'
import RegisteredBusinessChart from './RegisteredBusinessChart'
import UserChart from './UserCharts'
import SimpleDonut from './SimpleDonut'

const Dashboard = () => {
  return (
    <div>
        <TotalRevenueBlocks />
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