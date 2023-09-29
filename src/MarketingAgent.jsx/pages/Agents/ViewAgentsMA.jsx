import React, { useEffect, useState } from 'react'
//import TableAgents from './AgentsTable';
import AgentsTableMA from './AgentsTableMA';
import { Title, Box } from '@mantine/core';

const ViewAgentsMA = () => {

  return (
    <Box>
        <Title
          align="center"
          order={2}
          sx={{ fontWeight: 550 }}
          mb={5}
        >
          View Agents
        </Title>
        <AgentsTableMA />
    </Box>
  )
}

export default ViewAgentsMA