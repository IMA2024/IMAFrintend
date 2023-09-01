import React from 'react'
import BusinessPanelPaymentTable from './PaymentTable';
import { Title, Box } from '@mantine/core';


const BusinessPanelViewPayment = () => {

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
      <BusinessPanelPaymentTable />     
    </Box>
  )
}

export default BusinessPanelViewPayment