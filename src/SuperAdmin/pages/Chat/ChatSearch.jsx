import React, { useEffect, useState, forwardRef } from 'react';
import {
  TextInput,
  Flex,
  Modal,
  Box,
  Text,
  Select,
  ScrollArea,
  Avatar,
  Group,
} from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { IconFingerprint} from '@tabler/icons-react';
import Axios from 'axios';

export default function ChatSearch({ contacts, setContactsList, setSelectedContact }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewSpecific = (row) => {
    open();
  };

  const getUsers = async () => {
    try {
      const response = await Axios.get(
        'https://imaa-2585bbde653a.herokuapp.com/admin/viewAllUsers'
      );
      const allUsers = response.data.users;

      // Filter out the super admin based on a condition (for example, role === 'superAdmin')
      const filteredUsers = allUsers.filter(
        (user) => user.role !== 'Super Admin'
      );

      const users = filteredUsers.map(({ _id: value, firstName, lastName, role }) => ({ value, firstName, lastName, role }))

      // Update the state with the filtered users
      setUsers(allUsers);
      setFilteredUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const SelectItem = forwardRef(
    ({ role, firstName, lastName, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          {/* Uncomment the line below if you have an image property in your user object */}
          {/* <Avatar src={image} /> */}
          <div>
            <Text size="sm">{`${firstName} ${lastName}`}</Text>
            <Text size="xs" opacity={0.65}>
              {role}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  const rightSection = (
    <Flex align="center">
      <IconPlus
        onClick={() => handleViewSpecific()}
        color="green"
        size="1.5rem"
      />
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
        onClick={() => handleViewSpecific()}
      />
      <Modal
        title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Start Chat</Text>}
        radius={'md'}
        opened={opened}
        // onClose={() => {
        //   // Reset selected user when closing the modal
        //   setSelectedUser(null);
        //   close();
        // }}
        onClose={close} 
        size={'md'}
      >
        <ScrollArea h={380} type="never">
          <Box mb={30} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <Select
                value={selectedUser}
                label="Choose user to chat"
                placeholder="Pick one"
                itemComponent={SelectItem}
                data={filteredUsers}
                searchable
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                filter={(value, item) => (
                  item.firstName?.toLowerCase().includes(value?.toLowerCase().trim()) ||
                  item.lastName?.toLowerCase().includes(value?.toLowerCase().trim())
                )}
                onChange={(selected) => {
                  let presentContact = contacts.filter((user)=>{return user.id == selected})
                  if(presentContact.length > 0){
                    setSelectedContact(presentContact[0]);
                  }
                  else{
                    let contact = users.filter((user)=>{return user._id == selected})[0];
                  
                    console.log(contact);
                    let newData = {}
                    newData.id = contact._id;
                    newData.icon = IconFingerprint
                    newData.label = contact.firstName + " " + contact.lastName;
                    newData.description = "";
                    newData.rightSection = "";
                    newData.imageSrc = contact.profilePic;
                    setSelectedUser(newData);
                    setSelectedContact(newData);
                    setContactsList((oldValues => [...oldValues, newData]))
                  }
                  close();
                }}
              />
            </Box>
          </Box>
        </ScrollArea>
      </Modal>
    </Box>
  );
}
