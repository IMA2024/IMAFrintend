import React, { useEffect, useState } from 'react'
import PaymentTable from './PaymentTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewPayment = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Payment Details
        </Title>
        <PaymentTable />
    </Box>
  )
}

export default ViewPayment