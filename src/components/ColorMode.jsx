import {
  ActionIcon,
  Group,
  MantineProvider,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";

export default function ActionToggle() {
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group my="xl">
      <ActionIcon size="lg" onClick={() => toggleColorScheme()}>
        {colorScheme === "dark" ? (
          <IconSun size="1.2rem" />
        ) : (
          <IconMoonStars size="1.2rem" />
        )}
      </ActionIcon>
    </Group>
  );
}
