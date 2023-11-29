import React, { useState } from 'react';
import { Image, TextInput, Button, Box, createStyles, Paper, Title, Divider, Select, Textarea, Text } from '@mantine/core';
import ChatNavbarContent from './ChatNavbarContent';
import ChatSearch from './ChatSearch';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

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
    backgroundColor:'#5C940D',

  },

  responsiveChats: {
    height:'70%',
    margin:'20px',
  },

  responsiveChatInput: {
    height:'15%',
    backgroundColor:'#5C940D',
  },
  


}));

const Chat = () => {
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
        <ChatSearch />
        <ChatNavbarContent onContactSelect={handleContactSelect} />
      </Box>
      <Box className={classes.responsiveChatScreen}>
        <Box className={classes.responsiveChatHeader}>
          <ChatHeader selectedContact={selectedContact} />
        </Box>
        <Box className={classes.responsiveChats}>
          <ChatMessages messages={messages} />
        </Box>
        <Box p={'md'} className={classes.responsiveChatInput}>
          <ChatInput onMessageSubmit={addMessage} />
        </Box>
      </Box>
    </Box>
  </Box>
);
};


export default Chat