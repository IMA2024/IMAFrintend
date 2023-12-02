import { Text, Box, ScrollArea } from '@mantine/core';
import { useRef, useLayoutEffect } from 'react';

export default function ChatMessages({ messages }) {
  const viewport = useRef(null);

  const scrollToBottom = () =>
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea h={400} type="never" viewportRef={viewport}>
      <Box>
        {messages.map((message, index) => (
          <Box key={index} align={message.status === 'send' ? 'right' : 'left'}>
            <Box
              w={'50%'}
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <Text
                bg={message.status === 'send' ? 'blue.6' : 'blue.1'}
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
