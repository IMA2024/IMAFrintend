import React, { useEffect, useState } from 'react'
import UserTable from './UserTable';
import { Title, Box } from '@mantine/core';

const ViewUser = () => {

  return (
    <Box>
        <Title
          align="center"
          order={2}
          sx={{ fontWeight: 550 }}
          mb={5}
        >
          View Users
        </Title>
        <UserTable />
    </Box>
  )
}

export default ViewUser