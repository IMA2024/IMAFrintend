import React from 'react'
import BusinessPanelExpenseTable from './ExpenseTable';
import { Title, Box } from '@mantine/core';


const BusinessPanelViewExpense = () => {

  return (
    <Box>
      <Title
       align="center"
       order={2}
       sx={{ fontWeight: 550 }}
       mb={5}
      >
        View Expense Details
      </Title>
      <BusinessPanelExpenseTable />     
    </Box>
  )
}

export default BusinessPanelViewExpense