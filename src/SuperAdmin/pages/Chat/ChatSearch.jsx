import React, { useEffect, useState, forwardRef } from 'react'
import { Kbd, TextInput, Flex, Modal, Box, Text, Badge, Image, Group, Avatar, Select, ScrollArea  } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome, IconBuilding } from '@tabler/icons-react';
import Axios from 'axios';

export default function ChatSearch() {
  const [opened, { open, close }] = useDisclosure(false);
  const [users, setUsers] =  useState([]);
  const [filteredUsers, setFilteredUsers] =  useState([]);

  const handleViewSpecific = (row) => {
    open();
  };

  const getUsers = async () => {
    try {
      const response = await Axios.get('https://imaa-2585bbde653a.herokuapp.com/admin/viewAllUsers');
      const allUsers = response.data.users;
  
      // Filter out the super admin based on a condition (for example, role === 'superAdmin')
      const filteredUsers = allUsers.filter((user) => user.role !== 'Super Admin');
  
      // Update the state with the filtered users
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };


  
  const SelectItem = forwardRef(
    ({ role, firstName, lastName, ...others }, ref) => (
      React.createElement('div', { ref, ...others },
        React.createElement(Group, { noWrap: true },
         // React.createElement(Avatar, { src: image }),
          React.createElement('div', null,
             React.createElement(Text, { size: "sm" }, `${firstName} ${lastName}`),
            React.createElement(Text, { size: "xs", opacity: 0.65 }, role)
          )
        )
      )
    )
  );
  

  const rightSection = (
    <Flex align="center">
  <IconPlus onClick={() => handleViewSpecific()}color='green' size="1.5rem" />
    </Flex>
  );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
    <TextInput
      placeholder="Search Chat"
      icon={<IconSearch size="1rem" />}
      rightSection={rightSection}
    />
     <Modal title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>Start Chat</Text>} radius={'md'}  opened={opened} onClose={close}  size={'md'}  >
      <ScrollArea h={380} type='never'>
  <Box mb={30}  style={{display:'flex', flexDirection:'column'}}>
    <Box style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Select
      label="Choose user to chat"
      placeholder="Pick one"
      itemComponent={SelectItem}
      data={filteredUsers}
      searchable
      maxDropdownHeight={400} 
      nothingFound="Nobody here"
      filter={(value, item) => {
        console.log('value:', value);
        return (
        item.firstName.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.lastName.toLowerCase().includes(value.toLowerCase().trim())
        );
        
      }}
      
     // style={{ minHeight: '380px' }} 
    />
    </Box>
  </Box>
  </ScrollArea>
      </Modal>
    </Box>
  );
}
