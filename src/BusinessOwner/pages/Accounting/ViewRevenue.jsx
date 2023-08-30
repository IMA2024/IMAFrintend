import React from 'react'
import BusinessPanelRevenueTable from './RevenueTable';
import { Title, Box } from '@mantine/core';


const BusinessPanelViewRevenue = () => {

  return (
    <Box>
      <Title
      align="center"
      order={2}
      sx={{ fontWeight: 550 }}
      mb={5}
      >
        View Revenue Details
      </Title>
      <BusinessPanelRevenueTable />
      
    </Box>
  )
}

export default BusinessPanelViewRevenue