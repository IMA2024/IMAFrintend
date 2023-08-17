import React, { useEffect, useState } from 'react'
import BusinessOwnerTable from './BusinessOwnerTable';
import { Title, Box } from '@mantine/core';

const ViewBusinessOwner = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          Business Owner Details
        </Title>
        <BusinessOwnerTable />
    </Box>
  )
}

export default ViewBusinessOwner