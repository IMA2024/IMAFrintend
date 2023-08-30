import React, { useEffect, useState } from 'react'
import TableAgents from './AgentsTable';
import { Title, Box } from '@mantine/core';

const AgentsView = () => {

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
        <TableAgents />
    </Box>
  )
}

export default AgentsView