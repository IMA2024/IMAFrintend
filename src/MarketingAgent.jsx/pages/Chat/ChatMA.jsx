import React, { useState } from 'react';
import { Image, TextInput, Button, Box, createStyles, Paper, Title, Divider, Select, Textarea, Text } from '@mantine/core';
// import ChatNavbarContent from './ChatNavbarContent';
// import ChatSearch from './ChatSearch';
// import ChatHeader from './ChatHeader';
// import ChatInput from './ChatInput';
// import ChatMessages from './ChatMessages';
import ChatNavbarContentMA from './ChatNavbarContentMA';
import ChatSearchMA from './ChatSearchMA';
import ChatHeaderMA from './ChatHeaderMA';
import ChatInputMA from './ChatInputMA';
import ChatMessagesMA from './ChatMessagesMA';

const useStyles = createStyles((theme) => ({

  responsiveContainer: {
    width: '100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:'#E9ECEF',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    },

  },

  responsiveChatSidebar: {
    width: '30%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },

  },

  responsiveChatScreen: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:'white',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  
  },

  responsiveChatHeader: {
    height:'15%',
    backgroundColor:'#862E9C',

  },

  responsiveChats: {
    height:'70%',
    margin:'20px',
  },

  responsiveChatInput: {
    height:'15%',
    backgroundColor:'#862E9C',
  },
  


}));

const ChatMA = () => {
  const { classes } = useStyles();
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <Box>
    <Title order={2} align="center" sx={{ fontWeight: 550 }} mb={5}>
      Chat
    </Title>
    <Box className={classes.responsiveContainer}>
      <Box className={classes.responsiveChatSidebar}>
        <ChatSearchMA />
        <ChatNavbarContentMA onContactSelect={handleContactSelect} />
      </Box>
      <Box className={classes.responsiveChatScreen}>
        <Box className={classes.responsiveChatHeader}>
          <ChatHeaderMA selectedContact={selectedContact} />
        </Box>
        <Box className={classes.responsiveChats}>
          <ChatMessagesMA messages={messages} />
        </Box>
        <Box p={'md'} className={classes.responsiveChatInput}>
          <ChatInputMA onMessageSubmit={addMessage} />
        </Box>
      </Box>
    </Box>
  </Box>
);
};


export default ChatMA