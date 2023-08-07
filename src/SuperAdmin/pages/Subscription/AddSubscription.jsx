import { Grid, Skeleton, Container, Card, Paper, Center, Image, Box, Button, Text, Divider } from '@mantine/core';

const child = <Skeleton height={140} radius="md" animate={false} />;

export default function AddSubscription() {
  return (
    <Container my="md">
      <Grid gutter={'xs'}>
        <Grid.Col xs={4} radius="md" >
        <Card >
        <Paper radius="md" mih={300} >
   <Center mx="auto" mih={40}><Text>Plan1</Text></Center>
    <Center mx="auto" mih={40}><Text>75 Calls</Text></Center> 
    <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
      <Image
        radius="md"
        src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
        alt="Random unsplash image"
      />
    </Box></Center>   
    <Center mih={40} mx="auto"> <Text>97$</Text><Text>/75 calls</Text></Center>
        <Divider />
        <Center mih={40} mx="auto"> <Text>Takes 1 day time for calls</Text></Center>
          <Button mih={40} mx="auto" fullWidth style={{backgroundColor: '#4E8480', marginTop: '10px'}}
         // onClick={() => {
          //  open();
         // }}
          >
              Edit
          </Button>
      </Paper>
      </Card>
        </Grid.Col>
        <Grid.Col xs={4} radius="md" >
        <Card >
        <Paper radius="md" mih={300} >
   <Center mx="auto" mih={40}><Text>Plan1</Text></Center>
    <Center mx="auto" mih={40}><Text>75 Calls</Text></Center> 
    <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
      <Image
        radius="md"
        src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
        alt="Random unsplash image"
      />
    </Box></Center>   
    <Center mih={40} mx="auto"> <Text>97$</Text><Text>/75 calls</Text></Center>
        <Divider />
        <Center mih={40} mx="auto"> <Text>Takes 1 day time for calls</Text></Center>
          <Button mih={40} mx="auto" fullWidth style={{backgroundColor: '#4E8480', marginTop: '10px'}}
         // onClick={() => {
          //  open();
         // }}
          >
              Edit
          </Button>
      </Paper>
      </Card>
        </Grid.Col>
        <Grid.Col xs={4} radius="md" >
        <Card >
        <Paper radius="md" mih={300} >
   <Center mx="auto" mih={40}><Text>Plan1</Text></Center>
    <Center mx="auto" mih={40}><Text>75 Calls</Text></Center> 
    <Center mx="auto" mih={40}> <Box maw={100} mx="auto">
      <Image
        radius="md"
        src="https://storeassets.im-cdn.com/products/af11d2/wqK1UW3TRDG6Z6wOJB3h_silver.jpg"
        alt="Random unsplash image"
      />
    </Box></Center>   
    <Center mih={40} mx="auto"> <Text>97$</Text><Text>/75 calls</Text></Center>
        <Divider />
        <Center mih={40} mx="auto"> <Text>Takes 1 day time for calls</Text></Center>
          <Button mih={40} mx="auto" fullWidth style={{backgroundColor: '#4E8480', marginTop: '10px'}}
         // onClick={() => {
          //  open();
         // }}
          >
              Edit
          </Button>
      </Paper>
      </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}