import { Kbd, TextInput, Flex } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';


export default function ChatSearch() {
  const rightSection = (
    <Flex align="center">
      {/*
      <Kbd mr={5}>Ctrl</Kbd>
      <span>+</span>
      <Kbd ml={5}>K</Kbd>
  */}
  <IconPlus onClick={console.log('add me')} color='green' size="1.5rem" />
    </Flex>
  );

  return (
    <TextInput
      placeholder="Search Chat"
      icon={<IconSearch size="1rem" />}
      //rightSectionWidth={90}
      rightSection={rightSection}
      //styles={{ rightSection: { pointerEvents: 'none' } }}
    />
  );
}