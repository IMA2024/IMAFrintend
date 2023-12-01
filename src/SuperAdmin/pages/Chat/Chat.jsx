import React, { useContext, useEffect, useState } from 'react';
import { Image, TextInput, Button, Box, createStyles, Paper, Title, Divider, Select, Textarea, Text } from '@mantine/core';
import ChatNavbarContent from './ChatNavbarContent';
import { IconFingerprint} from '@tabler/icons-react';

import ChatSearch from './ChatSearch';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { UserContext } from '../../../context/users/userContext';
import { getChat } from '../../../api/chat/chat';
import {getContactsHistory} from '../../../api/chat/chat'
import socket from '../../../socket/socket';

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
  const { user } = useContext(UserContext);
  const { classes } = useStyles();
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(()=>{
    socket.auth = {id: user._id};
    socket.connect();
  }, [])
  useEffect(()=>{
    if(selectedContact){
        try{
          getChat(user._id, selectedContact.id).then((res)=>{
            console.log(res);
            if(res.data.chat[0]){
              setMessages(res.data.chat[0].messages)
            }
            else{
              setMessages([])
            }
          })
        }
        catch(error){
          setMessages([])
        }
      
    }
  }, [selectedContact])

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  /*Sockets Logic*/
  socket.on('receiveMessage', (message)=>{
    let receivedMessage = message;
    receivedMessage.status = "receive";
    setMessages([...messages, receivedMessage]);
  })

  socket.on('sentMessage', (message)=>{
    console.log('message has been sent')
    let sentMessage = message;
    sentMessage.status = "send";
    setMessages([...messages, sentMessage]);
  })
  socket.on('test', (d)=>{
    console.log(d)
  })
  const handleSend = (message) => {
    if ( message.message.trim() !== '') {
      console.log(message.message)
      socket.emit('sendMessage', selectedContact.id, message.message)
    }
  };

  useEffect(()=>{
    getContactsHistory(user._id).then((res)=>{
      let contactsHistory = res.data.contactsHistory.map((contact)=>{
        let newData = {};
        newData.id = contact.user._id;
        newData.icon = IconFingerprint
        newData.label = contact.user.firstName + " " + contact.user.lastName;
        newData.description = contact.latestMessage.message;
        newData.rightSection = (<Text  c="dimmed" >{contact.latestMessage.createdAt.split('T')[1].slice(0,5)}</Text>);
        newData.imageSrc = contact.user.profilePic;
        return newData;
      })

      setContacts(contactsHistory);
    })
    console.log(user);
  },[])

  return (
    <Box>
    <Title order={2} align="center" sx={{ fontWeight: 550 }} mb={5}>
      Chat
    </Title>
    <Box className={classes.responsiveContainer}>
      <Box className={classes.responsiveChatSidebar}>
        <ChatSearch contacts={contacts} setContactsList = {setContacts} setSelectedContact = {setSelectedContact}/>
        <ChatNavbarContent contacts={contacts} onContactSelect={handleContactSelect} />
      </Box>
      <Box className={classes.responsiveChatScreen}>
        <Box className={classes.responsiveChatHeader}>
          <ChatHeader selectedContact={selectedContact} />
        </Box>
        <Box className={classes.responsiveChats}>
          <ChatMessages messages={messages} />
        </Box>
        <Box p={'md'} className={classes.responsiveChatInput}>
          <ChatInput onMessageSubmit={handleSend} />
        </Box>
      </Box>
    </Box>
  </Box>
);
};


export default Chat