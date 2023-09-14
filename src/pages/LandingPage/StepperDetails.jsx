import { useState } from 'react';
import { Stepper, Text,  Box, Title } from '@mantine/core';
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
          color: '#4E8480',
        },
      }}
      {...props}
    />
  );
}

export default function StepperDetails() {
  const [active, setActive] = useState(0);

  return (
    <Box pb={50} style={{backgroundColor:'#E9ECEF'}}
    sx={{
      fontFamily:'Poppins'
    }}
    >
      <Title pt={50}  pl={20} pr={20} order={3} weight={100} align="left">
        How To Get Started?
      </Title>
      <Title mt={20} mb={20} pl={20} pr={20} order={6} weight={100} align="left" color='#4E8480'>
        Four Easy Steps
      </Title>
    <StyledStepper style={{paddingLeft: '20px', paddingRight: '20px'}}  breakpoint="xs"  active={active} onStepClick={setActive}>
      <Stepper.Step color='#4E8480'  icon={<Text color='white' fw={'lighter'}>01</Text>} label={<Text color='black' >Register Your Business</Text>}  description={<Text  color='black'> Select your plan and register your business</Text>}   />
      <Stepper.Step color='#4E8480' icon={<Text color='white' fw={'lighter'}>02</Text>} label={<Text color='black'>Make Business Questionnaire</Text>} description={<Text color='black'>Select pre-defined script or create custom script</Text>}  />
      <Stepper.Step color='#4E8480' icon={<Text color='white' fw={'lighter'}>03</Text>} label={<Text color='black'>Select Your Agent</Text>} description={<Text color='black'>Select your agents or customize them</Text>}   />
      <Stepper.Step color='#4E8480' icon={<Text color='white' fw={'lighter'}>04</Text>} label={<Text color='black'>Start Business Marketing</Text>} description={<Text color='black'>Start Business Marketing</Text>}   />
    </StyledStepper>
    </Box>
  );
}