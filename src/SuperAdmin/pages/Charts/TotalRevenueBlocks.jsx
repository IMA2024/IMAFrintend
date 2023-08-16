import { Grid, Box, Text, createStyles, } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
    display: 'flex',
    width:'100%',
    

    [theme.fn.smallerThan('sm')]: {
        gap: '40px',
        //rowGap: '40px'

      },

    },
    containerChild: {
      borderRadius: theme.radius.md, 
      backgroundImage: theme.fn.gradient({ from: 'red.9', to: 'dark.4', deg: 100 }),
      color: 'white',
    },

    title: {
        color: theme.white,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: theme.fontSizes.sm,
      },
    numbers: {
      display:'flex',
      justifyContent:'center',
    }
  }));
  

export default function TotalRevenueBlocks() {
    const { classes } = useStyles();
  return (
    <Box mt={20}>
    <Grid  className={classes.container}  gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
      <Grid.Col  span={4}><Box className={classes.containerChild} p={20} miw={150} maw={280}>
      <Box><Text fw={'bold'}>64</Text></Box>
        <Box><Text className={classes.title}>Total Users</Text></Box>
        </Box></Grid.Col>
        <Grid.Col span={4}><Box className={classes.containerChild}  p={20} miw={150}  maw={280}>
        <Box><Text fw={'bold'}>34</Text></Box>
        <Box><Text className={classes.title}>Marketing Agents</Text></Box>
        </Box></Grid.Col>
        <Grid.Col span={4}><Box className={classes.containerChild}  p={20} miw={150} maw={280}>
        <Box><Text fw={'bold'}>30</Text></Box>
        <Box><Text className={classes.title}>Business Owners</Text></Box>
        </Box></Grid.Col>
    </Grid>
    </Box>
  );
}