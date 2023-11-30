import { Text, Box, ScrollArea } from '@mantine/core';

export default function ChatMessages({ messages }) {
  return (
    <ScrollArea h={400} type="never">
    <Box>
      {messages.map((message, index) => (
        <Box key={index} align={message.status === 'send' ? 'right' : 'left'} >
          <Box w={'50%'}
            style={{
              borderRadius: '10px', // Adjust the borderRadius as needed
              overflow: 'hidden', // Ensure the borderRadius is applied
            }}
           >
          <Text
          bg={message.status === 'send' ? 'lime.9' : 'lime.1'}
           //color={message.status === 'send' ? 'white' : 'black'}
           style={{ textAlign: 'justify' }}
           p={10}
           >
            {message.message}
          </Text>
          <Text size={'0.75rem'}>{message.createdAt}</Text>
          </Box>
        </Box>
      ))}
    </Box>
    </ScrollArea>
  );
}
