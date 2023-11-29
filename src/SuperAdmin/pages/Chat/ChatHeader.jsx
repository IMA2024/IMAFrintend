import React from 'react';
import { Box, Image, Text } from '@mantine/core';

const ChatHeader = ({ selectedContact }) => {
  return (
    <Box mt={12} ml={20} style={{ display: 'flex', flexDirection: 'row' }}>
      {selectedContact && (
        <>
          <Image
            radius="50%"
            src={selectedContact.imageSrc}
            width={40}
            height={40}
          />
          <Text ml={20} mt={8} fw={'bolder'} color='white'>{selectedContact.label}</Text>
        </>
      )}
    </Box>
  );
};

export default ChatHeader;
