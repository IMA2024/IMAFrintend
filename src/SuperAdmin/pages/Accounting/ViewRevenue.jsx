import React, { useEffect, useState } from 'react'
import RevenueTable from './RevenueTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewRevenue = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Revenue Details
        </Title>
        <RevenueTable />
    </Box>
  )
}

export default ViewRevenue