import { Tabs, Box } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
// import RevenueTable from '../RevenueTable';
// import ExpenseTable from '../ExpenseTable';
import BusinessPanelExpenseTable from '../ExpenseTable'
import BusinessPanelRevenueTable from '../RevenueTable'

export default function RevenueExpense() {
  return (
    <Box  mt={20}>
    <Tabs defaultValue="revenue">
      <Tabs.List>
        <Tabs.Tab value="revenue" icon={<IconPhoto size="0.8rem" />}>View Revenue</Tabs.Tab>
        <Tabs.Tab value="expense" icon={<IconMessageCircle size="0.8rem" />}>View Expense</Tabs.Tab>

      </Tabs.List>

      <Tabs.Panel value="revenue" pt="xs">
        <BusinessPanelRevenueTable />
      </Tabs.Panel>

      <Tabs.Panel value="expense" pt="xs">
        <BusinessPanelExpenseTable />
      </Tabs.Panel>

    </Tabs>
    </Box>
  );
}