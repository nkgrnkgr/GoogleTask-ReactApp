import { Container, Theme, Grid, Hidden } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import React from 'react';
import AuthContainer from '../../containers/Auth/index';
import TaskListContainer from '../../containers/TaskListContainer';
import TaskListSelection from '../../containers/TaskListSelection';
import HtmlTitle from '../HtmlTitle';
import { PageHeader } from '../../containers/PageHeader/Index';
import { ScrollTop } from '../ScrollTop/Index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '99vh',
    },
    app: {
      height: '100px',
    },
  }),
);

const SignInPage: React.FC = () => {
  const classes = useStyles();

  return (
    <AuthContainer>
      <HtmlTitle title="Tasks" />
      <PageHeader />
      <Container className={classes.root}>
        <div id="back-to-top-anchor" className={classes.app} />
        <Grid container spacing={3}>
          <Hidden xsDown>
            <Grid item sm={3}>
              <TaskListSelection />
            </Grid>
          </Hidden>
          <Grid item sm={9}>
            <TaskListContainer />
          </Grid>
        </Grid>
        <ScrollTop />
      </Container>
    </AuthContainer>
  );
};

export default SignInPage;
