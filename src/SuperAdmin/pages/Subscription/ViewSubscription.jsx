import React, { useEffect, useState } from 'react'
import SubscriptionTable from './SubscriptionTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewSubscription = () => {

  return (
    <Box>
        <Title
          align="center"
          order={2}
          sx={{ fontWeight: 550 }}
          mb={5}
        >
          View Subscription Details
        </Title>
        <SubscriptionTable />
    </Box>
  )
}

export default ViewSubscription