import React from 'react'
import SubscriptionPaymentChartBO from './SubscriptionPaymentChartBO'
import SubscriptionChartBO from './SubscriptionChartBO'
import ProfitChartBO from './ProfitChartBO'
import RegisteredBusinessChartBO from './RegisteredBusinessChartBO'
import SubscriptionsBlockBO from './SubscriptionBlockBO'
import BusinessBlocksBO from './BusinessBlocksBO'
import ProfitBlocksBO from './ProfitBlocksBO'

const BusinessPanelDashboard = () => {
  return (
    <div>
        <BusinessBlocksBO />
        <RegisteredBusinessChartBO />
        <SubscriptionsBlockBO />
        <SubscriptionChartBO />
        <ProfitBlocksBO />
        <ProfitChartBO />
        <SubscriptionPaymentChartBO />
    </div>
  )
}

export default BusinessPanelDashboard