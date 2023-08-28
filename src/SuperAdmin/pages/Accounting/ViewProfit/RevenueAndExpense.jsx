import { Center, SegmentedControl, Box } from '@mantine/core';
import { IconEye, IconCode, IconExternalLink } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function RevenueAndExpense() {
const navigate = useNavigate();

  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'40px'}}>
    <SegmentedControl
    size="md"
      data={[
        {
          value: 'preview',
          label: (
            <Center onClick={() => navigate('/ViewRevenue')}>
              <IconEye size="1rem" />
              <Box ml={10}>View Revenue</Box>
            </Center>
          ),
        },
        {
          value: 'code',
          label: (
            <Center onClick={() => navigate('/ViewExpense')}>
              <IconEye size="1rem" />
              <Box ml={10}>View Expense</Box>
            </Center>
          ),
        },
       
      ]}
    />
    </div>
  );
}