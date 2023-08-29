import React, { useEffect, useState } from 'react'
import TableBusiness from './BusinessTable';
import { Title, Box } from '@mantine/core';

const BusinessView = () => {

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
        <TableBusiness />
    </Box>
  )
}

export default BusinessView