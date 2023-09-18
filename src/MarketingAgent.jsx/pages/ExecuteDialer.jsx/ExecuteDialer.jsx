import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import ChooseBusiness from '../ChooseBusiness/ChooseBusiness';
import ChooseQuestionnaire from '../ChooseQuestionnaire.jsx/ChooseQuestionnaire';
import AgentConfiguration from '../Agent/AgentConfigiration';
import ConfigureCrawler from '../Crawler/ConfigureCrawler';

export default function ExecuteDialer() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
      <Stepper.Step label="First step" description="Choose Business">
        <ChooseBusiness />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Choose Questionnaire">
          <ChooseQuestionnaire />
        </Stepper.Step>
        <Stepper.Step label="Third step" description="Configure Agent">
          <AgentConfiguration />
        </Stepper.Step>
        <Stepper.Step label="Fourth step" description="Configure Crawler">
          <ConfigureCrawler />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}