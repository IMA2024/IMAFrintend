import { useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';

const data = [
  { icon: IconGauge, label: 'Regina', description: 'Item with description' },
  {
    icon: IconFingerprint,
    label: 'Security',
    description: 'Item with description'
    //rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  { icon: IconActivity, label: 'Annie', description: 'Item with description' },
  { icon: IconActivity, label: 'John', description: 'Item with description' },
  { icon: IconActivity, label: 'Rachel', description: 'Item with description' },
  { icon: IconActivity, label: 'Monica', description: 'Item with description' },
  { icon: IconActivity, label: 'Chandler', description: 'Item with description' },
  { icon: IconActivity, label: 'Noor', description: 'Item with description' },
  { icon: IconActivity, label: 'Mahnoor', description: 'Item with description' },
];

export default function BusinessOwnerChatNavbarContent() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      color="violet.9"
      variant="filled"
    />
  ));

  return <Box >{items}</Box>;
}