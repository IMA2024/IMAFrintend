import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
//import ChooseBusiness from '../ChooseBusiness/ChooseBusiness';
import ChooseBusiness from './ChooseBusiness/ChooseBusiness';
//import ChooseQuestionnaire from '../ChooseQuestionnaire.jsx/ChooseQuestionnaire';
import ChooseQuestionnaire from './ChooseQuestionnaire.jsx/ChooseQuestionnaire';
//import AgentConfiguration from '../ChooseAgent/AgentConfigiration';
import AgentConfiguration from './ChooseAgent/AgentConfigiration';
import ConfigureCrawler from './ChooseCrawler/ConfigureCrawler';

export default function ExecuteDialer() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
      <Stepper.Step label="First step" description="Choose Business">
        <ChooseBusiness nextStep={nextStep} prevStep={prevStep} />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Choose Questionnaire">
          <ChooseQuestionnaire nextStep={nextStep} prevStep={prevStep}  />
        </Stepper.Step>
        <Stepper.Step label="Third step" description="Configure Agent">
          <AgentConfiguration nextStep={nextStep} prevStep={prevStep}  />
        </Stepper.Step>
        {/*
        <Stepper.Step label="Fourth step" description="Configure Crawler">
          <ConfigureCrawler nextStep={nextStep} prevStep={prevStep} />
        </Stepper.Step>
  */}
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      {/* <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
  );
}