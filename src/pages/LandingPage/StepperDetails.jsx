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
          backgroundColor: '#2F9E44',
        },

        separator: {
          //marginLeft: rem(-2),
          //marginRight: rem(-2),
          backgroundColor: '#2F9E44',
          color: '#2F9E44',
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
      <Title pt={50}  pl={20} pr={20}  order={3} weight={100} align="center">
        How To Get Started?
      </Title>
      
      <Title mt={5} mb={40} pl={20} pr={20} order={6} weight={100} align="center"
      // color='#2F9E44'
          color='gray.7'
       >
        Four Easy Steps
      </Title>
  
    <StyledStepper style={{paddingLeft: '20px', paddingRight: '20px'}}  breakpoint="xs"  active={active} onStepClick={setActive}>
      <Stepper.Step color='#2F9E44'  icon={<Text color='white' fw={'lighter'}>01</Text>} label={<Text color='black' ff={'Poppins'} >Register Business</Text>}  description={<Text  color='black' ff={'Poppins'}> Select plan and register business</Text>}   />
      <Stepper.Step color='#2F9E44' icon={<Text color='white' fw={'lighter'}>02</Text>} label={<Text color='black' ff={'Poppins'}>Make Questionnaire</Text>} description={<Text color='black' ff={'Poppins'}>Select script</Text>}  />
      <Stepper.Step color='#2F9E44' icon={<Text color='white' fw={'lighter'}>03</Text>} label={<Text color='black' ff={'Poppins'}>Select Agent</Text>} description={<Text color='black' ff={'Poppins'}>Select your agents</Text>}   />
      <Stepper.Step color='#2F9E44' icon={<Text color='white' fw={'lighter'}>04</Text>} label={<Text color='black' ff={'Poppins'}>Start Marketing</Text>} description={<Text color='black' ff={'Poppins'}>Start Business Marketing</Text>}   />
    </StyledStepper>
    </Box>
  );
}