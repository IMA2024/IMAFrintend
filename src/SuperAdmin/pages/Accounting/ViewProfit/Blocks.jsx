import { createStyles, Group, Paper, SimpleGrid, Text, rem } from '@mantine/core';
import React, { useState , useEffect} from 'react';
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
      "icon": "user",
      "diff": 7
    },
  ]

  const MarketingData = [
    {
     "icon": "user",
      "diff": 3
    },
  ] 

  const BusinessOwnerData = [ 
    {
     "icon": "user",
      "diff": 2
    },
  ] 

  const CustomerData = [
    {
      "icon": "user",
      "diff": 1
    },
  ] 


export default function ProfitBlockss() {
  const [users, setUsers] = useState();
  const [marketingAgents, setMarketingAgents] = useState(); 
  const [owners, setOwners] = useState(); 
  const [customers, setCustomers] = useState(); 
  const { classes } = useStyles();

  const statsUser = UserData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/totalUsers');
          const newData = await response.json();
          console.log(response);
          setUsers(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/totalMarketingAgents');
          const newData = await response.json();
          console.log(response);
          setMarketingAgents(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/totalBusinessOwners');
          const newData = await response.json();
          console.log(response);
          setOwners(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/totalCustomers');
          const newData = await response.json();
          console.log(response);
          setCustomers(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} mt={20}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            TOTAL REVENUE
          </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{users}</Text>
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
      <Paper withBorder p="md" radius="md" key={stat.title}  mt={20}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
          TOTAL EXPENSE
          </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{marketingAgents}</Text>
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
      <Paper withBorder p="md" radius="md" key={stat.title}  mt={20}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
          TOTAL PROFIT
                    </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{owners}</Text>
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
        cols={3}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {statsUser}
        {statsMarketing}
        {statsBusiness}
      </SimpleGrid>
    </div>
  );
}