import React, { useEffect, useState } from 'react'
import BusinessSubscriptionTable from './SubscriptionTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewBusinessSubscription = () => {

  return (
    <Box>
        <Title
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
          mb={5}
        >
          View Subscription Details
        </Title>
        <BusinessSubscriptionTable />
    </Box>
  )
}

export default ViewBusinessSubscription
