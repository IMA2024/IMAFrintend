import React from 'react'
import BusinessPanelExpenseTable from './ExpenseTable';
import { Title, Box } from '@mantine/core';


const BusinessPanelViewExpense = () => {

  return (
    <Box>
      <Title
        mb={20}
        align="center"
        sx={{ fontWeight: 650 }}
      >
        View Expense Details
      </Title>
      <BusinessPanelExpenseTable />     
    </Box>
  )
}

export default BusinessPanelViewExpense