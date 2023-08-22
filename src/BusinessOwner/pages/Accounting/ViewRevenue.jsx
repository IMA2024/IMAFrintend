import React from 'react'
import BusinessPanelRevenueTable from './RevenueTable';
import { Title, Box } from '@mantine/core';


const BusinessPanelViewRevenue = () => {

  return (
    <Box>
      <Title
        mb={20}
        align="center"
        sx={{ fontWeight: 650 }}
      >
        View Revenue Details
      </Title>
      <BusinessPanelRevenueTable />
      
    </Box>
  )
}

export default BusinessPanelViewRevenue