import {  ActionIcon, Group, MantineProvider, Text } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { ColorSchemeProvider } from '@mantine/core';
import { useState } from 'react';


export default function ActionToggle() {
  const [colorScheme, toggleColorScheme] = useState('light');


  function handleColorScheme() {
    if(colorScheme === 'dark') {
    toggleColorScheme('light');
    }
    else {
      toggleColorScheme('dark');
    }
    
  }



  return (
    <MantineProvider theme={{colorScheme: colorScheme }} withGlobalStyles withNormalizeCSS >
    <Group  my="xl">
      <ActionIcon
        onClick={() => handleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
      </ActionIcon>
    </Group>
</MantineProvider>

  );
}
