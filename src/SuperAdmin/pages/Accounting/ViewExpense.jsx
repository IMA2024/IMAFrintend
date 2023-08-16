import React from 'react'
import ExpenseTable from './ExpenseTable';
import { Title, Box } from '@mantine/core';


const ViewExpense = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Expense Details
        </Title>
        <ExpenseTable />
    </Box>
  )
}

export default ViewExpense