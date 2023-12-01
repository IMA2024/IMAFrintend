{/*
import React, { useState } from 'react';
import { TextInput, Button, Box, Group, Image, Grid, Col, } from '@mantine/core';
import axios from 'axios';
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components';


// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Poppins',
  headerBgColor: '#5F3DC4',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#5F3DC4',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


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
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}} >
      <Grid id="faq-grid" gutter={50}>
      <Col span={12} md={6}>
      <Box >
      <Image src="https://ui.mantine.dev/_next/static/media/image.b0c2306b.svg" alt="Frequently Asked Questions" />
      </Box>
      </Col>
      <Col span={12} md={6}>
      <Box>
        <ThemeProvider theme={theme}>
      <ChatBot steps={steps} />
      </ThemeProvider>
      </Box>
      </Col>
      </Grid>
    </Box>
  );
}

export default Chatbot;
*/}