import React from 'react'
import { Box, Image, Text } from '@mantine/core'


const ChatHeader = () => {
  return (
    <Box mt={12} ml={20} style={{display:'flex', flexDirection:'row'}}>
        <Image
        radius="50%"
        src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
        width={40}
        height={40}
      />
      <Text ml={20} mt={8} fw={'bolder'} color='white'>Linda Green</Text>
    </Box>
  )
}

export default ChatHeader