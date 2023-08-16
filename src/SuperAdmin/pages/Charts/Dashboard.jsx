import React from 'react'
import TotalRevenueBlocks from './TotalRevenueBlocks'
import StatsGroup from './GroupedStats'
import SubscriptionPaymentChart from './SubscriptionPaymentChart'
import SubscriptionChart from './SubscriptionChart'
import RevenueChart from './RevenueChart'
import RegisteredBusinessChart from './RegisteredBusinessChart'
import SimpleDonut from './SimpleDonut'

const Dashboard = () => {
  return (
    <div>
        <StatsGroup />
        <SubscriptionPaymentChart />
        <SubscriptionChart />
        <TotalRevenueBlocks />
        <RevenueChart />
        <RegisteredBusinessChart />
        <SimpleDonut />
    </div>
  )
}

export default Dashboard