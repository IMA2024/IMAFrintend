import React from 'react'
import ProfitBlockss from '../../../../SuperAdmin/pages/Accounting/ViewProfit/Blocks'
import RevenueExpense from './RevenueExpense'
import { Title } from '@mantine/core'

const BusinessPanelViewProfit = () => {
  return (
    <div>
       <Title
          mb={10}
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          View Profit
        </Title>
      <ProfitBlockss />
      <RevenueExpense />
    </div>
  )
}

export default BusinessPanelViewProfit