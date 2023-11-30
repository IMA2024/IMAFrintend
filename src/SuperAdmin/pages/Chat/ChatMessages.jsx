import { Text, Box } from '@mantine/core';

export default function ChatMessages({ messages }) {
  return (
    <Box>
      {messages.map((message, index) => (
        <Box key={index} align={message.status === 'send' ? 'right' : 'left'}>
          <Text color={message.status === 'send' ? 'green' : 'black'}>
            {message.message}
          </Text>
          <Text size={'0.75rem'}>{message.createdAt}</Text>
        </Box>
      ))}
    </Box>
  );
}
