import React, { useEffect, useState } from 'react'
//import CallPriorityTable from './CallPriorityCollectionTable';
import TableForBusinessOnwers from './BusinessOwnerTable';
import { Title, Box } from '@mantine/core';



const ViewBusinessOnwersMA = () => {

  return (
    <Box>
        <Title
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          View Business Owner Details
        </Title>
        <TableForBusinessOnwers />
    </Box>
  )
}

export default ViewBusinessOnwersMA