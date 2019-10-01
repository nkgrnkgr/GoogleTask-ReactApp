import React from 'react';
import {
  Avatar,
  Link,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { HideOnScroll } from '../HideOnScroll/Index';
import { IconLink } from '../IconLink/Index';
import logo from '../../images/_logo.svg';
import { User } from '../../reducers/ApplicationReducer';

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
    avatarSmall: {
      width: '25px',
      height: '25px',
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

interface Props {
  user: User;
  handleOnClickSignOut: () => void;
}

export const PageHeader: React.FC<Props> = ({ user, handleOnClickSignOut }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <IconButton
              alia-label="avater"
              onClick={handleClick}
              size="small"
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <Avatar
                alt={user.name}
                src={user.imageUrl}
                className={classes.avatarSmall}
              />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleOnClickSignOut}>SignOut</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};
