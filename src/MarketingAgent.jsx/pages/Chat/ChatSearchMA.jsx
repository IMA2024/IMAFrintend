import { Kbd, TextInput, Flex } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';


export default function ChatSearchMA() {
  const rightSection = (
    <Flex align="center">
  <IconPlus onClick={console.log('add me')} color='#862E9C' size="1.5rem" />
    </Flex>
  );

  return (
    <TextInput
      placeholder="Search Chat"
      icon={<IconSearch size="1rem" />}
      rightSection={rightSection}
    />
  );
}