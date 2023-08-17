import React, { useEffect, useState } from 'react'
import TableBusiness from './BusinessTable';
import { Title, Box } from '@mantine/core';

const BusinessView = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Business
        </Title>
        <TableBusiness />
    </Box>
  )
}

export default BusinessView