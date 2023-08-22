import React from 'react';
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



export default function StatsGroup() {
  const { classes } = useStyles();
 
  const subsData = SubscriptionData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>Subscriptions</Text>
      <Text className={classes.description}>24% more than in the same month last year, 33% more than two years ago</Text>
    </div>
  ));
  const payData = PaymentData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>Payments</Text>
      <Text className={classes.description}>13% less compared to last month, new user engagement up by 6%</Text>
    </div>
  ));
  const revenueData = RevenueData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>Total Revenue</Text>
      <Text className={classes.description}>1994 orders were completed this month, 97% satisfaction rate</Text>
    </div>
  ));
  const businessData = BusinessData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>Businesses Registered</Text>
      <Text className={classes.description}>1994 orders were completed this month, 97% satisfaction rate</Text>
    </div>
  ));
  return ( 
<div className={classes.root}>{subsData} {payData} {revenueData} {businessData}</div>
  ) 
}