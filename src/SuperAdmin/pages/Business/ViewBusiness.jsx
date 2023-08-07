import React, { useEffect, useState } from 'react'
import BusinessTable from './BusinessTable';
import { Title, Box } from '@mantine/core';

const ViewBusiness = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Business
        </Title>
        <BusinessTable />
    </Box>
  )
}

export default ViewBusiness