import React, { useEffect, useState } from 'react'
import PaymentTable from './PaymentTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewPayment = () => {

  return (
    <Box>
        <Title
          align="center"
          order={2}
          sx={{ fontWeight: 550 }}
          mb={5}
        >
          View Payment Details
        </Title>
        <PaymentTable />
    </Box>
  )
}

export default ViewPayment