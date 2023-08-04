import React, { useEffect, useState } from 'react'
import UserTable from './UserTable';
import { Title, Box } from '@mantine/core';

const ViewUser = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Users
        </Title>
        <UserTable />
    </Box>
  )
}

export default ViewUser