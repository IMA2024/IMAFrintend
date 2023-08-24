import React from 'react'
import RevenueTable from './RevenueTable';
import { Title, Box } from '@mantine/core';


const ViewRevenue = () => {

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
      <RevenueTable />
    </Box>
  )
}

export default ViewRevenue