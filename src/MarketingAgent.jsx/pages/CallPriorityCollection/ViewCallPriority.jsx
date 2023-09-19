import React, { useEffect, useState } from 'react'
import CallPriorityTable from './CallPriorityCollectionTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewCallPriority = () => {

  return (
    <Box>
        <Title
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          View Call Priority Details
        </Title>
        <CallPriorityTable />
    </Box>
  )
}

export default ViewCallPriority