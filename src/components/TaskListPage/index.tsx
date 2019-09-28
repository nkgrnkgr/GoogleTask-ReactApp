import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import AuthContainer from '../../containers/Auth/index';
import TaskListContainer from '../../containers/TaskListContainer';
import TaskListSelection from '../../containers/TaskListSelection';
import HtmlTitle from '../HtmlTitle';
import { PageHeader } from '../PageHeader/Index';
import { ScrollTop } from '../ScrollTop/Index';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '99vh',
  },
  app: {
    height: '100px',
  },
});

const SignInPage: React.FC = () => {
  const classes = useStyles();

  return (
    <AuthContainer>
      <HtmlTitle title="Tasks" />
      <PageHeader />
      <Container className={classes.root}>
        <div id="back-to-top-anchor" className={classes.app} />
        <TaskListSelection />
        <TaskListContainer />
        <ScrollTop />
      </Container>
    </AuthContainer>
  );
};

export default SignInPage;
