import { Slider, rem, Box, Text, Title } from '@mantine/core';


export default function AboutImaDetails() {
  return (
    <Box  sx={{
      fontFamily:'Poppins'
    }}
    
    >
      <Title order={3} align='left'>
      ABOUT IMA
      </Title>
      <Box mt={30} >
        <Text
        fs={5}
        sx={{
          fontFamily:'Poppins',
          //fontSize:'10',
        }}>
      IMA provides marketing automation such as email marketing, social media marketing and lead generation. With the help of artificially Intelligent agents marketing is done in an efficient way.</Text>
      </Box>
      <Box mt={30} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Title order={6} >Customer Service</Title>
        <Title order={6} >70%</Title>
      </Box>
      <Slider 
       styles={(theme) => ({
        markFilled: {
          borderColor: '#2F9E44',
          display:'none',
        },
        thumb: {
          display:'none',
        },
        bar: {
          backgroundColor: '#2F9E44',
        }
      })}
    
       mt={10} defaultValue={70}  />
        <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Title order={6} >Sales/Lead Generation</Title>
        <Title order={6} >60%</Title>
      </Box>
       <Slider 
       styles={(theme) => ({
        markFilled: {
          borderColor: '#2F9E44',
          display:'none',
        },
        thumb: {
          display:'none',
        },
        bar: {
          backgroundColor: '#2F9E44',
        }
      })}
    
       mt={10} defaultValue={60}  />
        <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Title order={6} >Social Media Marketing</Title>
        <Title order={6} >79%</Title>
      </Box>
       <Slider 
       styles={(theme) => ({
        markFilled: {
          borderColor: '#2F9E44',
          display:'none',
        },
        thumb: {
          display:'none',
        },
        bar: {
          backgroundColor: '#2F9E44',
        }
      })}
    
       mt={10} defaultValue={79}  />
       <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Title order={6} >Customer Satisfaction</Title>
        <Title order={6} >90%</Title>
      </Box>
       <Slider 
       styles={(theme) => ({
        markFilled: {
          borderColor: '#2F9E44',
          display:'none',
        },
        thumb: {
          display:'none',
        },
        bar: {
          backgroundColor: '#2F9E44',
        }
      })}
    
       mt={10} defaultValue={90}  />
    </Box>
  );
}