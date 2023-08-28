import React from 'react'
import { Image, TextInput, Button, Box, createStyles, Paper, Title, Divider, Select, Textarea } from '@mantine/core';


const useStyles = createStyles((theme) => ({

  responsiveContainer: {
    width: '100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:'pink',
/*
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    },
*/
  },

  inputField: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%'
    },
  }

}));

const Chat = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.responsiveContainer}>
      <Box></Box>
      <Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </Box>
  )
}

export default Chat