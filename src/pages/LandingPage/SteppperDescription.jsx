import { useState } from 'react';
import { Stepper, Text,  rem } from '@mantine/core';
import { IconUserCheck, IconMailOpened, IconShieldCheck } from '@tabler/icons-react';

function StyledStepper(props) {
  return (
    <Stepper
      styles={{
      
        stepIcon: {
        backgroundColor:'white',
        border:'none',
        width:'200',
        display:'none',

        },
        step: {
            //padding: 30,
            //backgroundColor:'blue'
          },

        separator: {
          //marginLeft: rem(-2),
          //marginRight: rem(-2),
          backgroundColor:'white',
        },
      }}
      {...props}
    />
  );
}

export default function StepperDescription() {
  const [active, setActive] = useState(0);

  return (
    <StyledStepper  breakpoint="xs"  >
      <Stepper.Step description={<Text  color='black'> Select your plan and register your business</Text>}   />
      <Stepper.Step description={<Text color='black'>Select pre-defined script or create custom script</Text>} />
      <Stepper.Step description={<Text color='black'>Select your agents or customize them</Text>}  />
      <Stepper.Step description={<Text color='black'>Start Business Marketing</Text>}  />
    </StyledStepper>
  );
}