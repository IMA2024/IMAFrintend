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

export default function StepperHeadings() {
  const [active, setActive] = useState(0);

  return (
    <StyledStepper  breakpoint="xs"  >
      <Stepper.Step label={<Text color='black' >Register Your Business</Text>}   />
      <Stepper.Step label={<Text color='black'>Make Business Questionnaire</Text>} />
      <Stepper.Step label={<Text color='black'>Select Your Agent</Text>}  />
      <Stepper.Step label={<Text color='black'>Start Business Marketing</Text>}  />
    </StyledStepper>
  );
}