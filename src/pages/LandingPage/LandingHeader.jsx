import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Image,
  Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
//import { MantineLogo } from '@mantine/ds';
import Logo from '../../assets/Images/IMALogo.jpg';
import { NavLink, useNavigate } from 'react-router-dom';


const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#E9ECEF',
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    //backgroundColor:'pink',
    //width: '100%',
    // maxWidth: '100%',
    minWidth: '100%',
      //marginLeft: 0, 
      //marginRight: 0 
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      // backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      // color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      backgroundColor: '#4E8480',
      color:'#FFFF',

    },
  },
}));

const links = [
    {
        "link": "/Home",
        "label": "Home"
      },
      {
        "link": "/About",
        "label": "About"
      },
      {
        "link": "/Services",
        "label": "Services"
      },
      {
        "link": "/ContactUs",
        "label": "Contact Us"
      }
]

export default function LandingHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  const GoToSignIn = () => {
    navigate('/HeaderMegaMenu/SignIn' );

  };
  const GoToSignUp = () => {
    navigate('/HeaderMegaMenu/SignUp' );

  };
    

  const items = links.map((link) => (
    <NavLink
    exact
    to={link.link}
      key={link.label}
      //href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        //event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root} >
      <Container className={classes.header} >
         {/*<MantineLogo size={30} />*/}
         <Image width={120} height={45} size={30} fit="contain" src={Logo} />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Group className={classes.hiddenMobile}>
            <Button variant="default" onClick={() => GoToSignIn()}>Log in</Button>
            <Button variant="default" onClick={() => GoToSignUp()} >Sign up</Button>
          </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}