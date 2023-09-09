import { useState } from 'react';
import { Stepper, Text,  rem } from '@mantine/core';
import { IconUserCheck, IconMailOpened, IconShieldCheck } from '@tabler/icons-react';

function StyledStepper(props) {
  return (
    <Stepper
      styles={{
        stepBody: {
         // display: 'none',
        },

        step: {
          padding: 0,
        },

        stepIcon: {
          backgroundColor: '#4E8480',
        },

        separator: {
          //marginLeft: rem(-2),
          //marginRight: rem(-2),
          backgroundColor: '#4E8480',
        },
      }}
      {...props}
    />
  );
}

export default function StepperNumbers() {
  const [active, setActive] = useState(0);

  return (
    <StyledStepper  breakpoint="xs"  active={active} onStepClick={setActive} p={'1000'}>
      <Stepper.Step color='#4E8480'  icon={<Text color='white' fw={'lighter'}>01</Text>} label={<Text color='black' >Register Your Business</Text>}  description={<Text  color='black'> Select your plan and register your business</Text>}   />
      <Stepper.Step color='#4E8480' icon={<Text color='white' fw={'lighter'}>02</Text>} label={<Text color='black'>Make Business Questionnaire</Text>} description={<Text color='black'>Select pre-defined script or create custom script</Text>}  />
      <Stepper.Step color='#4E8480' icon={<Text color='white' fw={'lighter'}>03</Text>} label={<Text color='black'>Select Your Agent</Text>} description={<Text color='black'>Select your agents or customize them</Text>}   />
      <Stepper.Step color='#4E8480' icon={<Text color='white' fw={'lighter'}>04</Text>} label={<Text color='black'>Start Business Marketing</Text>} description={<Text color='black'>Start Business Marketing</Text>}   />
    </StyledStepper>
  );
}