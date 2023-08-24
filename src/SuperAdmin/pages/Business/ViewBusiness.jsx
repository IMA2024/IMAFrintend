import React, { useEffect, useState } from 'react'
import BusinessTable from './BusinessTable';
import { Title, Box } from '@mantine/core';

const ViewBusiness = () => {

  return (
    <Box>
        <Title
          align="center"
          order={2}
          sx={{ fontWeight: 550 }}
          mb={5}
        >
          View Business
        </Title>
        <BusinessTable />
    </Box>
  )
}

export default ViewBusiness