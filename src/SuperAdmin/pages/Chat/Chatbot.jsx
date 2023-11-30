import React, { useState } from 'react';
import { TextInput, Button, Box, Group } from '@mantine/core';
import axios from 'axios';
import ChatBot from 'react-simple-chatbot'

function Chatbot() {
  const steps = [
    {
      id: 'Ask Name',
      message: 'Enter Your Name!',
      trigger: 'waiting1',
    },
    {
      id: 'waiting1',
      user: true,
      trigger: 'Name',
    },
    {
      id: 'Name',
      message: 'Hi {previousValue}, select your issue!',
      trigger: 'issues',
    },
    {
      id: 'issues',
      options: [
        {value:'React',label:'React',trigger:'React' },
        {value:'Vue',label:'Vue',trigger:'Vue' }
      ]
    },
    {
      id:'React',
      message:'Thanks for telling your react issue',
      end: true,
    },
    {
      id:'Vue',
      message:'Thanks for telling your vue issue',
      end: true,
    }
  ];





  return (
    <Box >
      <ChatBot steps={steps} />
    </Box>
  );
}

export default Chatbot;
