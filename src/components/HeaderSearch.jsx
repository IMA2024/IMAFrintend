import { TextInput, Kbd, Flex } from '@mantine/core';
import { IconAt, IconSearch } from '@tabler/icons-react';

export default function HeaderSearch() {

const rightSection = (
        <Flex align="center">
    <Kbd mr={5} ml={5}>Ctrl+K</Kbd>
        </Flex>
    );

  return (
    <TextInput
    mt={4}
    placeholder="Search"
    icon={<IconSearch size="1rem" />}
    rightSectionWidth={90}
    rightSection={rightSection}
    styles={{ rightSection: { pointerEvents: 'none' } }}
  />
  );
}