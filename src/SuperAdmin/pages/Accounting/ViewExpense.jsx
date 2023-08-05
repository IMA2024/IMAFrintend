import React, { useEffect, useState } from 'react'
import ExpenseTable from './ExpenseTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


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