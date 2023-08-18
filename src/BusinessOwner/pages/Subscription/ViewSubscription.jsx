import React, { useEffect, useState } from 'react'
import BusinessSubscriptionTable from './SubscriptionTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewBusinessSubscription = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Subscription Details
        </Title>
        <BusinessSubscriptionTable />
    </Box>
  )
}

export default ViewBusinessSubscription
