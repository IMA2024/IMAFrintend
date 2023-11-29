import { useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import { Box, NavLink, Image, Text } from '@mantine/core';

const data = [
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80', icon: IconGauge, label: 'Regina', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
  {
    imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',
    icon: IconFingerprint,
    label: 'Security',
    description: 'Item with description',
    //rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    rightSection: <Text  c="dimmed" >11:45</Text>,
  },
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',icon: IconActivity, label: 'Annie', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',icon: IconActivity, label: 'John', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',icon: IconActivity, label: 'Rachel', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',icon: IconActivity, label: 'Monica', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',icon: IconActivity, label: 'Chandler', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',icon: IconActivity, label: 'Noor', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
  { imageSrc: 'https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80',icon: IconActivity, label: 'Mahnoor', description: 'Item with description', rightSection: <Text  c="dimmed" >11:45</Text> },
];

export default function ChatNavbarContent({ onContactSelect }) {
  const [active, setActive] = useState(0);

  const handleNavLinkClick = (index) => {
    setActive(index);
    onContactSelect(data[index]);
  };

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<Image radius="50%" src={item.imageSrc} width={40} height={40} />}
      onClick={() => handleNavLinkClick(index)}
      color="lime.9"
    />
  ));

  return <Box>{items}</Box>;
}