import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Avatar,
} from '@material-ui/core';
import logo from '../../images/_logo.svg';
import googleSignInButton from '../../images/btn_google_signin_dark_normal_web@2x.png';
import HtmlTitle from '../HtmlTitle/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      minHeight: '99vh',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
    },
    avatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
    button: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      cursor: 'pointer',
    },
    image: {
      maxHeight: '40px',
    },
  }),
);
interface Props {
  isSignedIn: boolean;
}

type ReactRouterProps = RouteComponentProps;

type EnhancedProps = Props & ReactRouterProps;

const SignInPage: React.FC<EnhancedProps> = ({ isSignedIn, location }) => {
  const classes = useStyles();

  const redirectUrl = location.search ? `/${location.search}` : '/';
  if (isSignedIn) {
    return <Redirect to={redirectUrl} />;
  }

  return (
    <div className={classes.root}>
      <HtmlTitle title="Google Tasks Client" />
      <div className={classes.logo}>
        <Avatar alt="logo" src={logo} className={classes.avatar} />
        <Typography color="textPrimary" variant="h4">
          Google Task Client
        </Typography>
      </div>
      <button
        type="button"
        onClick={() => gapi.auth2.getAuthInstance().signIn()}
        className={classes.button}
      >
        <img
          src={googleSignInButton}
          alt="google sing in button"
          className={classes.image}
        />
      </button>
    </div>
  );
};

export default SignInPage;
