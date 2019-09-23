import React from 'react';
import { Avatar, Link, Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { HideOnScroll } from '../HideOnScroll/Index';
import { IconLink } from '../IconLink/Index';
import logo from '../../images/_logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    avatar: {
      margin: 10,
    },
    title: {
      flexGrow: 1,
    },
    iconLink: {
      color: '#fff',
    },
  }),
);

export const PageHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar color="default">
          <Toolbar>
            <Tooltip title="home">
              <Link href="/">
                <Avatar alt="gtc" src={logo} className={classes.avatar} />
              </Link>
            </Tooltip>
            <Typography variant="h6" className={classes.title}>
              Google Task Client
            </Typography>
            <IconLink
              title="github"
              url="https://github.com/nkgrnkgr/GoogleTask-ReactApp"
              className="fab fa-github"
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};
