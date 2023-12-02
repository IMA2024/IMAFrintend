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

  const ExpenseData = [
    {
     "icon": "user",
      "diff": 3
    },
  ] 

  const ProfitData = [ 
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


export default function ProfitBlocksBO() {
  const [revenue, setRevenue] = useState();
  const [expense, setExpense] = useState(); 
  const [profit, setProfit] = useState();
  const [payments, setPayments] = useState();  
  const { classes } = useStyles();

  const statsUser = UserData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch total revenue
          const revenueResponse = await fetch('https://imaa-2585bbde653a.herokuapp.com/businessOwner/totalRevenue');
          const revenueData = await revenueResponse.json();
          setRevenue(revenueData);
    
          // Fetch total expense
          const expenseResponse = await fetch('https://imaa-2585bbde653a.herokuapp.com/businessOwner/totalExpense');
          const expenseData = await expenseResponse.json();
          setExpense(expenseData);
    
          // Fetch total profit
          const profitResponse = await fetch('https://imaa-2585bbde653a.herokuapp.com/businessOwner/totalProfit');
          const profitData = await profitResponse.json();
          setProfit(profitData);
    
          // Fetch total payments
          const paymentsResponse = await fetch('https://imaa-2585bbde653a.herokuapp.com/businessOwner/totalPayments');
          const paymentsData = await paymentsResponse.json();
          setPayments(paymentsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);
    

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} mt={20} bg={'orange'}>
        <Group position="apart">
          <Text size="xs" color='white'  className={classes.title}>
            TOTAL REVENUE
          </Text>
        
          <Icon  color='grey' className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{revenue}</Text>
          <Text color={stat.diff > 0 ? 'black' : 'grey'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs"color='white'  mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsExpense = ExpenseData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}  mt={20} bg={'red'}>
        <Group position="apart">
          <Text size="xs" color='white'  className={classes.title}>
          TOTAL EXPENSE
          </Text>
        
          <Icon color='grey' className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{expense}</Text>
          <Text  color={stat.diff > 0 ? 'black' : 'grey'}   fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" color='white'  mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsProfit = ProfitData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}  mt={20} bg={'green'}>
        <Group position="apart">
          <Text size="xs" color='white' className={classes.title}>
          TOTAL PROFIT
                    </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{profit}</Text>
          <Text  color={stat.diff > 0 ? 'black' : 'grey'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" color='white' mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsCustomer = CustomerData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}  mt={20} bg={'purple'}>
        <Group position="apart">
          <Text size="xs" color='white' className={classes.title}>
          PAYMENTS          
          </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{payments}</Text>
          <Text  color={stat.diff > 0 ? 'black' : 'grey'}   fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" color='white' mt={7}>
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
        {statsExpense}
        {statsProfit}
        {statsCustomer}
      </SimpleGrid>
    </div>
  );
}