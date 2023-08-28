import React from 'react'
import ProfitBlocks from './Blocks'
import RevenueAndExpense from './RevenueAndExpense'
import { Title } from '@mantine/core'

const ViewProfit = () => {
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
      <ProfitBlocks />
      <RevenueAndExpense />
    </div>
  )
}

export default ViewProfit