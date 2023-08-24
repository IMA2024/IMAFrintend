import React from 'react'
import ExpenseTable from './ExpenseTable';
import { Title, Box } from '@mantine/core';


const ViewExpense = () => {

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
        <ExpenseTable />
    </Box>
  )
}

export default ViewExpense