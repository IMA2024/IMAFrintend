import { Tabs, Box } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import BusinessOwnerQuestions from './BusinessOwnerQuestions';
import MarketingAgentQuestions from './MarketingAgentQuestions';

export default function QuestionnaireTab() {
  return (
    <Box  mt={20} >
    <Tabs defaultValue="businessOwner">
      <Tabs.List>
        <Tabs.Tab value="businessOwner" icon={<IconPhoto size="0.8rem" />}>View Business Owner Questionnaire</Tabs.Tab>
        <Tabs.Tab value="marketingAgent" icon={<IconMessageCircle size="0.8rem" />}>View Marketing Agent Questionnaire</Tabs.Tab>

      </Tabs.List>

      <Tabs.Panel value="businessOwner" pt="xs">
        <BusinessOwnerQuestions />
      </Tabs.Panel>

      <Tabs.Panel value="marketingAgent" pt="xs">
        <MarketingAgentQuestions />
      </Tabs.Panel>

    </Tabs>
    </Box>
  );
}