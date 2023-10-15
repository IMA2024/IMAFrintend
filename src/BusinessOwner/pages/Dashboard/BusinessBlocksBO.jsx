import React, { useState , useEffect} from 'react';
import { createStyles, Text, rem, Box } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 20,
    /*
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    */
    backgroundImage: theme.fn.gradient({ from: 'teal.9', to: 'lime.7', deg: 100 }),
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: rem(32),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

const SubscriptionData = [
    {
      "stats": "40",
    },

  ];

  const PaymentData = [
  
    {
      "stats": "13",
    },

  ];

  const RevenueData = [
    {
      "stats": "30",
    },
  
  ];

  const BusinessData = [
    {
      "stats": "10",
    },

  ];

export default function BusinessBlocksBO() {

  const [totalBusinesses, setTotalBusinesses] = useState(); 
  const [subscribed, setSubscribed] = useState();
  const [unsubscribed, setUnsubscribed] = useState(); 
  const { classes } = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/businessOwner/totalBusinesses');
        const newData = await response.json();
        console.log(response);
        setTotalBusinesses(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/businessOwner/subscribedBusinesses');
        const newData = await response.json();
        console.log(response);
        setSubscribed(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/businessOwner/unsubscribedBusinesses');
        const newData = await response.json();
        console.log(response);
        setUnsubscribed(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 
  const subsData = SubscriptionData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{subscribed}</Text>
      <Text className={classes.title}>Subscribed Businesses</Text>
      <Text className={classes.description}>24% more than in the same month last year, 33% more than two yuserBears ago</Text>
    </div>
  ));
  const payData = PaymentData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{unsubscribed}</Text>
      <Text className={classes.title}>Unsubscribed Businesses</Text>
      <Text className={classes.description}>13% less compared to last month, new user engagement up by 6%</Text>
    </div>
  ));

  const businessData = BusinessData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{totalBusinesses}</Text>
      <Text className={classes.title}>Total Businesses</Text>
      <Text className={classes.description}>1994 orders were completed this month, 97% satisfaction rate</Text>
    </div>
  ));
  return ( 
<div className={classes.root}>{subsData} {payData} {businessData}</div>
  ) 
}