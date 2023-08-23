import { createStyles, Group, Paper, SimpleGrid, Text, rem } from '@mantine/core';
import {
  IconUser,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    //padding: `calc(${theme.spacing.xl} * 1.5)`,
    //backgroundColor: '#EEBEFA',
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
    //color:'gray'
    //backgroundColor: '#EEBEFA'
  },
}));

const icons = {
  user: IconUser,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const UserData = [
    {
      "title": "Total Users",
      "icon": "user",
      "value": "13,456",
      "diff": 7
    },
  ]

  const MarketingData = [
    {
      "title": "Marketing Agents",
     "icon": "user",
      "value": "4,145",
      "diff": 3
    },
  ] 

  const BusinessOwnerData = [ 
    {
      "title": "Business Owners",
     "icon": "user",
      "value": "745",
      "diff": 2
    },
  ] 

  const CustomerData = [
    {
      "title": "Customers",
      "icon": "user",
      "value": "188",
      "diff": 1
    },
  ] 


export default function StatsGrid() {
  const { classes } = useStyles();
  const statsUser = UserData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} >
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsMarketing = MarketingData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} >
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsBusiness = BusinessOwnerData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} >
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsCustomer = CustomerData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} >
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {statsUser}
        {statsMarketing}
        {statsBusiness}
        {statsCustomer}
      </SimpleGrid>
    </div>
  );
}