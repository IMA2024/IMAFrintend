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
  const [searchQuery, setSearchQuery] = useState('');

  const handleView = () => {
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  };

  const rightSection = (
    <Flex align="center">
  <IconPlus onClick={() => handleView()}color='green' size="1.5rem" />
    </Flex>
  );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
    <TextInput placeholder="Search Chat" icon={<IconSearch size="1rem" />} rightSection={rightSection} />
    <Modal title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Start Chat</Text>} radius={'md'} opened={opened} onClose={close} size={'md'}>
      <ScrollArea h={380} type="never">
        <Box mb={30} style={{ display: 'flex', flexDirection: 'column' }}>
        <Box mb={20}>
          <TextInput
            placeholder="Search in Chat"
            icon={<IconSearch size="1rem" />}
            value={searchQuery}
            onChange={(event) => handleSearch(event.currentTarget.value)}
          />
        </Box>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            {filteredUsers.map((user) => (
              <Box
                key={user._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  ':hover': {
                    backgroundColor: '#E9ECEF',
                  },
                }}
                //onClick={() => handleViewSpecific(user)}
              >
                <Avatar radius="xl" src={user.profilePic} alt={`${user.firstName} ${user.lastName}`} />
                <Text ml={10}>{`${user.firstName} ${user.lastName}`}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </ScrollArea>
    </Modal>
  </Box>
);
}
