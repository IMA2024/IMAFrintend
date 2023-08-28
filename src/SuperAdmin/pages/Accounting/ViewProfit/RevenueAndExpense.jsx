import { Tabs, Box } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import ViewExpense from '../ViewExpense';
import ViewRevenue from '../ViewRevenue';
import RevenueTable from '../RevenueTable';
import ExpenseTable from '../ExpenseTable';

export default function RevenueAndExpense() {
  return (
    <Box  mt={20}>
    <Tabs defaultValue="revenue">
      <Tabs.List>
        <Tabs.Tab value="revenue" icon={<IconPhoto size="0.8rem" />}>View Revenue</Tabs.Tab>
        <Tabs.Tab value="expense" icon={<IconMessageCircle size="0.8rem" />}>View Expense</Tabs.Tab>

      </Tabs.List>

      <Tabs.Panel value="revenue" pt="xs">
        <RevenueTable />
      </Tabs.Panel>

      <Tabs.Panel value="expense" pt="xs">
        <ExpenseTable />
      </Tabs.Panel>

    </Tabs>
    </Box>
  );
}